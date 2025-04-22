import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  base : '/ecaljdoc/',
  title: "ecaljdoc",
  description: "document of ecalj",
  cleanUrls: true,
  markdown: {
    math: true,
  },
  srcExclude: ['./unchecked/*.md'],
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
          { text: 'InstallISSP', link: '/install/installISSP' }
        ]
      },
      {
        text: 'Input files',
        items: [
          { text: 'ctrl file', link: '/manual/ctrlfile' },
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
