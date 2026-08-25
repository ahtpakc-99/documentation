// @ts-check
import { defineEcConfig } from '@astrojs/starlight/expressive-code'

export const parrotTerminalPalette = Object.freeze({
  background: '#000000e8',
  foreground: '#d3d7cf',
  red: '#ef2929',
  green: '#8ae234',
  yellow: '#fce94f',
  cyan: '#34e2e2',
  white: '#eeeeec'
})

const { background, foreground, cyan: accent } = parrotTerminalPalette

const colors = {
  'editor.background': background,
  'editor.foreground': foreground,
  'editor.selectionBackground': '#16364a',
  'focusBorder': accent,
  'scrollbarSlider.background': '#55575366',
  'scrollbarSlider.hoverBackground': '#7d8c9299',
  'titleBar.activeBackground': '#242a2e',
  'titleBar.activeForeground': '#dedede',
  'titleBar.border': '#111111',
  'editorGroupHeader.tabsBackground': '#242a2e',
  'editorGroupHeader.tabsBorder': '#111111',
  'tab.activeBackground': background,
  'tab.activeForeground': '#dedede',
  'tab.activeBorderTop': accent,
  'terminal.background': background,
  'terminal.foreground': foreground,
  'terminal.ansiBlack': '#2e3436',
  'terminal.ansiRed': '#cc0000',
  'terminal.ansiGreen': '#4e9a06',
  'terminal.ansiYellow': '#c4a000',
  'terminal.ansiBlue': '#3465a4',
  'terminal.ansiMagenta': '#75507b',
  'terminal.ansiCyan': '#06989a',
  'terminal.ansiWhite': foreground,
  'terminal.ansiBrightBlack': '#555753',
  'terminal.ansiBrightRed': parrotTerminalPalette.red,
  'terminal.ansiBrightGreen': parrotTerminalPalette.green,
  'terminal.ansiBrightYellow': parrotTerminalPalette.yellow,
  'terminal.ansiBrightBlue': '#729fcf',
  'terminal.ansiBrightMagenta': '#ad7fa8',
  'terminal.ansiBrightCyan': accent,
  'terminal.ansiBrightWhite': parrotTerminalPalette.white
}

const tokenColors = [
  { settings: { foreground } },
  {
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: '#555753', fontStyle: 'italic' }
  },
  {
    scope: ['string', 'string.quoted', 'string.template'],
    settings: { foreground: parrotTerminalPalette.green }
  },
  {
    scope: ['keyword', 'storage', 'storage.type', 'storage.modifier'],
    settings: { foreground: parrotTerminalPalette.red }
  },
  {
    scope: ['constant', 'constant.numeric', 'constant.language'],
    settings: { foreground: parrotTerminalPalette.yellow }
  },
  {
    scope: ['variable', 'variable.other', 'support.variable'],
    settings: { foreground: accent }
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
    settings: { foreground: parrotTerminalPalette.white }
  }
]

/** @param {'dark' | 'light'} type */
const createTheme = (type) => ({
  name: `parrot-terminal-${type}`,
  type,
  colors,
  tokenColors
})

export const parrotTerminalTheme = defineEcConfig({
  themes: [createTheme('dark'), createTheme('light')],
  defaultProps: {
    frame: 'terminal'
  },
  frames: {
    removeCommentsWhenCopyingTerminalFrames: false
  },
  useStarlightUiThemeColors: false,
  minSyntaxHighlightingColorContrast: 0,
  styleOverrides: {
    codeBackground: background,
    codeForeground: foreground,
    codeSelectionBackground: '#16364a',
    borderColor: '#46535b',
    borderRadius: '10px',
    borderWidth: '1px',
    focusBorder: accent,
    frames: {
      terminalBackground: background,
      terminalTitlebarBackground: '#242a2e',
      terminalTitlebarForeground: '#dedede',
      terminalTitlebarBorderBottomColor: '#111111',
      terminalTitlebarDotsForeground: accent,
      terminalTitlebarDotsOpacity: '1',
      editorBackground: background,
      editorActiveTabBackground: background,
      editorTabBarBackground: '#242a2e',
      editorTabBarBorderColor: '#111111',
      frameBoxShadowCssValue: '0 20px 55px #0008'
    }
  }
})
