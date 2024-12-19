<template>
  <AppHeader />
  <main>
    <slot />
  </main>
  <AppFooter />
</template>

<script setup>
provideHeadlessUseId(() => useId());
</script>
