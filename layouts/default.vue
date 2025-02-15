<template>
  <AppHeader />
  <main class="min-h-screen pt-[65px]">
    <slot />
  </main>
  <AppFooter />
</template>

<script setup>
provideHeadlessUseId(() => useId());
</script>
