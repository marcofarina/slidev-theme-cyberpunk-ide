<script setup lang="ts">
import { useNav } from '@slidev/client'
import { nextTick, ref, watch } from 'vue'

withDefaults(defineProps<{
  filename?: string
  language?: string
  branch?: string
  repo?: string
}>(), {
  filename: 'main.py',
  language: 'Python',
  branch: 'main',
  repo: 'cyberpunk-ide',
})

const { slides, currentPage, total, go } = useNav()

const tabbarEl = ref<HTMLElement>()

function slideFilename(no: number): string {
  const slide = slides.value.find(s => s.no === no)
  return slide?.meta?.slide?.frontmatter?.filename ?? `slide-${no}.md`
}

// Keep the active tab scrolled into view whenever the slide changes
watch(currentPage, async () => {
  await nextTick()
  const active = tabbarEl.value?.querySelector<HTMLElement>('.ide-tab.active')
  if (active && tabbarEl.value) {
    active.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }
}, { immediate: true })
</script>

<template>
  <div class="ide-frame">

    <!-- Title Bar -->
    <div class="ide-titlebar">
      <div class="ide-traffic-lights">
        <span class="traffic-close" />
        <span class="traffic-minimize" />
        <span class="traffic-maximize" />
      </div>
      <div class="ide-titlebar-text">{{ filename }} — Cyberpunk IDE</div>
    </div>

    <!-- Tab Bar — one tab per slide, active = current slide -->
    <div ref="tabbarEl" class="ide-tabbar">
      <div
        v-for="slide in slides"
        :key="slide.no"
        class="ide-tab"
        :class="{ active: slide.no === currentPage }"
        @click="go(slide.no)"
      >
        <span class="ide-tab-icon">⬡</span>
        <span class="ide-tab-name">{{ slideFilename(slide.no) }}</span>
        <span class="ide-tab-close">×</span>
      </div>
    </div>

    <!-- Editor -->
    <div class="ide-editor">
      <div class="ide-gutter" />
      <div class="ide-content">
        <slot />
      </div>
    </div>

    <!-- Status Bar -->
    <div class="ide-statusbar">
      <div class="status-left">
        <span class="status-item">
          <span class="i-ph-github-logo status-icon" />
          {{ repo }}
        </span>
        <span class="status-sep">›</span>
        <span class="status-item">
          <span class="i-ph-git-branch status-icon" />
          {{ branch }}
        </span>
      </div>
      <div class="status-right">
        <span class="status-item">{{ language }}</span>
        <span class="status-item">UTF-8</span>
        <span class="status-item">
          <span class="i-ph-hash status-icon" />
          {{ currentPage }} / {{ total }}
        </span>
      </div>
    </div>

  </div>
</template>
