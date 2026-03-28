<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{ text: string }>()

const rendered = computed(() =>
  props.text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/&#96;(.*?)&#96;/g, '<code>$1</code>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>'),
)

const boxRef = ref<HTMLElement>()

function adjust() {
  const box = boxRef.value
  if (!box) return

  // Reset so we measure the natural position
  box.style.left = ''
  box.style.right = ''
  box.style.transform = ''

  const rect = box.getBoundingClientRect()

  // Clamp horizontally inside the viewport
  if (rect.right > window.innerWidth - 8) {
    box.style.left = 'auto'
    box.style.right = '0'
    box.style.transform = 'none'
  }
  else if (rect.left < 8) {
    box.style.left = '0'
    box.style.right = 'auto'
    box.style.transform = 'none'
  }
}
</script>

<template>
  <span class="cp-tooltip-trigger" @mouseenter="adjust">
    <slot />
    <span ref="boxRef" class="cp-tooltip-box" v-html="rendered" />
  </span>
</template>
