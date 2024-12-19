<template>
  <NuxtLink :to="to" :class="['rounded-lg px-5 py-2', customClass]">
    <slot />
  </NuxtLink>
</template>

<script setup>
const { to, customClass } = defineProps({
  to: String,
  customClass: {
    type: String,
    default: "",
  },
});
</script>
