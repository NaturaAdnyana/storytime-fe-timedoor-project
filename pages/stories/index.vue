<template>
  <div class="py-10 mx-10 lg:mx-[110px]">
    <h1 class="text-3xl font-semibold h-8">
      {{
        status === "idle" || status === "pending"
          ? ""
          : route.query.keyword
          ? stories?.public[currentParamsName]?.[currentPage.public]?.total +
            " result for '" +
            route.query.keyword +
            "'"
          : selectedCategory.name == "All"
          ? "All Stories"
          : selectedCategory.name || "Stories"
      }}
    </h1>
  </div>
  <SectionBreadCrumbs
    :preffix="[
      {
        name: 'Home',
        url: '/',
      },
    ]"
  />
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
        <BaseSearchBar
          v-model="searchQuery"
          :isLoading="status === 'idle' || status === 'pending' || isLoading"
        />
      </form>
    </div>
    <div class="px-10 lg:px-[110px] pb-10">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-10 pb-10"
      >
        <template v-if="status === 'idle' || status === 'pending' || isLoading">
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
const sortType = [
  { name: "Newest", slug: "newest" },
  { name: "Popular", slug: "popular" },
  { name: "A - Z", slug: "a-z" },
  { name: "Z- A", slug: "z-a" },
];

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const storyStore = useStoryStore();

const { user } = storeToRefs(authStore);
const { stories, currentPage, categories, currentParamsName } =
  storeToRefs(storyStore);

const isLoading = ref(false);
const skeletons = ref(Array.from({ length: 12 }));

const { status: categoriesStatus } = useAsyncData(
  "categories",
  () => storyStore.getCategories(),
  {
    server: false,
  }
);

const selectedSortType = ref(
  sortType.find((item) => item.slug === route.query.sort) || sortType[0]
);

const selectedCategory = ref({ name: "All" });

watch(categoriesStatus, () => {
  if (categoriesStatus.value === "success") {
    selectedCategory.value = categories?.value?.find(
      (item) => item.slug === route.query.category
    ) || {
      name: "Error",
    };
  }
});

const searchQuery = ref(route.query.keyword || "");

currentPage.value.public = parseInt(route.query.page) || 1;

const { refresh, status } = await useLazyAsyncData(
  "stories-" + currentParamsName.value,
  () =>
    storyStore.getStories("public", {
      page: parseInt(route.query.page) || 1,
      sort: route.query.sort || sortType[0],
      category: route.query.category || "",
      keyword: route.query.keyword || "",
    }),
  {
    server: false,
  }
);

watch(selectedSortType, async (newValue) => {
  router.push({
    query: {
      ...route.query,
      sort: newValue?.slug,
      page: 1,
    },
  });
});

watch(selectedCategory, async (newValue) => {
  router.push({
    query: {
      ...route.query,
      category: newValue?.slug,
      page: 1,
    },
  });
});

const handleSearch = async () => {
  router.push({
    query: {
      ...route.query,
      keyword: searchQuery.value,
      page: 1,
    },
  });
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
  },
  { deep: true }
);

watch(route, async () => {
  isLoading.value = true;
  refresh();
  setReactives();
  isLoading.value = false;
});

onBeforeUnmount(() => {
  storyStore.clearStories("public");
});

async function setReactives() {
  selectedSortType.value =
    sortType.find((item) => item.slug === route.query.sort) || sortType[0];

  searchQuery.value = route.query.keyword || "";

  selectedCategory.value =
    categories.value.find((item) => item.slug === route.query.category) ||
    categories.value[0];

  currentPage.value.public = parseInt(route.query.page) || 1;
}
</script>

<style lang="scss" scoped></style>
