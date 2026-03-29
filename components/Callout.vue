<script setup lang="ts">
import paperIcon from '../public/callouts/paper.png'
import bulbIcon  from '../public/callouts/bulb.png'
import fireIcon  from '../public/callouts/fire.png'
import cleanIcon from '../public/callouts/clean.png'
import codeIcon  from '../public/callouts/code.png'
import brainIcon from '../public/callouts/brain.png'

const props = defineProps<{
  type?: string
  title: string
  icon?: string
  color?: string
}>()

const presets: Record<string, { icon: string; color: string }> = {
  definition: { icon: paperIcon, color: '#a9836e' },
  info:       { icon: bulbIcon,  color: '#e0af68' },
  warning:    { icon: fireIcon,  color: '#f7768e' },
  clean:      { icon: cleanIcon, color: '#7dcfff' },
  code:       { icon: codeIcon,  color: '#565f89' },
  learn:      { icon: brainIcon, color: '#bb9af7' },
}

const preset = props.type ? presets[props.type] : undefined
const resolvedColor = props.color ?? preset?.color ?? '#7dcfff'
const resolvedIcon  = props.icon  ?? preset?.icon  ?? 'i-ph-info'

// true = UnoCSS icon class, false = image path
const isUnoIcon = resolvedIcon.startsWith('i-')
</script>

<template>
  <div class="callout" :data-type="type" :style="{ '--callout-color': resolvedColor }">
    <div class="callout-header">
      <span v-if="isUnoIcon"  class="callout-icon" :class="resolvedIcon" />
      <img  v-else            class="callout-icon" :src="resolvedIcon" aria-hidden="true" />
      <span class="callout-title">{{ title }}</span>
    </div>
    <div class="callout-body">
      <slot />
    </div>
  </div>
</template>
