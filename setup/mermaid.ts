import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => {
  return {
    theme: 'base',
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
})
