<template>
  <section class="mb-24">
    <div
      class="flex justify-between items-center mx-6 lg:mx-[110px] border-b py-8"
    >
      <h2 class="heading-shadow">{{ title || "Story" }}</h2>
      <NuxtLink
        :to="to"
        class="hover:underline hover:text-gray-asparagus-tr underline-offset-8"
        >Explore More <ArrowRightIcon class="size-3 inline" />
      </NuxtLink>
    </div>
    <div class="mt-6 mx-0">
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          :slides-per-view="3.5"
          :spaceBetween="24"
          :slidesOffsetBefore="110"
          :slidesOffsetAfter="110"
          :breakpoints="{
            0: {
              slidesPerView: 1.15,
              slidesOffsetBefore: 24,
              slidesOffsetAfter: 24,
            },
            640: { slidesPerView: 2 },
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

const { data, status } = await useLazyAsyncData(`story-${params}`, () =>
  storyStore.getStories(getStory.value, 1, params)
);

// onBeforeUnmount(() => {
//   storyStore.clearStories();
// });
</script>

<style scoped></style>
