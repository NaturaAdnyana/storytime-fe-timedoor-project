<template>
  <section>
    <div class="py-10 mx-10 lg:mx-[110px]">
      <h1 class="text-3xl font-semibold">All Stories</h1>
    </div>
    <div class="py-5 px-10 lg:px-[110px] bg-isabelline-sc">
      <ul class="flex gap-x-5 text-gray-asparagus-tr">
        <li>
          <NuxtLink to="/"><span class="hover:underline">Home</span> </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/"
            ><span class="mr-5">/</span
            ><span class="hover:underline">All Stories</span></NuxtLink
          >
        </li>
      </ul>
    </div>
  </section>
  <section>
    <div
      class="py-10 px-10 lg:px-[110px] text-xs md:text-lg md:gap-10 flex justify-between flex-wrap"
    >
      <div class="flex items-center md:gap-3 pb-5 md:pb-0">
        <h4 class="font-dm-sans font-normal">Sort by</h4>
        <BaseSelectFilter
          class="mr-5"
          :items="sortType"
          v-model="selectedSortType"
        />
        <h4 class="font-dm-sans font-normal">Category</h4>
        <BaseSelectFilter :items="categories" v-model="selectedCategory" />
      </div>
      <form class="basis-full md:basis-1/3" @submit.prevent="handleSearch">
        <BaseSearchBar v-model="searchQuery" />
      </form>
    </div>
    <div class="px-10 lg:px-[110px] pb-10">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-10 pb-10"
      >
        <div v-for="(slide, idx) in slides" :key="idx">
          <StoryCard :show-action="true" />
        </div>
      </div>
      <BasePagination />
    </div>
  </section>
</template>

<script setup>
const sortType = [
  { name: "Newest" },
  { name: "Popular" },
  { name: "A - Z" },
  { name: "Z- A" },
];

const categories = [
  { name: "Comedy" },
  { name: "Romance" },
  { name: "Horror" },
  { name: "Adventure" },
  { name: "Fiction" },
  { name: "Fantasy" },
  { name: "Drama" },
  { name: "Heartfelt" },
  { name: "Mystery" },
];
const selectedSortType = ref(sortType[0]);
const selectedCategory = ref(categories[0]);
const searchQuery = ref("");

watch(selectedSortType, (newValue, oldValue) => {
  console.log("Sort Type changed from", oldValue?.name, "to", newValue?.name);
});

watch(selectedCategory, (newValue, oldValue) => {
  console.log("Category changed from", oldValue?.name, "to", newValue?.name);
});

const slides = ref(Array.from({ length: 10 }));

const handleSearch = () => {
  console.log(searchQuery.value);
};
</script>

<style lang="scss" scoped></style>
