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

The theme uses **Monaspace Neon** (body and code) and **Monaspace Radon** (comments in code blocks). Both variable fonts are bundled with the theme — no manual download or configuration required. They are licensed under the [SIL Open Font License 1.1](public/fonts/LICENSE).

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

| Slot             | Position     | Purpose                    |
| ---------------- | ------------ | -------------------------- |
| `::logo::`       | Top-left     | School or institution logo |
| `::logo-right::` | Top-right    | Department or course logo  |
| `::sponsors::`   | Bottom strip | Sponsor / partner logos    |

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

Standard content slide wrapped in the IDE (title bar, tab bar, editor area, status bar).

```yaml
---
filename: algorithms.py   # tab name and title bar — default: main.py
language: Python         # status bar right — default: Python
branch: 03/recursion    # status bar left — default: main
repo: ComputerScience101    # status bar left (repo name) — default: cyberpunk-ide
---

# Slide title
```

### `section`

Full-screen section divider with a grid background and a glowing accent line.

```yaml
---
layout: section
section: Module 2        # label shown above the title — default: Modulo
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

| Position | Content                          | Frontmatter key | Default                     |
| -------- | -------------------------------- | --------------- | --------------------------- |
| Left     | Repo name (GitHub icon)          | `repo`          | `cyberpunk-ide`             |
| Left     | Branch / topic (git branch icon) | `branch`        | `main`                      |
| Right    | Language                         | `language`      | `Python`                    |
| Right    | Encoding                         | —               | `UTF-8` (fixed)             |
| Right    | Slide counter                    | —               | `current / total` (dynamic) |

## Line numbers

Line numbers are **enabled by default** by the theme. The scope of control is:

| Level                            | How                                |
| -------------------------------- | ---------------------------------- |
| Whole presentation (disable)     | `lineNumbers: false` in headmatter |
| Single code block (disable)      | ` ```python {lineNumbers:false} `  |
| Single code block (custom start) | ` ```python {startLine:10} `       |

## Syntax highlighting

Code blocks use the **Tokyo Night** theme via Shiki. Comment tokens are automatically rendered in **Monaspace Radon** (cursive/calligraphic style) to visually distinguish them from code.

## Callouts

Six callout types are available for highlighting definitions, tips, warnings, and learning objectives.

```markdown
:::definition Definition
An **algorithm** is a finite sequence of unambiguous instructions.
:::

:::info Useful Information
You can use `len()` to get the length of any sequence.
:::

:::warning Warning
Do not modify a list while iterating over it.
:::

:::clean Clean Code
Use descriptive names: `number_of_students` is better than `n`.
:::

:::code Python Syntax
`for item in list:` iterates without using indices.
:::

:::learn What You Will Learn
In this module you will see **recursion** in action.
:::
```

| Type         | Color  | Use for                      |
| ------------ | ------ | ---------------------------- |
| `definition` | brown  | Formal definitions           |
| `info`       | yellow | Tips and notes               |
| `warning`    | red    | Pitfalls and gotchas         |
| `clean`      | cyan   | Best practices / clean code  |
| `code`       | grey   | Syntax reminders / code tips |
| `learn`      | purple | Learning objectives          |

**Custom icon and color** — each callout accepts optional `icon` and `color` props to override the preset:

```markdown
<Callout type="info" title="Nota" icon="i-ph-star" color="#9ece6a">

Custom icon (any UnoCSS / Phosphor icon class) and hex color.

</Callout>
```

> Icons used by the presets (`paper.png`, `bulb.png`, etc.) must be present in `public/callouts/` of the presentation folder.

## Glossary tooltips

Add a `glossary` map to a slide's frontmatter to automatically wrap matching terms with interactive tooltips. Hovering (or focusing) the term shows its definition inline.

```yaml
---
filename: recursion.py
glossary:
  algorithm: A finite sequence of **unambiguous** instructions that solves a problem
  recursion: A technique where a function calls `itself` to solve sub-problems
  base case: The condition that stops the recursion, preventing a stack overflow
---
```

Definitions support inline formatting: `**bold**`, `*italic*`, `` `code` ``.

Terms inside fenced code blocks and inline code spans are left untouched.