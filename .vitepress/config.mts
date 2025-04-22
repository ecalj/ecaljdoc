import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
import fs from 'fs';
import path from 'path';


   export function getUncheckedFiles() {
     const uncheckedDir = path.resolve(__dirname, '../unchecked');
     if (!fs.existsSync(uncheckedDir)) {
       return [];
     }
     return fs
       .readdirSync(uncheckedDir)
       .filter(file => file.endsWith('.md') || file.endsWith('.pdf'))
       .map(file => ({
         link: `/unchecked/${file}`,
         text: file,
       }));
   }
// export function getUncheckedFiles() {
//   const uncheckedDir = path.resolve(__dirname, '../unchecked');
//   if (!fs.existsSync(uncheckedDir)) {
//     return [];
//   }
//   function getFilesRecursively(dir) {
//     const entries = fs.readdirSync(dir, { withFileTypes: true });
//     const files = entries.flatMap(entry => {
//       const fullPath = path.join(dir, entry.name);
//       if (entry.isDirectory()) {
//         return getFilesRecursively(fullPath); // 再帰的に検索
//       } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.pdf'))) {
//         return fullPath;
//       }
//       return [];
//     });
//     return files;
//   }
//   const files = getFilesRecursively(uncheckedDir);
//   return files.map(file => ({
//     text: path.basename(file, path.extname(file)), // 拡張子を除いたファイル名をタイトルとして使用
//     link: `/unchecked/${path.relative(uncheckedDir, file).replace(/\\/g, '/')}` // 相対パスをリンクに変換
//   }));
// }

// https://vitepress.dev/reference/site-config
export default withMermaid({
  base : '/ecaljdoc/',
  title: "ecaljdoc",
  description: "document of ecalj",
  cleanUrls: true,
  ignoreDeadLinks: true,
  markdown: {
    math: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: 'Install',
        items: [
          { text: 'Install', link: '/install/install' },
          { text: 'Install ISSP', link: '/install/installISSP' }
        ]
      },
      {
        text: 'Get Started',
        items: [
          { text: 'Tutorial', link: '/manual/README_tutorial' },
        ]
      },
      {
        text: 'Input files',
        items: [
          { text: 'ctrl file', link: '/manual/lmf_input' },
          { text: 'syml file', link: '/manual/syml' },
          { text: 'GWinput', link: '/manual/gwinput' },
        ]
      },
      {
        text: 'Manual',
        items: [
          { text: 'DFT lmf', link: '/manual/lmf' },
          { text: 'ecalj auto', link: '/manual/auto' },
          // { text: 'Quasi-particle self-consistent GW', link: '/manual/gwsc' },
          // { text: 'Density of states', link: '/manual/dos' },
          // { text: 'Band dispersion', link: '/manual/band' },
          // { text: 'Fermi surface', link: '/manual/fs' },
          // { text: 'Spin-orbit interaction', link: '/manual/soi' },
          // { text: 'Spin response function', link: '/manual/chipm' },
          // { text: 'Dielecric function', link: '/manual/eps' },
          // { text: 'Structural optimization', link: '/manual/opts' },
          // { text: 'Quasi-particle\'s life time', link: '/manual/lifetime' },
          // { text: 'Spectrum function', link: '/manual/spec' },
        ]
      },
      {
        text: 'Theory',
        items: [
          // { text: 'PMT', link: '/theory/pmt' },
          // { text: 'Spin-orbit interaction', link: '/theory/soi' },
          { text: 'GW approximation', link: '/theory/gw' },
          { text: 'Quasi-particle self-consistent GW', link: '/theory/qsgw' },
          { text: 'Basis', link: '/theory/gw_basis' },
          { text: 'Product basis', link: '/theory/gw_product_basis' },
          { text: 'Zmel', link: '/theory/gw_zmel' },
          { text: 'Optical properties', link: '/theory/optical_properties' },
          { text: 'Basic', link: '/theory/basic' },
        ]
      },
      {
        text: 'Implementation',
        items: [
          { text: 'hrcxq/hx0fp', link: '/implementation/hx0fp' },
          { text: 'hsfp0_sc', link: '/implementation/hsfp0' },
        ]
      },
      {
        text: 'Unchecked',
        items: [
          { text: 'Unchecked Files', link: '/list' },
        ]
        // items: getUncheckedFiles()
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tkotani/ecalj' },
      { icon: 'github', link: 'https://github.com/ecalj/ecaljdoc' },
    ]
  },
 mermaid: { theme: 'forest' },
 mermaidPlugin: { class: 'mermaid my-class' },
 sitemap :{ hostname: 'https://ecalj.github.io/ecaljdoc/' }
})
