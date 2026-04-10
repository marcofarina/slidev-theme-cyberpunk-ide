<template>
  <div class="slidev-layout image-left">
    <IdeFrame
      :filename="$frontmatter.filename ?? 'main.py'"
      :language="$frontmatter.language ?? 'Python'"
      :branch="$frontmatter.branch ?? 'main'"
      :repo="$frontmatter.repo ?? 'cyberpunk-ide'"
    >
      <div class="image-split-body" :class="`cols-${$frontmatter.cols ?? '2-3'}`">
        <div
          class="image-split-panel"
          :style="{
            backgroundImage: `url('${$frontmatter.image}')`,
            backgroundSize: $frontmatter.backgroundSize ?? 'cover',
            backgroundPosition: $frontmatter.backgroundPosition ?? 'center',
          }"
        />
        <div class="image-split-content">
          <slot />
        </div>
      </div>
    </IdeFrame>
  </div>
</template>
