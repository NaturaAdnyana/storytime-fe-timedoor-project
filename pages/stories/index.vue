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
        <BaseSelectFilter :items="allCategories" v-model="selectedCategory" />
      </div>
      <form class="basis-full md:basis-1/3" @submit.prevent="handleSearch">
        <BaseSearchBar v-model="searchQuery" />
      </form>
    </div>
    <div class="px-10 lg:px-[110px] pb-10">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-10 pb-10"
      >
        <template v-if="status === 'pending'"></template>
        <template v-else-if="status === 'success'">
          <div
            v-for="(story, idx) in stories?.all[currentPage.all]?.data"
            :key="idx"
          >
            <StoryCard
              showAction="bookmark-only"
              :data="story"
              getStory="all"
            />
          </div>
        </template>
      </div>
      <BasePagination />
    </div>
  </section>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const storyStore = useStoryStore();

const slides = ref(Array.from({ length: 10 }));

const sortType = [
  { name: "Newest", slug: "newest" },
  { name: "Popular", slug: "popular" },
  { name: "A - Z", slug: "a-z" },
  { name: "Z- A", slug: "z-a" },
];

const { stories, currentPage, categories } = storeToRefs(storyStore);

const selectedSortType = ref(
  sortType.find((item) => item.slug === route.query.sort) || sortType[0]
);
const searchQuery = ref("");

if (!storyStore.categories) {
  try {
    await useAsyncData("categories", () => storyStore.fetchCategories());
  } catch (error) {
    console.log(error);
  }
}

const allCategories = computed(() => {
  return [{ name: "All" }, ...categories?.value];
});

const selectedCategory = ref(
  allCategories.value.find((item) => item.slug === route.query.category) ||
    allCategories.value[0]
);

currentPage.value.all = parseInt(route.query.page) || 1;

const { status } = await useLazyAsyncData("stories-all", () =>
  storyStore.fetchStories("all", currentPage.value.all)
);

// watch(selectedSortType, async (newValue, oldValue) => {
//   router.push({
//     query: {
//       ...route.query,
//       sort: newValue?.slug,
//     },
//   });
//   await useLazyAsyncData("stories-all", () =>
//     storyStore.fetchStories("all", newPage.all)
//   );
// });

// watch(selectedCategory, async (newValue, oldValue) => {
//   router.push({
//     query: {
//       ...route.query,
//       category: newValue?.slug,
//     },
//   });
//   await useLazyAsyncData("stories-all", () =>
//     storyStore.fetchStories("all", newPage.all)
//   );
// });

const handleSearch = () => {
  console.log(searchQuery.value);
};

onBeforeUnmount(() => {
  storyStore.clearStories("all");
});
</script>

<style lang="scss" scoped></style>
