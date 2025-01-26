import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base : './',
  title: "ecaljdoc",
  description: "document of ecalj",
  markdown: {
    math: true
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
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
        text: 'Demo',
        items: [
          { text: 'Demo', link: '/demo/demo.md' },
        ]
      },
      {
        text: 'Theory',
        items: [
          { text: 'zmel ', link: '/theory/zmel.md' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/msobt/ecaljdoc' }
    ]
  }
})
