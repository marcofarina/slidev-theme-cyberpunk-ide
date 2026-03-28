<template>
  <div class="slidev-layout default">
    <IdeFrame
      :filename="$frontmatter.filename ?? 'main.py'"
      :language="$frontmatter.language ?? 'Python'"
      :branch="$frontmatter.branch ?? 'main'"
      :repo="$frontmatter.repo ?? 'cyberpunk-ide'"
    >
      <slot />
    </IdeFrame>
  </div>
</template>
