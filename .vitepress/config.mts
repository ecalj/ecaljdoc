import { defineConfig } from 'vitepress'
import { configureDiagramsPlugin } from "vitepress-plugin-diagrams";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base : '/ecaljdoc/',
  title: "ecaljdoc",
  description: "document of ecalj",
  cleanUrls: true,
  markdown: {
    math: true,
    config: (md) => {
      configureDiagramsPlugin(md, {
        });
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Install', link: '/guide/install' },
          { text: 'Server config: Ohtaka', link: '/guide/setting_ohtaka' },
          { text: 'Server config: Kugui', link: '/guide/setting_kugui' },
        ]
      },
      {
        text: 'Manual',
        items: [
          { text: 'lmf', link: '/manual/lmf' },
          { text: 'job_band', link: '/manual/job_band' },
        ]
      },
      {
        text: 'Theory',
        items: [
          { text: 'basis', link: '/theory/basis' },
          { text: 'product basis', link: '/theory/product_basis' },
          { text: 'zmel', link: '/theory/zmel' },
          { text: 'GW', link: '/theory/gw' },
          { text: 'QSGW', link: '/theory/qsgw' },
        ]
      },
      {
        text: 'Implementation',
        items: [
          { text: 'hx0fp', link: '/implementation/hx0' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tkotani/ecalj' },
    ]
  }
})
