// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

const base = '/docs'

const parrotTerminalColors = {
  'editor.background': '#000000e8',
  'editor.foreground': '#00ff00',
  'editor.selectionBackground': '#16364a',
  focusBorder: '#34e2e2',
  'scrollbarSlider.background': '#55575366',
  'scrollbarSlider.hoverBackground': '#7d8c9299',
  'titleBar.activeBackground': '#242a2e',
  'titleBar.activeForeground': '#dedede',
  'titleBar.border': '#111111',
  'editorGroupHeader.tabsBackground': '#242a2e',
  'editorGroupHeader.tabsBorder': '#111111',
  'tab.activeBackground': '#000000e8',
  'tab.activeForeground': '#dedede',
  'tab.activeBorderTop': '#34e2e2'
}

const parrotTerminalTokens = [
  { settings: { foreground: '#d3d7cf' } },
  {
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: '#555753', fontStyle: 'italic' }
  },
  {
    scope: ['string', 'string.quoted', 'string.template'],
    settings: { foreground: '#8ae234' }
  },
  {
    scope: ['keyword', 'storage', 'storage.type', 'storage.modifier'],
    settings: { foreground: '#ef2929' }
  },
  {
    scope: ['constant', 'constant.numeric', 'constant.language'],
    settings: { foreground: '#fce94f' }
  },
  {
    scope: ['variable', 'variable.other', 'support.variable'],
    settings: { foreground: '#34e2e2' }
  },
  {
    scope: ['entity.name.function', 'support.function', 'meta.function-call'],
    settings: { foreground: '#729fcf' }
  },
  {
    scope: ['entity.name.type', 'entity.name.class', 'entity.name.tag'],
    settings: { foreground: '#ad7fa8' }
  },
  {
    scope: ['punctuation', 'meta.brace', 'meta.delimiter'],
    settings: { foreground: '#eeeeec' }
  }
]

const createParrotTerminalTheme = (type) => ({
  name: `parrot-terminal-${type}`,
  type,
  colors: parrotTerminalColors,
  tokenColors: parrotTerminalTokens
})

// https://astro.build/config
export default defineConfig({
  base,
  redirects: {
    '/introduction/what-is-parrot': `${base}/`
  },
  integrations: [
    starlight({
      title: 'ParrotOS Docs',
      expressiveCode: {
        themes: [
          createParrotTerminalTheme('dark'),
          createParrotTerminalTheme('light')
        ],
        useStarlightUiThemeColors: false,
        minSyntaxHighlightingColorContrast: 0,
        styleOverrides: {
          codeBackground: '#000000e8',
          codeForeground: '#00ff00',
          codeSelectionBackground: '#16364a',
          borderColor: '#46535b',
          borderRadius: '10px',
          borderWidth: '1px',
          focusBorder: '#34e2e2',

          frames: {
            terminalBackground: '#000000e8',
            terminalTitlebarBackground: '#242a2e',
            terminalTitlebarForeground: '#dedede',
            terminalTitlebarBorderBottomColor: '#111111',
            terminalTitlebarDotsForeground: '#66737a',
            terminalTitlebarDotsOpacity: '1',
            editorBackground: '#000000e8',
            editorActiveTabBackground: '#000000e8',
            editorTabBarBackground: '#242a2e',
            editorTabBarBorderColor: '#111111',
            frameBoxShadowCssValue: '0 20px 55px #0008'
          }
        }
      },

      favicon: '/favicon.ico',
      logo: {
        src: './src/assets/parrot-logo.svg'
      },
      customCss: ['./src/styles/index.css'],
      components: {
        PageTitle: './src/components/PageTitle.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        ThemeProvider: './src/components/ThemeProvider.astro',
        ThemeSelect: './src/components/ThemeSelect.astro'
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
