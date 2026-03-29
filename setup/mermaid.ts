import { defineMermaidSetup } from '@slidev/types'

const darkTheme = {
  theme: 'base' as const,
  themeVariables: {
    // Backgrounds
    background:        '#1a1b26',
    mainBkg:           '#24283b',
    secondBkg:         '#1f2335',
    tertiaryColor:     '#16161e',
    // Borders & lines
    primaryBorderColor:   '#3b4261',
    secondaryBorderColor: '#3b4261',
    tertiaryBorderColor:  '#3b4261',
    lineColor:            '#565f89',
    // Text
    primaryTextColor:   '#c0caf5',
    secondaryTextColor: '#c0caf5',
    tertiaryTextColor:  '#c0caf5',
    edgeLabelBackground: '#1a1b26',
    // Accents (node fills)
    primaryColor:   '#24283b',
    secondaryColor: '#1f2335',
    // Special nodes: decisions / terminal
    nodeBorder:     '#7dcfff',
    clusterBkg:     '#16161e',
    clusterBorder:  '#3b4261',
    // Fonts
    fontFamily: '"Monaspace Radon", monospace',
    fontSize:   '15px',
  },
}

const lightTheme = {
  theme: 'base' as const,
  themeVariables: {
    // Backgrounds
    background:        '#e1e2e7',
    mainBkg:           '#d5d6db',
    secondBkg:         '#bdbec5',
    tertiaryColor:     '#d0d1d6',
    // Borders & lines
    primaryBorderColor:   '#6b6d7a',
    secondaryBorderColor: '#6b6d7a',
    tertiaryBorderColor:  '#6b6d7a',
    lineColor:            '#4a4c5a',
    // Text
    primaryTextColor:   '#343b58',
    secondaryTextColor: '#343b58',
    tertiaryTextColor:  '#343b58',
    edgeLabelBackground: '#e1e2e7',
    // Accents (node fills)
    primaryColor:   '#d5d6db',
    secondaryColor: '#bdbec5',
    // Special nodes: decisions / terminal
    nodeBorder:     '#4a4c5a',
    clusterBkg:     '#d0d1d6',
    clusterBorder:  '#6b6d7a',
    // Fonts
    fontFamily: '"Monaspace Radon", monospace',
    fontSize:   '15px',
  },
}

export default defineMermaidSetup(() => {
  if (typeof document === 'undefined')
    return lightTheme
  // Check class first, then fall back to computed CSS variable
  const el = document.documentElement
  const isDark = el.classList.contains('dark')
    || getComputedStyle(el).getPropertyValue('--cp-bg-desktop').trim() === '#080910'
  return isDark ? darkTheme : lightTheme
})
