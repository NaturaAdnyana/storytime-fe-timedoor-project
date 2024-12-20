<template>
  <NuxtLink :to="to" class="inline-block rounded-lg px-5 py-2 cursor-pointer">
    <slot />
  </NuxtLink>
</template>

<script setup>
const { to } = defineProps({
  to: String,
});
</script>
