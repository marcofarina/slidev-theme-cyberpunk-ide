<script lang="ts">
// Module scope: shared across all IdeFrame instances so the tab bar scroll feels
// continuous. Going forward the active tab drifts right until it pins to the right
// edge; going back it drifts left until it pins to the left edge.
const sharedScrollLeft = { value: 0 }
</script>

<script setup lang="ts">
import { configs, onSlideEnter, useNav } from '@slidev/client'
import { computed, nextTick, ref } from 'vue'

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

// themeConfig.tabsShowAll: true  → show every slide in the tab bar
// default (false/unset)          → hide slides with layout cover or section
const tabsShowAll = computed(() => {
  const v = configs.themeConfig?.tabsShowAll
  return v === true || v === 'true' || v === 1
})

const visibleSlides = computed(() => {
  return slides.value.filter((slide) => {
    const fm = slide?.meta?.slide?.frontmatter ?? {}
    // Per-slide explicit opt-out
    if (fm.hideTab === true || fm.hideTab === 'true') return false
    // Global filter: skip ambient (non-IDE-chrome) layouts unless tabsShowAll is set
    if (!tabsShowAll.value) {
      const layout = (slide?.meta as any)?.layout ?? fm.layout
      const HIDDEN_LAYOUTS = new Set(['cover', 'section', 'end', 'fact', 'quote', 'image', 'full'])
      if (HIDDEN_LAYOUTS.has(layout)) return false
    }
    return true
  })
})

function slideFilename(no: number): string {
  const slide = slides.value.find(s => s.no === no)
  return slide?.meta?.slide?.frontmatter?.filename ?? `slide-${no}.md`
}

const tabbarEl = ref<HTMLElement>()

function syncScroll() {
  const tabbar = tabbarEl.value
  const active = tabbar?.querySelector<HTMLElement>('.ide-tab.active')
  if (!tabbar || !active || !tabbar.offsetWidth) return

  // Inherit the shared scroll position first, then nudge only if the active tab
  // has fallen outside the visible area.
  tabbar.scrollLeft = sharedScrollLeft.value

  const PADDING = 8
  const tabLeft  = active.offsetLeft
  const tabRight = tabLeft + active.offsetWidth
  const barLeft  = tabbar.scrollLeft
  const barRight = barLeft + tabbar.offsetWidth

  let target: number | null = null
  if (tabLeft < barLeft + PADDING)
    target = tabLeft - PADDING
  else if (tabRight > barRight - PADDING)
    target = tabRight - tabbar.offsetWidth + PADDING

  if (target !== null) {
    tabbar.scrollLeft = Math.max(0, target)
    sharedScrollLeft.value = tabbar.scrollLeft
  }
}

// Each SlideWrapper is mounted once (behind v-show) and revealed later. onMounted
// fires while offsetWidth is 0, so we wait until the slide actually becomes active.
onSlideEnter(() => { nextTick(syncScroll) })
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

    <!-- Tab Bar -->
    <div ref="tabbarEl" class="ide-tabbar">
      <div
        v-for="slide in visibleSlides"
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
