import type { ShikiSetupReturn } from '@slidev/types'
import { defineShikiSetup } from '@slidev/types'
import type { Element } from 'hast'

// Comment token colors: Tokyo Night (dark) + min-light (light)
const COMMENT_COLORS = ['#51597d', '#5a638c', '#646e9c', '#a0a1a7', '#a0a0a0']

// Extract plain text content from a HAST element tree
function extractText(el: Element): string {
  let text = ''
  for (const child of (el.children ?? []) as any[]) {
    if (child.type === 'text')    text += child.value ?? ''
    else if (child.type === 'element') text += extractText(child as Element)
  }
  return text
}

function hasCommentColor(style: string): boolean {
  const s = style.toLowerCase()
  return COMMENT_COLORS.some(c => s.includes(c))
}

function addClass(el: Element, name: string) {
  const cls = el.properties?.class
  if (Array.isArray(cls))
    cls.push(name)
  else if (typeof cls === 'string')
    el.properties!.class = `${cls} ${name}`
  else
    el.properties = { ...el.properties, class: name }
}

export default defineShikiSetup((): ShikiSetupReturn => {
  return {
    themes: {
      dark: 'tokyo-night',
      light: 'min-light',
    },
    transformers: [
      {
        // Add CSS classes to diff lines so layout.css can style them with
        // green / red backgrounds — works whenever lang="diff" is used.
        name: 'cyberpunk-ide:diff-lines',
        line(hast: Element) {
          const lang = (this as any).options?.lang
          if (lang !== 'diff') return
          const text = extractText(hast)
          if (text.startsWith('--- ') || text.startsWith('+++ '))
            addClass(hast, 'diff-file')
          else if (text.startsWith('@@'))
            addClass(hast, 'diff-hunk')
          else if (text.startsWith('+'))
            addClass(hast, 'diff-add')
          else if (text.startsWith('-'))
            addClass(hast, 'diff-remove')
        },
      },
      {
        name: 'cyberpunk-ide:comment-font',
        // Slidev sets defaultColor:false when using `themes`, so token.color
        // is undefined — colors live in the span's style as CSS variables
        // (e.g. --shiki-dark:#51597d). Read the style attribute instead.
        span(hast: Element) {
          const style = hast.properties?.style
          const styleStr = typeof style === 'string' ? style : ''
          if (styleStr && hasCommentColor(styleStr))
            addClass(hast, 'token-comment')
        },
      },
    ],
  }
})
