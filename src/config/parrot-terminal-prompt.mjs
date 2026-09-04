import { definePlugin } from '@astrojs/starlight/expressive-code'
import { parrotTerminalPalette as palette } from './parrot-terminal.mjs'

// Only shell dialects get a synthetic prompt. Blocks tagged `text` hold command
// output or file contents, so prefixing them with a prompt would present them as
// commands to type.
const promptLanguages = new Set(['', 'bash', 'console', 'sh', 'shell', 'zsh'])

const text = (value) => ({ type: 'text', value })

const span = (className, value, hidden = true) => ({
  type: 'element',
  tagName: 'span',
  properties: {
    className: [`parrot-${className}`],
    ...(hidden ? { ariaHidden: 'true' } : {})
  },
  children: [text(value)]
})

const promptHeader = (user = 'user', host = 'parrot', path = '~') => [
  span('red', '┌─['),
  span(user === 'root' ? 'red' : 'foreground', user),
  span('yellow', '@'),
  span('cyan', host),
  span('red', ']─['),
  span('green', path),
  span('red', ']')
]

const promptPrefix = () => [
  span('red', '└──╼ '),
  span('yellow', '$'),
  span('cyan', ' ')
]

const promptLine = () => ({
  type: 'element',
  tagName: 'div',
  properties: {
    className: ['ec-line', 'parrot-prompt-line'],
    ariaHidden: 'true'
  },
  children: [
    {
      type: 'element',
      tagName: 'div',
      properties: { className: ['code'] },
      children: promptHeader()
    }
  ]
})

const hasClass = (node, className) =>
  node?.type === 'element' &&
  Array.isArray(node.properties?.className) &&
  node.properties.className.includes(className)

const findElement = (node, tagName) => {
  if (node?.type === 'element' && node.tagName === tagName) return node
  for (const child of node?.children ?? []) {
    const match = findElement(child, tagName)
    if (match) return match
  }
}

const codeWrapper = (line) =>
  line?.children?.find((child) => hasClass(child, 'code'))

const colorExistingPrompt = (lines, sourceLines) => {
  const header = sourceLines[0]?.match(
    /^(.*\[)([^@\]]+)(@)([^\]]+)(\]─\[)(.*)(\])$/
  )
  const firstWrapper = codeWrapper(lines[0])
  if (header && firstWrapper) {
    firstWrapper.children = promptHeader(header[2], header[4], header[6])
    lines[0].properties.ariaHidden = 'true'
  }

  const command = sourceLines[1]?.match(/^(└──╼\s*)[$#]\s?(.*)$/)
  const secondWrapper = codeWrapper(lines[1])
  if (command && secondWrapper) {
    secondWrapper.children = [
      ...promptPrefix(),
      ...(command[2] ? [span('cyan', command[2], false)] : [])
    ]
  }
}

export const parrotTerminalPrompt = () =>
  definePlugin({
    name: 'Parrot terminal prompt',
    baseStyles: `
      .parrot-red { color: ${palette.red}; }
      .parrot-green { color: ${palette.green}; }
      .parrot-yellow { color: ${palette.yellow}; font-weight: 700; }
      .parrot-cyan { color: ${palette.cyan}; font-weight: 600; }
      .parrot-foreground { color: ${palette.foreground}; }
      .frame.is-terminal .header::before {
        width: 2.8rem;
        background:
          radial-gradient(circle at 0.35rem 50%, ${palette.red} 0 0.28rem, transparent 0.3rem),
          radial-gradient(circle at 1.3rem 50%, ${palette.yellow} 0 0.28rem, transparent 0.3rem),
          radial-gradient(circle at 2.25rem 50%, ${palette.green} 0 0.28rem, transparent 0.3rem) !important;
        opacity: 1;
        -webkit-mask-image: none !important;
        mask-image: none !important;
      }
    `,
    hooks: {
      postprocessRenderedBlock: ({ codeBlock, renderData }) => {
        if (!promptLanguages.has(codeBlock.language)) return

        const code = findElement(renderData.blockAst, 'code')
        const lines = code?.children?.filter((child) =>
          hasClass(child, 'ec-line')
        )
        if (!code || !lines?.length) return

        const sourceLines = codeBlock.code.split('\n')
        if (sourceLines[0]?.trimStart().startsWith('┌─')) {
          colorExistingPrompt(lines, sourceLines)
          return
        }

        // A synthetic prompt can only be placed on the first line, so a block
        // holding several lines would render the rest as if it were output.
        // Those blocks are scripts or command sequences: leave them unprompted.
        if (sourceLines.filter((line) => line.trim()).length > 1) return

        const firstWrapper = codeWrapper(lines[0])
        if (!firstWrapper) return

        firstWrapper.children.unshift(...promptPrefix())
        code.children.unshift(promptLine())
      }
    }
  })
