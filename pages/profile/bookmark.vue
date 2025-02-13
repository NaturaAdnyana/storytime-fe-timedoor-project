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
        v-if="
          stories?.userBookmarks['newest']?.[currentPage.userBookmarks]?.data
            .length === 0
        "
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
          v-for="(story, idx) in stories?.userBookmarks['newest']?.[
            currentPage.userBookmarks
          ]?.data"
          :key="idx"
        >
          <StoryCard
            showAction="bookmark-only"
            :userId="user?.id"
            :data="story"
            getStory="userBookmarks"
          />
        </div>
      </div>
    </template>
    <BasePagination
      v-model="currentPage.userBookmarks"
      v-show="
        stories?.userBookmarks['newest'] &&
        stories?.userBookmarks['newest']?.[currentPage.userBookmarks]?.data
          .length !== 0
      "
      :from="
        stories?.userBookmarks['newest']?.[currentPage.userBookmarks]?.from || 0
      "
      :to="
        stories?.userBookmarks['newest']?.[currentPage.userBookmarks]?.to || 0
      "
      :totalResult="
        stories?.userBookmarks['newest']?.[currentPage.userBookmarks]?.total ||
        0
      "
      :totalPage="
        stories?.userBookmarks['newest']?.[currentPage.userBookmarks]
          ?.last_page || 0
      "
      :currentPage="currentPage.userBookmarks"
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

currentPage.value.userBookmarks = parseInt(route.query.page) || 1;

const { status } = await useLazyAsyncData(
  "bookmark-stories",
  () =>
    storyStore.getStories("userBookmarks", {
      sort: "newest",
      page: currentPage.value.userBookmarks,
    }),
  {
    server: false,
  }
);

onBeforeUnmount(() => {
  storyStore.clearStories("userBookmarks");
});

watch(
  stories,
  async () => {
    if (
      stories?.value?.userBookmarks?.newest?.[currentPage.value.userBookmarks]
        ?.data.length === 0 &&
      route.query.page > 1
    ) {
      router.push({
        query: {
          ...route.query,
          page: 1,
        },
      });
      await useLazyAsyncData("stories", () =>
        storyStore.getStories("userBookmarks", {
          sort: "newest",
          page: 1,
        })
      );
    }
  },
  { deep: true }
);

watch(
  currentPage,
  async (newPage) => {
    router.push({
      query: {
        ...route.query,
        page: newPage.userBookmarks,
      },
    });
    await useLazyAsyncData("stories", () =>
      storyStore.getStories("userBookmarks", {
        sort: "newest",
        page: newPage.userBookmarks,
      })
    );
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
