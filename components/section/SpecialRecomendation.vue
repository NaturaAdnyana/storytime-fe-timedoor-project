<template>
  <section class="mb-24">
    <div
      class="flex justify-between items-center mx-6 lg:mx-[110px] border-b py-8"
    >
      <h2 class="heading-shadow">{{ title || "Story" }}</h2>
      <NuxtLink
        :to="to"
        class="hover:underline hover:text-gray-asparagus-tr underline-offset-8"
      >
        Explore More <ArrowRightIcon class="size-3 inline" />
      </NuxtLink>
    </div>
    <div
      v-if="status == 'idle' || status == 'pending'"
      class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mx-6 lg:mx-[110px]"
    >
      <StoryCard class="lg:col-span-2 lg:row-span-2" :isLoading="true" />
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
        :userId="user?.id || 0"
        showAction="bookmark-only"
      />
      <StoryCard
        :data="data?.data?.stories?.data[1]"
        :userId="user?.id || 0"
        showAction="bookmark-only"
      />
      <StoryCard
        :data="data?.data?.stories?.data[2]"
        :userId="user?.id || 0"
        showAction="bookmark-only"
      />
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
const { title, params, to } = defineProps({
  title: String,
  params: Object,
  to: String,
});

const authStore = useAuthStore();
const storyStore = useStoryStore();

const { user } = storeToRefs(authStore);

const { currentParamsName } = storeToRefs(storyStore);

storyStore.createParamsName(
  params.page,
  params.sort,
  params.category,
  params.keyword,
  params.paginate
);

const { data, status } = await useLazyAsyncData(
  "stories-" + currentParamsName.value,
  () =>
    storyStore.getStories("public", {
      page: params.page,
      sort: params.sort,
      category: params.category,
      keyword: params.keyword,
      paginate: params.paginate,
    }),
  {
    server: false,
  }
);
</script>
