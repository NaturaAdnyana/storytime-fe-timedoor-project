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
    <div class="mt-6 mx-6 lg:mx-0">
      <ClientOnly>
        <swiper-container
          ref="containerRef"
          :slides-per-view="3.5"
          :spaceBetween="20"
          :slidesOffsetBefore="110"
          :slidesOffsetAfter="110"
          :breakpoints="{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
            },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3.5, spaceBetween: 20 },
          }"
        >
          <swiper-slide
            v-for="(slide, idx) in slides"
            :key="idx"
            class="flex flex-col"
          >
            <StoryCard />
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
const slides = ref(Array.from({ length: 10 }));
</script>

<style scoped></style>
