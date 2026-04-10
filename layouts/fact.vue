<template>
  <div class="slidev-layout fact">
    <div class="fact-inner">
      <div class="fact-eyebrow">{{ $frontmatter.fact ?? 'fact' }}</div>
      <slot />
    </div>
    <div v-if="$slots.source" class="fact-source">
      <slot name="source" />
    </div>
    <div class="fact-bar" />
  </div>
</template>
