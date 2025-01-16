<template>
  <section class="mb-24">
    <div
      class="flex justify-between items-center mx-6 lg:mx-[110px] border-b py-8"
    >
      <h2 class="heading-shadow">Latest Story</h2>
      <NuxtLink :to="to"
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
          <swiper-slide
            v-for="(story, idx) in stories?.all[1]?.data"
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
        </swiper-container>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon } from "@heroicons/vue/24/outline";

const { to } = defineProps({
  to: String,
});

const containerRef = ref(null);
const getStory = ref("all");

const authStore = useAuthStore();
const storyStore = useStoryStore();

const route = useRoute();
const router = useRouter();

const { user } = storeToRefs(authStore);

const { stories, currentPage } = storeToRefs(storyStore);

const { status } = await useLazyAsyncData("stories", () =>
  storyStore.fetchStories(getStory.value)
);

onBeforeUnmount(() => {
  storyStore.clearStories();
});
</script>

<style scoped></style>
