<template>
  <div class="slidev-layout cover">
    <div class="cover-bracket-tl" />
    <div class="cover-bracket-br" />

    <div class="cover-inner">
      <!-- Minimal title bar -->
      <div class="cover-titlebar">
        <div class="ide-traffic-lights">
          <span class="traffic-close" />
          <span class="traffic-minimize" />
          <span class="traffic-maximize" />
        </div>
        <div class="ide-titlebar-text">new-file.py — Cyberpunk IDE</div>
      </div>

      <!-- Content -->
      <div class="cover-body">
        <div class="cover-text">
          <slot />
        </div>

        <!-- Decorative pseudo-code block -->
        <div class="cover-deco" aria-hidden="true"><span class="kw">class</span> <span class="fn">Lezione</span>:
  <span class="kw">def</span> <span class="fn">__init__</span>(self):
    self.argomento = <span class="str">"informatica"</span>
    self.livello   = <span class="num">1</span>

  <span class="kw">def</span> <span class="fn">inizia</span>(self):
    <span class="cmt"># pronti? 🚀</span>
    <span class="kw">return</span> <span class="str">"Partiamo!"</span></div>
      </div>
    </div>
  </div>
</template>
