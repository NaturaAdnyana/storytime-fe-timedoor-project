<template>
  <NuxtLink :to="to" class="btn">
    <slot />
  </NuxtLink>
</template>
btn
<script setup>
const { to } = defineProps({
  to: String,
});
</script>
