<template>
  <div class="min-h-screen bg-paper text-ink">
    <div class="signal-line" aria-hidden="true" />
    <SiteHeaderBar />

    <main class="pb-20 pt-10 md:pb-24 md:pt-14">
      <div class="site-shell">
        <slot />
      </div>
    </main>

    <SiteFooterBar />
  </div>
</template>
