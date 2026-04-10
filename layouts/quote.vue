<template>
  <div class="slidev-layout quote">
    <div class="quote-inner">
      <div class="quote-eyebrow">quote</div>
      <div class="quote-body">
        <slot />
      </div>
      <div v-if="$slots.author" class="quote-author">
        <slot name="author" />
      </div>
    </div>
  </div>
</template>
