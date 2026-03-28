<template>
  <div class="slidev-layout section">
    <div class="section-inner">
      <div class="section-eyebrow">{{ $frontmatter.section ?? 'Modulo' }}</div>
      <slot />
      <div class="section-bar" />
    </div>
  </div>
</template>
