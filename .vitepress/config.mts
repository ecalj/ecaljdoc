import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base : '/ecaljdoc/',
  title: "ecaljdoc",
  description: "document of ecalj",
  markdown: {
    math: true
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
          { text: 'zmel ', link: '/theory/zmel' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tkotani/ecalj' },
    ]
  }
})
