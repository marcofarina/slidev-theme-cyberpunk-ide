<template>
  <div class="slidev-layout image-right">
    <IdeFrame
      :filename="$frontmatter.filename ?? 'main.py'"
      :language="$frontmatter.language ?? 'Python'"
      :branch="$frontmatter.branch ?? 'main'"
      :repo="$frontmatter.repo ?? 'cyberpunk-ide'"
    >
      <div class="image-split-body" :class="`cols-${$frontmatter.cols ?? '3-2'}`">
        <div class="image-split-content content-left">
          <slot />
        </div>
        <div
          class="image-split-panel"
          :style="{
            backgroundImage: `url('${$frontmatter.image}')`,
            backgroundSize: $frontmatter.backgroundSize ?? 'cover',
            backgroundPosition: $frontmatter.backgroundPosition ?? 'center',
          }"
        />
      </div>
    </IdeFrame>
  </div>
</template>
