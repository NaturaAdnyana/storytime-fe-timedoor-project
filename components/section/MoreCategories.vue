<template>
  <section class="mb-24 mx-6 lg:mx-[110px]">
    <div class="flex justify-between items-center border-b py-8">
      <h2 class="heading-shadow">Latest Story</h2>
      <NuxtLink :to="to">
        Explore More <ArrowRightIcon class="size-3 inline" />
      </NuxtLink>
    </div>
    <div class="mt-6">
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          :slides-per-view="6"
          :spaceBetween="10"
          :breakpoints="{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
            },
            640: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 6, spaceBetween: 20 },
          }"
        >
          <template v-if="status == 'pending'">
            <swiper-slide v-for="(slide, idx) in slides" :key="idx">
              <div
                class="rounded text-center py-10 bg-isabelline-sc text-gray-asparagus-tr block animate-pulse"
              >
                <span class="opacity-50"> Please wait... </span>
              </div>
            </swiper-slide>
          </template>
          <template v-else-if="status == 'success'">
            <swiper-slide v-for="(category, idx) in categories" :key="idx">
              <NuxtLink
                :to="'/stories/category/' + category.slug"
                class="rounded text-center py-10 bg-isabelline-sc text-gray-asparagus-tr block"
              >
                {{ category.name }}
              </NuxtLink>
            </swiper-slide>
          </template>
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

const slides = ref(Array.from({ length: 10 }));

const storyStore = useStoryStore();

const { categories } = storeToRefs(storyStore);

const { status } = await useAsyncData("categories", () =>
  storyStore.fetchCategories()
);
</script>
