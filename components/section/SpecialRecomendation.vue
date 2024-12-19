<template>
  <section class="mb-24">
    <div
      class="flex justify-between items-center mx-6 lg:mx-[110px] border-b py-8"
    >
      <h2 class="heading-shadow">Latest Story</h2>
      <NuxtLink :to="to">
        Explore More <ArrowRightIcon class="size-3 inline" />
      </NuxtLink>
    </div>
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mx-6 lg:mx-[110px]">
      <StoryCard class="lg:col-span-2 lg:row-span-2" />
      <StoryCard />
      <StoryCard />
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
const { to } = defineProps({
  to: String,
});
</script>
