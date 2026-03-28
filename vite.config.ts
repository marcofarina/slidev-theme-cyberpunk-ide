import { defineConfig } from 'vite'
import Container from 'markdown-it-container'

const calloutTypes = ['definition', 'info', 'warning', 'clean', 'code', 'learn'] as const

export default defineConfig({
  slidev: {
    markdown: {
      markdownSetup(md: any) {
        for (const type of calloutTypes) {
          md.use(Container, type, {
            render(tokens: any[], idx: number) {
              const token = tokens[idx]
              if (token.nesting === 1) {
                const title = token.info.trim().slice(type.length).trim()
                const safeTitle = md.utils.escapeHtml(title)
                return `<Callout type="${type}" title="${safeTitle}">\n`
              }
              return '</Callout>\n'
            },
          })
        }
      },
    },
  },
} as any)
