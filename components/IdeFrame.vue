<script setup lang="ts">
import { configs } from '@slidev/client'
import { useNav } from '@slidev/client'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

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
    // Global filter: skip cover/section layouts unless tabsShowAll is set
    if (!tabsShowAll.value) {
      const layout = (slide?.meta as any)?.layout ?? fm.layout
      if (layout === 'cover' || layout === 'section') return false
    }
    return true
  })
})

function slideFilename(no: number): string {
  const slide = slides.value.find(s => s.no === no)
  return slide?.meta?.slide?.frontmatter?.filename ?? `slide-${no}.md`
}

const tabbarEl = ref<HTMLElement>()

// On first mount: snap to active tab by setting scrollLeft directly.
// scrollIntoView (even with behavior:'instant') can still animate if the
// browser inherits scroll-behavior:smooth, so we avoid it entirely here.
onMounted(async () => {
  await nextTick()
  const tabbar = tabbarEl.value
  const active = tabbar?.querySelector<HTMLElement>('.ide-tab.active')
  if (tabbar && active) {
    tabbar.scrollLeft = active.offsetLeft - (tabbar.offsetWidth - active.offsetWidth) / 2
  }
})

// On navigation: smooth scroll to active tab
watch(currentPage, async () => {
  await nextTick()
  const active = tabbarEl.value?.querySelector<HTMLElement>('.ide-tab.active')
  if (active) active.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
})
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
