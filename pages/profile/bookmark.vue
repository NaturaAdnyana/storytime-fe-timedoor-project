<template>
  <div class="px-0 md:pl-10">
    <div
      v-if="status == 'pending'"
      class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10 pb-10"
    >
      <StoryCard :isLoading="true" />
      <StoryCard :isLoading="true" />
    </div>
    <template v-else>
      <div
        v-if="stories?.bookmarks[currentPage.bookmarks]?.data.length === 0"
        class="flex flex-col items-center gap-6 text-center"
      >
        <h3 class="font-playfair-display font-semibold">No Bookmarks Yet</h3>
        <p class="px-10">
          You haven't saved any bookmarks yet. Explore and bookmark your top
          workouts!
        </p>
        <NuxtImg
          src="/images/empty-bookmark.svg"
          alt="Not stories!"
          class="w-1/3"
        />
      </div>
      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10 pb-10"
      >
        <div
          v-for="(story, idx) in stories?.bookmarks[currentPage.bookmarks]
            ?.data"
          :key="idx"
        >
          <StoryCard
            showAction="bookmark-only"
            :userId="user?.id"
            :data="story"
            getStory="bookmarks"
          />
        </div>
      </div>
    </template>
    <BasePagination
      v-model="currentPage.bookmarks"
      v-show="
        stories?.bookmarks &&
        stories?.bookmarks[currentPage.bookmarks]?.data.length !== 0
      "
      :from="stories?.bookmarks[currentPage.bookmarks]?.from || 0"
      :to="stories?.bookmarks[currentPage.bookmarks]?.to || 0"
      :totalResult="stories?.bookmarks[currentPage.bookmarks]?.total || 0"
      :totalPage="stories?.bookmarks[currentPage.bookmarks]?.last_page || 0"
      :currentPage="currentPage.bookmarks"
      :isLoading="status"
    />
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const storyStore = useStoryStore();
const route = useRoute();
const router = useRouter();

const { user } = storeToRefs(authStore);

const { stories, currentPage } = storeToRefs(storyStore);

currentPage.value.myStories = parseInt(route.query.page) || 1;

const { status } = await useLazyAsyncData("stories", () =>
  storyStore.fetchStories("bookmarks", currentPage.value.bookmarks)
);

onBeforeUnmount(() => {
  storyStore.clearStories("bookmarks");
});

watch(
  currentPage,
  async (newPage) => {
    router.push({
      query: {
        ...route.query,
        page: newPage.bookmarks,
      },
    });
    await useLazyAsyncData("stories", () =>
      storyStore.fetchStories("bookmarks", newPage.bookmarks)
    );
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
