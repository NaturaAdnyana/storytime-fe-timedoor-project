<template>
  <div class="px-0 md:pl-10">
    <div
      v-if="status == 'pending'"
      class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10 pb-10"
    >
      <StoryCard :isLoading="true" is-user="user" />
      <StoryCard :isLoading="true" />
    </div>
    <template v-else>
      <div
        v-if="stories?.myStories[currentPage.myStories]?.data.length === 0"
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
          v-for="(story, idx) in stories?.myStories[currentPage.myStories]
            ?.data"
          :key="idx"
        >
          <StoryCard
            :showAction="true"
            :userId="user.id"
            :data="story"
            @bookmarkClicked="handleBookmark"
            @deleteClicked="handleDelete"
          />
        </div>
      </div>
    </template>
    <BasePagination
      v-model="currentPage.myStories"
      v-show="
        stories?.myStories &&
        stories?.myStories[currentPage.myStories]?.data.length !== 0
      "
      :from="stories?.myStories[currentPage.myStories]?.from || 0"
      :to="stories?.myStories[currentPage.myStories]?.to || 0"
      :totalResult="stories?.myStories[currentPage.myStories]?.total || 0"
      :totalPage="stories?.myStories[currentPage.myStories]?.last_page || 0"
      :currentPage="currentPage.myStories"
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
  storyStore.fetchStories("myStories", currentPage.value.myStories)
);

onBeforeUnmount(() => {
  storyStore.clearStories();
});

watch(
  currentPage,
  async (newPage) => {
    router.push({
      query: {
        ...route.query,
        page: newPage.myStories,
      },
    });
    await useLazyAsyncData("stories", () =>
      storyStore.fetchStories("myStories", newPage.myStories)
    );
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
