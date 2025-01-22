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
        v-if="stories?.userStories[currentPage.userStories]?.data.length === 0"
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
          v-for="(story, idx) in stories?.userStories[currentPage.userStories]
            ?.data"
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
        stories?.userStories &&
        stories?.userStories[currentPage.userStories]?.data.length !== 0
      "
      :from="stories?.userStories[currentPage.userStories]?.from || 0"
      :to="stories?.userStories[currentPage.userStories]?.to || 0"
      :totalResult="stories?.userStories[currentPage.userStories]?.total || 0"
      :totalPage="stories?.userStories[currentPage.userStories]?.last_page || 0"
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
  storyStore.getStories("userStories", currentPage.value.userStories)
);

onBeforeUnmount(() => {
  storyStore.clearStories("userStories");
});

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
      storyStore.getStories("userStories", newPage.userStories)
    );
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
