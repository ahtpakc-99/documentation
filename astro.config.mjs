// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { parrotTerminalTheme } from './src/config/parrot-terminal.mjs'
import { parrotTerminalPrompt } from './src/config/parrot-terminal-prompt.mjs'

const base = '/docs'

// https://astro.build/config
export default defineConfig({
  site: 'https://parrotsec.org',
  base,
  redirects: {
    '/introduction/what-is-parrot': `${base}/`,
    '/installation/install-with-wsl': `${base}/containers/wsl/`,
    '/tools/nmap': 'https://nmap.org/book/',
    '/tools/rclone': 'https://rclone.org/docs/',
    '/tools/wget': 'https://www.gnu.org/software/wget/manual/wget.html'
  },
  integrations: [
    starlight({
      title: 'ParrotOS Docs',
      expressiveCode: {
        ...parrotTerminalTheme,
        plugins: [parrotTerminalPrompt()]
      },

      favicon: '/favicon.ico',
      logo: {
        src: './src/assets/parrot-logo.svg'
      },
      customCss: ['./src/styles/index.css'],
      components: {
        PageTitle: './src/components/layout/PageTitle.astro',
        Search: './src/components/layout/Search.astro',
        SiteTitle: './src/components/layout/SiteTitle.astro',
        ThemeProvider: './src/components/theme/ThemeProvider.astro',
        ThemeSelect: './src/components/theme/ThemeSelect.astro'
      },
      social: [
        {
          icon: 'gitlab',
          label: 'Gitlab',
          href: 'https://gitlab.com/parrotsec'
        }
      ],
      sidebar: [
        {
          label: 'Introduction',
          collapsed: true,
          items: [{ autogenerate: { directory: 'introduction' } }]
        },
        {
          label: 'Installation',
          collapsed: false,
          items: [{ autogenerate: { directory: 'installation' } }]
        },
        {
          label: 'Virtualization',
          collapsed: true,
          items: [{ autogenerate: { directory: 'virtualization' } }]
        },
        {
          label: 'Containers',
          collapsed: true,
          items: [{ autogenerate: { directory: 'containers' } }]
        },
        {
          label: 'USB',
          collapsed: true,
          items: [{ autogenerate: { directory: 'usb' } }]
        },
        {
          label: 'Configuration',
          collapsed: true,
          items: [{ autogenerate: { directory: 'configuration' } }]
        },
        {
          label: 'Troubleshooting',
          collapsed: true,
          items: [{ autogenerate: { directory: 'troubleshooting' } }]
        },
        {
          label: 'Tools',
          collapsed: true,
          items: [{ autogenerate: { directory: 'tools' } }]
        },
        {
          label: 'Development',
          collapsed: true,
          items: [{ autogenerate: { directory: 'development' } }]
        },
        {
          label: 'Mirrors',
          collapsed: true,
          items: [{ autogenerate: { directory: 'mirrors' } }]
        }
      ]
    })
  ]
})
