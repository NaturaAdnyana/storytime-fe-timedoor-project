<template>
  <SectionBreadCrumbs
    :preffix="[
      {
        name: 'Home',
        url: '/',
      },
    ]"
  />
  <section class="mx-20 lg:mx-[110px] py-20">
    <div class="text-center space-y-5 mb-8">
      <p>{{ dateFormatter(data?.created_at) }}</p>
      <h1>{{ data?.title }}</h1>
      <div class="flex items-center gap-3 justify-center">
        <NuxtImg
          :src="data?.user?.avatar || '/images/avatar.png'"
          class="w-8 h-8 rounded-full aspect-square"
        />
        {{ data?.user?.name }}
      </div>
    </div>
    <div class="flex flex-wrap">
      <aside class="w-[30%] mb-10">
        <div class="sticky top-28">
          <ClientOnly>
            <swiper-container
              :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }"
              :spaceBetween="10"
              :navigation="true"
              :draggable="true"
              thumbs-swiper=".my-thumbs"
            >
              <swiper-slide v-for="(image, id) in data?.images" :key="id">
                <NuxtImg
                  :src="image?.path"
                  class="w-full aspect-square object-cover rounded border"
                />
              </swiper-slide>
            </swiper-container>

            <swiper-container
              :spaceBetween="10"
              :slidesPerView="2.5"
              class="my-thumbs mt-[10px]"
              v-show="data?.images?.length > 1"
            >
              <swiper-slide
                v-for="(image, id) in data?.images"
                :key="id"
                class="thumb transition-opacity"
              >
                <NuxtImg
                  :src="image?.path"
                  class="w-full aspect-square object-cover rounded border"
                />
              </swiper-slide>
            </swiper-container>
          </ClientOnly>
        </div>
      </aside>
      <main class="basis-full md:basis-8/12">
        <div class="pl-10" v-dompurify-html="data?.content"></div>
      </main>
    </div>
  </section>
  <SectionStoryRecomendation
    title="Similar Stories"
    :params="{ slug: route.params.slug }"
  />
</template>

<script setup>
const authStore = useAuthStore();
const storyStore = useStoryStore();
const route = useRoute();

const { user } = storeToRefs(authStore);

const { data } = await useLazyAsyncData("story-" + route.params.slug, () =>
  storyStore.getStoryBySlug(route.params.slug)
);

const dateFormatter = (rawDate) => {
  const date = new Date(rawDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

onBeforeUnmount(() => {
  storyStore.clearStories("similarStories");
});
</script>

<style scoped>
.my-thumbs .thumb {
  width: 25%;
  height: 100%;
  opacity: 0.5;
  cursor: pointer;
}

.my-thumbs .swiper-slide-thumb-active {
  opacity: 1;
}
</style>
