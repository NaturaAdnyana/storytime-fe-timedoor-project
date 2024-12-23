<template>
  <div
    v-if="slides.length === 0"
    class="flex flex-col items-center gap-6 text-center"
  >
    <h3 class="font-playfair-display font-semibold">No Stories Yet</h3>
    <p class="px-10">
      You haven't shared any stories yet. Start your fitness journey today!
    </p>
    <img src="/images/empty-story.svg" alt="Empty Story" class="w-1/3" />
  </div>
  <div v-else class="px-0 md:pl-10">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10 pb-10">
      <div v-for="(slide, idx) in slides" :key="idx">
        <StoryCard :show-action="true" is-user="user" />
      </div>
    </div>
    <BasePagination />
  </div>
</template>

<script setup>
const slides = ref(Array.from({ length: 10 }));
// const slides = [];

const user = ref({
  name: "Iswara",
  email: "",
});
</script>

<style lang="scss" scoped></style>
