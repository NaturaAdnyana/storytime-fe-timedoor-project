<template>
  <section class="mb-24">
    <div
      class="flex justify-between items-center border-b py-8 mx-6 lg:mx-[110px]"
    >
      <h2 class="heading-shadow">{{ title }}</h2>
    </div>
    <div class="mt-6">
      <div
        v-if="status == 'idle' || status == 'pending'"
        class="grid grid-cols-7 mx-6 lg:mx-[110px] gap-[10px]"
      >
        <div
          v-for="id in slides"
          :key="id"
          class="rounded text-center py-10 bg-isabelline-sc text-gray-asparagus-tr block animate-pulse"
        >
          <span class="opacity-50"> Please wait... </span>
        </div>
      </div>
      <ClientOnly v-else-if="status == 'success'">
        <swiper-container
          ref="containerRef"
          :slides-per-view="8.5"
          :spaceBetween="10"
          :slidesOffsetBefore="105"
          :slidesOffsetAfter="105"
          :breakpoints="{
            0: {
              slidesPerView: 2.5,
              spaceBetween: 10,
              slidesOffsetBefore: 24,
              slidesOffsetAfter: 24,
            },
            640: {
              slidesPerView: 5.5,
              slidesOffsetBefore: 24,
              slidesOffsetAfter: 24,
            },
            1024: {
              slidesPerView: 8.5,
              slidesOffsetBefore: 105,
              slidesOffsetAfter: 20,
            },
          }"
        >
          <swiper-slide v-for="(category, idx) in categories" :key="idx">
            <NuxtLink
              :to="'/stories?category=' + category.slug"
              class="rounded text-center py-10 transition-colors bg-isabelline-sc hover:bg-gainsboro text-gray-asparagus-tr block"
            >
              {{ category.name }}
            </NuxtLink>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
const { title, exclude } = defineProps({
  title: String,
  exclude: Array,
});

const containerRef = ref(null);

const slides = ref(Array.from({ length: 7 }));

const storyStore = useStoryStore();

const { categories } = storeToRefs(storyStore);

const { status } = await useAsyncData(
  "categories",
  () => storyStore.getCategories(exclude),
  { server: false }
);
</script>
