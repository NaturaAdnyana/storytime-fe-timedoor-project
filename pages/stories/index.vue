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
        <template v-if="status === 'pending' || isLoading">
          <div v-for="skeleton in skeletons" :key="skeleton">
            <StoryCard :isLoading="true" />
          </div>
        </template>
        <template v-else-if="status === 'success' || !isLoading">
          <div
            v-if="
              stories?.public[currentParamsName]?.[currentPage.public]?.data
                .length === 0
            "
            class="sm:col-span-2 lg:col-span-3 py-10"
          >
            <div class="flex flex-col items-center gap-6 text-center">
              <h3 class="font-playfair-display font-semibold">
                No Stories Found
              </h3>
              <p class="px-10">
                There are no stories found with the current filter. Please try
                again with different filter.
              </p>
              <NuxtImg
                src="/images/empty-story.svg"
                alt="Not stories!"
                class="w-1/2 md:w-1/5"
              />
            </div>
          </div>
          <div
            v-else
            v-for="(story, idx) in stories?.public[currentParamsName]?.[
              currentPage.public
            ]?.data"
            :key="idx"
          >
            <StoryCard
              showAction="bookmark-only"
              :data="story"
              :userId="user?.id || 0"
              getStory="public"
            />
          </div>
        </template>
      </div>
      <BasePagination
        v-model="currentPage.public"
        v-show="
          stories?.public[currentParamsName] &&
          stories?.public[currentParamsName]?.[currentPage.public]?.data
            .length !== 0
        "
        :from="
          stories?.public[currentParamsName]?.[currentPage.public]?.from || 0
        "
        :to="stories?.public[currentParamsName]?.[currentPage.public]?.to || 0"
        :totalResult="
          stories?.public[currentParamsName]?.[currentPage.public]?.total || 0
        "
        :totalPage="
          stories?.public[currentParamsName]?.[currentPage.public]?.last_page ||
          0
        "
        :currentPage="currentPage.public"
        :isLoading="status"
      />
    </div>
  </section>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const storyStore = useStoryStore();

const { user } = storeToRefs(authStore);

const isLoading = ref(false);
const skeletons = ref(Array.from({ length: 12 }));

const sortType = [
  { name: "Newest", slug: "newest" },
  { name: "Popular", slug: "popular" },
  { name: "A - Z", slug: "a-z" },
  { name: "Z- A", slug: "z-a" },
];

const { stories, currentPage, categories, currentParamsName } =
  storeToRefs(storyStore);

const selectedSortType = ref(
  sortType.find((item) => item.slug === route.query.sort) || sortType[0]
);
const searchQuery = ref(route.query.keyword || "");

if (!storyStore.categories) {
  try {
    await useAsyncData("categories", () => storyStore.getCategories());
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

currentPage.value.public = parseInt(route.query.page) || 1;

const { status } = await useLazyAsyncData(
  "stories-" + currentParamsName.value,
  () =>
    storyStore.getStories("public", {
      page: currentPage.value.public,
      sort: selectedSortType.value.slug,
      category: selectedCategory.value.slug,
      keyword: searchQuery.value,
    })
);

watch(selectedSortType, async (newValue, oldValue) => {
  isLoading.value = true;
  currentPage.value.public = 1;
  router.push({
    query: {
      ...route.query,
      sort: newValue?.slug,
      page: currentPage.value.public,
    },
  });
  await storyStore.getStories("public", {
    page: currentPage.value.public,
    sort: newValue.slug,
    category: selectedCategory.value.slug,
    keyword: searchQuery.value,
  });
  isLoading.value = false;
});

watch(selectedCategory, async (newValue, oldValue) => {
  isLoading.value = true;
  currentPage.value.public = 1;

  router.push({
    query: {
      ...route.query,
      category: newValue?.slug,
      page: currentPage.value.public,
    },
  });
  await storyStore.getStories("public", {
    page: currentPage.value.public,
    sort: selectedSortType.value.slug,
    category: newValue.slug,
    keyword: searchQuery.value,
  });
  isLoading.value = false;
});

const handleSearch = async () => {
  isLoading.value = true;
  currentPage.value.public = 1;
  router.push({
    query: {
      ...route.query,
      keyword: searchQuery.value,
      page: currentPage.value.public,
    },
  });
  await storyStore.getStories("public", {
    page: currentPage.value.public,
    sort: selectedSortType.value.slug,
    category: selectedCategory.value.slug,
    keyword: searchQuery.value,
  });
  isLoading.value = false;
};

watch(
  currentPage,
  async (newPage) => {
    router.push({
      query: {
        ...route.query,
        page: newPage.public,
      },
    });
    isLoading.value = true;
    await useLazyAsyncData("stories-" + currentParamsName.value, () =>
      storyStore.getStories("public", {
        page: currentPage.value.public,
        sort: selectedSortType.value.slug,
        category: selectedCategory.value.slug,
        keyword: searchQuery.value,
      })
    );
    isLoading.value = false;
  },
  { deep: true }
);

onBeforeUnmount(() => {
  storyStore.clearStories("public");
});
</script>

<style lang="scss" scoped></style>
