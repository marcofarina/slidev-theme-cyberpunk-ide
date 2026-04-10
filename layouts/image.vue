<template>
  <div
    class="slidev-layout image"
    :style="{
      backgroundImage: `url('${$frontmatter.image}')`,
      backgroundSize: $frontmatter.backgroundSize ?? 'cover',
      backgroundPosition: $frontmatter.backgroundPosition ?? 'center',
    }"
  >
    <div
      class="image-overlay"
      :style="{ '--image-dim': ($frontmatter.dim ?? 50) / 100 }"
    />
    <div class="image-inner">
      <slot />
    </div>
  </div>
</template>
