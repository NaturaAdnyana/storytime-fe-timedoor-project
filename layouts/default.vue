<template>
  <AppHeader />
  <main class="min-h-screen pt-[64px] lg:pt-[74px]">
    <slot />
  </main>
  <AppFooter />
</template>

<script setup>
provideHeadlessUseId(() => useId());
</script>
