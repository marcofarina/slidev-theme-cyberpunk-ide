<template>
  <div class="slidev-layout end">
    <div class="cover-bracket-tr" />
    <div class="cover-bracket-bl" />

    <div class="end-inner">
      <div class="end-eyebrow">EOF</div>
      <slot />
    </div>

    <div v-if="$slots.footer" class="end-footer">
      <slot name="footer" />
      <span class="end-cursor" />
    </div>
  </div>
</template>
