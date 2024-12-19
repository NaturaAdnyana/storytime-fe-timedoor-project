<template>
  <AppHeader />
  <main class="mx-[100px]">
    <slot />
  </main>
  <footer></footer>
</template>

<script setup>
provideHeadlessUseId(() => useId());
</script>
