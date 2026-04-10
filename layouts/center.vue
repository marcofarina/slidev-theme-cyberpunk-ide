<template>
  <div class="slidev-layout center">
    <IdeFrame
      :filename="$frontmatter.filename ?? 'main.py'"
      :language="$frontmatter.language ?? 'Python'"
      :branch="$frontmatter.branch ?? 'main'"
      :repo="$frontmatter.repo ?? 'cyberpunk-ide'"
    >
      <div class="center-wrapper">
        <div v-if="$frontmatter.title" class="center-title">
          <h1>{{ $frontmatter.title }}</h1>
        </div>
        <div class="center-body">
          <slot />
        </div>
      </div>
    </IdeFrame>
  </div>
</template>
