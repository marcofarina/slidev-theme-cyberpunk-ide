import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import Container from 'markdown-it-container'
import { parse as parseYaml } from 'yaml'

// ─── Callout container types ──────────────────────────────────────────────────

const calloutTypes = ['definition', 'info', 'warning', 'clean', 'code', 'learn'] as const

// ─── Glossary tooltip transform ───────────────────────────────────────────────

/**
 * Replace glossary terms in a slide's text content with <Tooltip> components.
 * Skips code fences and inline code spans.
 */
function applyGlossary(content: string, glossary: Record<string, string>): string {
  const terms = Object.keys(glossary).sort((a, b) => b.length - a.length)
  let result = content

  for (const term of terms) {
    const def = String(glossary[term])
      .replace(/"/g, '&quot;')
      .replace(/`/g, '&#96;')   // prevent markdown-it backtick rule from breaking the attribute
      .replace(/\n+/g, ' ')
      .trim()

    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const replacement = `<Tooltip text="${def}">${term}</Tooltip>`

    const fencedParts = result.split(/(```[\s\S]*?```)/g)
    result = fencedParts
      .map((part, i) => {
        if (i % 2 === 1) return part
        const inlineParts = part.split(/(`.+?`)/g)
        return inlineParts
          .map((inner, j) => {
            if (j % 2 === 1) return inner
            return inner.replace(new RegExp(`\\b${escaped}\\b`, 'g'), replacement)
          })
          .join('')
      })
      .join('')
  }

  // Prevent <Tooltip> from appearing at the start of a line — the Vue/Slidev
  // compiler treats it as a block element there, breaking the paragraph.
  result = result.replace(/\n(<Tooltip\s)/g, ' $1')

  return result
}

/**
 * Parse the original .md file and return a 1-indexed array of glossaries
 * (null when a slide has no glossary).
 *
 * Slidev splits example.md into per-slide virtual files (example.md__slidev_N.md)
 * AFTER stripping the frontmatter, so the glossary is only available in the
 * original file. We read it here and cache per file path.
 */
const glossaryCache = new Map<string, (Record<string, string> | null)[]>()

function getSlideGlossaries(origPath: string): (Record<string, string> | null)[] {
  if (glossaryCache.has(origPath)) return glossaryCache.get(origPath)!

  let src: string
  try {
    src = readFileSync(origPath, 'utf-8')
  }
  catch {
    return []
  }

  // Normalize Windows line endings, then prepend \n so every \n---\n boundary is uniform
  const chunks = ('\n' + src.replace(/\r\n/g, '\n')).split('\n---\n')
  // Slide N: frontmatter = chunks[2N-1], content = chunks[2N]  (1-indexed)
  const maxSlides = Math.floor((chunks.length - 1) / 2)
  const glossaries: (Record<string, string> | null)[] = [null] // index 0 unused

  for (let n = 1; n <= maxSlides; n++) {
    const fmChunk = chunks[2 * n - 1] ?? ''
    try {
      const fm = parseYaml(fmChunk) as any
      glossaries.push(fm?.glossary && typeof fm.glossary === 'object' ? fm.glossary : null)
    }
    catch {
      glossaries.push(null)
    }
  }

  glossaryCache.set(origPath, glossaries)
  return glossaries
}

// ─── Vite config ──────────────────────────────────────────────────────────────

export default defineConfig({
  plugins: [
    {
      name: 'slidev-glossary',
      enforce: 'pre',

      configureServer(server) {
        // Invalidate cache when the source .md file changes
        server.watcher.on('change', (path) => {
          if (path.endsWith('.md') && !path.includes('__slidev_'))
            glossaryCache.delete(path)
        })
      },

      transform(src, id) {
        // Only process per-slide virtual files: path/to/file.md__slidev_N.md
        const match = id.match(/^(.+\.md)__slidev_(\d+)\.md$/)
        if (!match) return null

        const origPath = match[1]
        const slideNum = parseInt(match[2], 10)

        const glossaries = getSlideGlossaries(origPath)
        const glossary = glossaries[slideNum]
        if (!glossary) return null

        const out = applyGlossary(src, glossary)
        return out !== src ? { code: out, map: null } : null
      },
    },
  ],
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
