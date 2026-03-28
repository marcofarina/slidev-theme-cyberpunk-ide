<template>
  <div class="slidev-layout cover">
    <div class="cover-bracket-tl" />
    <div class="cover-bracket-br" />

    <!-- Top bar: logo slots (only rendered if used) -->
    <div v-if="$slots.logo || $slots['logo-right']" class="cover-topbar">
      <div class="cover-logo-left">
        <slot name="logo" />
      </div>
      <div class="cover-logo-right">
        <slot name="logo-right" />
      </div>
    </div>

    <!-- Main content -->
    <div class="cover-inner">
      <slot />
    </div>

    <!-- Bottom sponsors strip (only rendered if used) -->
    <div v-if="$slots.sponsors" class="cover-sponsors">
      <slot name="sponsors" />
    </div>
  </div>
</template>
