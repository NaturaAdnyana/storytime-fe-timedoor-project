<template>
  <NuxtLink :to="to" class="rounded-lg px-5 py-2">
    <slot />
  </NuxtLink>
</template>

<script setup>
const { to } = defineProps({
  to: String,
});
</script>
