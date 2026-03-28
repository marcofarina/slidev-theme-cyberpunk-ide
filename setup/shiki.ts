import type { ShikiSetupReturn } from '@slidev/types'
import { defineShikiSetup } from '@slidev/types'
import type { Element } from 'hast'

// Tokyo Night comment token colors (normal, doc-comment, doc-comment types)
const COMMENT_COLORS = ['#51597d', '#5a638c', '#646e9c']

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
      light: 'tokyo-night',
    },
    transformers: [
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
