<template>
  <section class="mb-24">
    <div
      class="flex justify-between items-center mx-6 lg:mx-[110px] border-b py-8"
    >
      <h2 class="heading-shadow">{{ title || "Story" }}</h2>
      <NuxtLink
        v-show="to"
        :to="to"
        class="hover:underline hover:text-gray-asparagus-tr underline-offset-8"
        >Explore More <ArrowRightIcon class="size-3 inline" />
      </NuxtLink>
    </div>
    <div class="mt-6 mx-0">
      <template v-if="data?.data?.stories?.data.length === 0">
        <div class="py-10">
          <div class="flex flex-col items-center gap-6 text-center">
            <h3 class="font-playfair-display font-semibold">
              No Stories Found
            </h3>
            <p class="px-10">
              There are no stories found with the current filter. Please try
              again with different filter.
            </p>
          </div>
        </div>
      </template>
      <ClientOnly v-else>
        <swiper-container
          ref="containerRef"
          :slides-per-view="3.5"
          :spaceBetween="24"
          :slidesOffsetBefore="105"
          :slidesOffsetAfter="105"
          :breakpoints="{
            0: {
              slidesPerView: 1.15,
              slidesOffsetBefore: 24,
              slidesOffsetAfter: 24,
            },
            640: {
              slidesPerView: 2.5,
              slidesOffsetBefore: 24,
              slidesOffsetAfter: 24,
            },
            1024: { slidesPerView: 3.5 },
          }"
        >
          <template v-if="status == 'pending'">
            <swiper-slide
              v-for="idx in slides"
              :key="idx"
              class="flex flex-col"
            >
              <StoryCard :isLoading="true" />
            </swiper-slide>
          </template>
          <template v-else-if="status == 'success'">
            <swiper-slide
              v-for="(story, idx) in data?.data?.stories?.data"
              :key="idx"
              class="flex flex-col"
            >
              <StoryCard
                :data="story"
                :getStory="getStory"
                :userId="user?.id || 0"
                showAction="bookmark-only"
              />
            </swiper-slide>
          </template>
        </swiper-container>
      </ClientOnly>
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

const slides = ref(Array.from({ length: 10 }));

const containerRef = ref(null);
const getStory = ref("public");

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
    params.slug
      ? storyStore.getSimilarStories(params.slug)
      : storyStore.getStories("public", {
          page: params.page,
          sort: params.sort,
          category: params.category,
          keyword: params.keyword,
          paginate: params.paginate,
        })
);

console.log(data);
</script>

<style scoped></style>
