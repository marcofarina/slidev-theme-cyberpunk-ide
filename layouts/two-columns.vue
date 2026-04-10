<template>
  <div class="slidev-layout two-columns">
    <IdeFrame
      :filename="$frontmatter.filename ?? 'main.py'"
      :language="$frontmatter.language ?? 'Python'"
      :branch="$frontmatter.branch ?? 'main'"
      :repo="$frontmatter.repo ?? 'cyberpunk-ide'"
    >
      <div class="two-col-wrapper">
        <div class="two-col-title">
          <slot />
        </div>
        <div class="two-col-body" :class="`cols-${$frontmatter.cols ?? '2-2'}`">
          <div class="two-col-left">
            <slot name="left" />
          </div>
          <div class="two-col-divider" />
          <div class="two-col-right">
            <slot name="right" />
          </div>
        </div>
      </div>
    </IdeFrame>
  </div>
</template>
