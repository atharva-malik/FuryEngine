import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FuryEngine Docs",
  description: "The documentation for the open-source Fury Engine",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/introduction' }
    ],
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full'
      }
    },

    sidebar: {
      '/quickstart/': [
        {
          text: 'Quick Start',
          items: [
            { text: 'Quick Start', link: '/quickstart/quickstart' },
          ]
        },
        {
          text: 'Other Links',
          items: [
            { text: 'Dev Log', link: '/devlog/planning' },
            { text: 'Documentation', link: '/docs/introduction' }
          ]
        }
      ],

      '/devlog/': [
        {
          text: 'Dev Log',
          items: [
            { text: 'Planning', link: '/devlog/planning' },
            { text: '- Sprint 1', link: '/devlog/sprint1' },
            { text: '- Sprint 2', link: '/devlog/sprint2' },
            { text: '- Sprint 3', link: '/devlog/sprint3' },
            { text: '- Sprint 4', link: '/devlog/sprint4' },
            { text: '- Sprint 5', link: '/devlog/sprint5' },
            { text: '- Sprint 6', link: '/devlog/sprint6' },
            { text: '- Sprint 7', link: '/devlog/sprint7' },
            { text: '- Sprint 8', link: '/devlog/sprint8' },
          ]
        },
        {
          text: 'Other Links',
          items: [
            { text: 'Quickstart', link: '/quickstart/quickstart' },
            { text: 'Documentation', link: '/docs/introduction' }
          ]
        }
      ],

      '/docs/': [
        {
          text: 'Documentation',
          items: [
            { text: 'Contributing', link: '/docs/contributing.md' },
            { text: 'Introduction', link: '/docs/introduction.md' },
          ]
        },
        {
          text: 'Files',
          items: [
            { text: 'main.cpp', link: '/docs/main' },
            { text: '└─ 3rd party', link: '/docs/includes/3rd-party' },
            { text: '└─ OpeningBook/book.json', link: '/docs/includes/book.json' },
            { text: '└─ bot.cpp', link: '/docs/includes/bot.cpp' },
            { text: '└─ bot.h', link: '/docs/includes/bot.h' },
            { text: '└─ bothelpers', link: '/docs/includes/bothelpers' },
            { text: '└─ constructors', link: '/docs/includes/constructors' },
            { text: '└─ evaluate', link: '/docs/includes/evaluate' },
            { text: '└─ findmove', link: '/docs/includes/findmove' },
            { text: '└─ helpers', link: '/docs/includes/helpers' },
            { text: '└─ nnue_eval', link: '/docs/includes/nnue_eval' },
            { text: '└─ NNUE', link: '/docs/includes/nnue' },
            { text: '└─ openings', link: '/docs/includes/openings' },
            { text: '└─ search', link: '/docs/includes/search' },
            { text: '└─ UCI Bot', link: '/docs/includes/ucibot' },
          ]
        },
        {
          text: 'Other Links',
          items: [
            { text: 'Dev Log', link: '/devlog/planning' },
            { text: 'Documentation', link: '/docs/introduction' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/atharva-malik/FuryEngine' }
    ]
  }
})
