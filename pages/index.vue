<template>
  <section
    class="text-center min-h-screen flex flex-col justify-center gap-7 mx-20 lg:mx-[110px]"
  >
    <div class="flex flex-col gap-7">
      <h1 class="heading-shadow">Welcome to Storytime</h1>
      <p class="text-quartz">
        The world's most-loved social storytelling platform. Story time connects
        a global community of 90 million readers and writers through the power
        of story.
      </p>
    </div>
    <form @submit.prevent="handleSearch">
      <BaseSearchBar v-model="searchQuery" class="lg:w-2/3" />
    </form>
    <NuxtImg
      src="/images/hero.png"
      class="mx-auto w-full lg:w-1/2"
      format="webp"
    />
  </section>
  <SectionStoryRecomendation to="/stories" />
  <SectionSpecialRecomendation to="/stories" />
  <SectionStoryRecomendation to="/stories" />
  <SectionSpecialRecomendation to="/stories" />
  <SectionMoreCategories />
</template>

<script setup>
const searchQuery = ref("");

const handleSearch = () => {
  console.log(searchQuery.value);
};
</script>
