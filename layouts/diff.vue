<template>
  <div class="slidev-layout diff">
    <IdeFrame
      :filename="$frontmatter.filename ?? 'changes.diff'"
      :language="$frontmatter.language ?? 'Diff'"
      :branch="$frontmatter.branch ?? 'main'"
      :repo="$frontmatter.repo ?? 'cyberpunk-ide'"
    >
      <slot />
    </IdeFrame>
  </div>
</template>
