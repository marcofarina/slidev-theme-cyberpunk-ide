<script setup lang="ts">
const props = defineProps<{
  type?: string
  title: string
  icon?: string
  color?: string
}>()

const presets: Record<string, { icon: string; color: string }> = {
  definition: { icon: '/callouts/paper.png',  color: '#a9836e' },
  info:       { icon: '/callouts/bulb.png',   color: '#e0af68' },
  warning:    { icon: '/callouts/fire.png',   color: '#f7768e' },
  clean:      { icon: '/callouts/clean.png',  color: '#7dcfff' },
  code:       { icon: '/callouts/code.png',   color: '#565f89' },
  learn:      { icon: '/callouts/brain.png',  color: '#bb9af7' },
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
