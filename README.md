# slidev-theme-cyberpunk-ide

[![NPM version](https://img.shields.io/npm/v/slidev-theme-cyberpunk-ide?color=3AB9D4&label=)](https://www.npmjs.com/package/slidev-theme-cyberpunk-ide)

A cyberpunk IDE-style theme for [Slidev](https://github.com/slidevjs/slidev), designed for teaching computer science. Each slide looks like a file open in a dark IDE, complete with title bar, tab bar, and status bar.

## Install

Add the following frontmatter to your `slides.md`:

```yaml
---
theme: cyberpunk-ide
---
```

## Fonts

The theme uses **Monaspace Neon** (body and code) and **Monaspace Radon** (comments in code blocks). These fonts are not on Google Fonts and must be provided locally.

1. Download `Monaspace Neon Var.woff2` and `Monaspace Radon Var.woff2` from the [Monaspace releases](https://github.com/githubnext/monaspace/releases)
2. Place them in `public/fonts/` inside your presentation folder

## Layouts

### `cover` (default for slide 1)

Title slide with a cyberpunk grid background, scan lines, and an animated gradient on the heading.

```yaml
---
layout: cover
---

# Course Title

Subtitle or description
```

**Optional named slots:**

| Slot | Position | Purpose |
|------|----------|---------|
| `::logo::` | Top-left | School or institution logo |
| `::logo-right::` | Top-right | Department or course logo |
| `::sponsors::` | Bottom strip | Sponsor / partner logos |

The top bar is only rendered if at least one of `logo` or `logo-right` is provided. The sponsors strip is only rendered if `sponsors` is provided.

```markdown
---
layout: cover
---

# Course Title

Subtitle

::logo::
<img src="/logo-school.png" alt="School" />

::logo-right::
<img src="/logo-dept.png" alt="Department" />

::sponsors::
<img src="/sponsor1.png" alt="Sponsor A" />
<img src="/sponsor2.png" alt="Sponsor B" />
```

Images are automatically constrained (`max-height: 44px` for logos, `28px` for sponsors). Place image files in your presentation's `public/` folder and reference them with a leading `/`.

### `default`

Standard content slide wrapped in the IDE chrome (title bar, tab bar, editor area, status bar).

```yaml
---
filename: algoritmi.py   # tab name and title bar — default: main.py
language: Python         # status bar right — default: Python
branch: 03/ricorsione    # status bar left — default: main
repo: informatica-4BI    # status bar left (repo name) — default: cyberpunk-ide
---

# Slide title
```

### `section`

Full-screen section divider with a grid background and a glowing accent line.

```yaml
---
layout: section
section: Modulo 2        # label shown above the title — default: Modulo
---

# *Chapter* Title
```

Wrap a word in `*...*` (em) to apply the neon purple accent color.

## Tab bar

The tab bar shows one chip-style tab per slide, auto-scrolling to keep the active one visible. Clicking any tab navigates to that slide.

### Hiding slides from the tab bar

By default, slides with `layout: cover` or `layout: section` are **hidden** from the tab bar (they don't have IDE chrome anyway).

To **show all slides** including cover and section slides:

```yaml
---
# in the presentation headmatter (first slide)
themeConfig:
  tabsShowAll: true
---
```

To **hide a specific slide** from the tab bar regardless of the global setting:

```yaml
---
hideTab: true
---
```

## Status bar

| Position | Content | Frontmatter key | Default |
|----------|---------|----------------|---------|
| Left | Repo name (GitHub icon) | `repo` | `cyberpunk-ide` |
| Left | Branch / topic (git branch icon) | `branch` | `main` |
| Right | Language | `language` | `Python` |
| Right | Encoding | — | `UTF-8` (fixed) |
| Right | Slide counter | — | `current / total` (dynamic) |

## Line numbers

Line numbers are **enabled by default** by the theme. The scope of control is:

| Level | How |
|-------|-----|
| Whole presentation (disable) | `lineNumbers: false` in headmatter |
| Single code block (disable) | ` ```python {lineNumbers:false} ` |
| Single code block (custom start) | ` ```python {startLine:10} ` |

## Syntax highlighting

Code blocks use the **Tokyo Night** theme via Shiki. Comment tokens are automatically rendered in **Monaspace Radon** (cursive/calligraphic style) to visually distinguish them from code.

## Contributing

```bash
npm install
npm run dev        # preview example.md with live reload
npm run export     # export to PDF
npm run screenshot # export to PNG
```
