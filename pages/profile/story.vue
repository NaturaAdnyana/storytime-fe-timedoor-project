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
          stories?.userStories['newest']?.[currentPage.userStories]?.data
            .length === 0
        "
        class="flex flex-col items-center gap-6 text-center"
      >
        <h3 class="font-playfair-display font-semibold">No Stories Yet</h3>
        <p class="px-10">
          You haven't shared any stories yet. Start your fitness journey today!
        </p>
        <NuxtImg
          src="/images/empty-story.svg"
          alt="Not stories!"
          class="w-1/3"
        />
      </div>
      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10 pb-10"
      >
        <div
          v-for="(story, idx) in stories?.userStories['newest']?.[
            currentPage.userStories
          ]?.data"
          :key="idx"
        >
          <StoryCard
            showAction="all"
            :userId="user?.id"
            :data="story"
            getStory="userStories"
          />
        </div>
      </div>
    </template>
    <BasePagination
      v-model="currentPage.userStories"
      v-show="
        stories?.userStories['newest'] &&
        stories?.userStories['newest']?.[currentPage.userStories]?.data
          .length !== 0
      "
      :from="
        stories?.userStories['newest']?.[currentPage.userStories]?.from || 0
      "
      :to="stories?.userStories['newest']?.[currentPage.userStories]?.to || 0"
      :totalResult="
        stories?.userStories['newest']?.[currentPage.userStories]?.total || 0
      "
      :totalPage="
        stories?.userStories['newest']?.[currentPage.userStories]?.last_page ||
        0
      "
      :currentPage="currentPage.userStories"
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

currentPage.value.userStories = parseInt(route.query.page) || 1;

const { status } = await useLazyAsyncData("stories", () =>
  storyStore.getStories("userStories", {
    sort: "newest",
    page: currentPage.value.userStories,
  })
);

onBeforeUnmount(() => {
  storyStore.clearStories("userStories");
});

watch(
  stories,
  async () => {
    if (
      stories?.value?.userStories?.newest?.[currentPage.value.userStories]?.data
        .length === 0 &&
      route.query.page > 1
    ) {
      router.push({
        query: {
          ...route.query,
          page: 1,
        },
      });
      await useLazyAsyncData("stories", () =>
        storyStore.getStories("userStories", {
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
        page: newPage.userStories,
      },
    });
    await useLazyAsyncData("stories", () =>
      storyStore.getStories("userStories", {
        sort: "newest",
        page: newPage.userStories,
      })
    );
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
