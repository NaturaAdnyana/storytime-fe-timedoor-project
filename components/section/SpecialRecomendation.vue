<template>
  <section class="mb-24">
    <div
      class="flex justify-between items-center mx-6 lg:mx-[110px] border-b py-8"
    >
      <h2 class="heading-shadow">{{ title || "Story" }}</h2>
      <NuxtLink :to="to">
        Explore More <ArrowRightIcon class="size-3 inline" />
      </NuxtLink>
    </div>
    <div
      v-if="status == 'pending'"
      class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mx-6 lg:mx-[110px]"
    >
      <StoryCard :isLoading="true" />
      <StoryCard :isLoading="true" />
      <StoryCard :isLoading="true" />
    </div>
    <div
      v-else-if="status == 'success'"
      class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mx-6 lg:mx-[110px]"
    >
      <StoryCard
        class="lg:col-span-2 lg:row-span-2"
        :data="data?.data?.stories?.data[0]"
        showAction="bookmark-only"
      />
      <StoryCard
        :data="data?.data?.stories?.data[1]"
        showAction="bookmark-only"
      />
      <StoryCard
        :data="data?.data?.stories?.data[2]"
        showAction="bookmark-only"
      />
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
const { title, params, to } = defineProps({
  title: String,
  params: String,
  to: String,
});

const storyStore = useStoryStore();

const { data, status } = await useLazyAsyncData(`story-${params}`, () =>
  storyStore.fetchStories("all", 1, params)
);

onBeforeUnmount(() => {
  storyStore.clearStories();
});
</script>
