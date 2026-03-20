<template>
  <div class="min-h-screen bg-paper text-ink">
    <div
      class="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[26rem] bg-[radial-gradient(circle_at_top_left,rgba(209,132,89,0.18),transparent_28rem)]"
    />
    <div
      class="pointer-events-none fixed inset-x-0 top-[26rem] -z-10 h-[32rem] bg-[radial-gradient(circle_at_right,rgba(141,165,179,0.16),transparent_24rem)]"
    />

    <SiteHeaderBar />

    <main class="pb-20 pt-10 md:pb-24 md:pt-14">
      <div class="site-shell">
        <slot />
      </div>
    </main>

    <SiteFooterBar />
  </div>
</template>
