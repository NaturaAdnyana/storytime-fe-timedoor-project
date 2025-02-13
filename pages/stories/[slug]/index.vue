<template>
  <SectionBreadCrumbs
    :preffix="[
      {
        name: 'Home',
        url: '/',
      },
    ]"
  />
  <section class="mx-6 lg:mx-[110px] py-20 relative">
    <button
      :disabled="isBookmarkLoading"
      @click.prevent="handleBookmark"
      class="rounded-full w-12 h-12 p-2 flex justify-center items-center transition fixed bottom-5 right-5 md:absolute md:top-20 md:right-0 z-10"
      :class="[
        isBookmarked
          ? 'bg-white hover:bg-isabelline-sc bookmarked border shadow'
          : 'bg-gray-asparagus-tr hover:bg-kombu-green',
      ]"
    >
      <div v-if="isBookmarkLoading" class="loader animate-spin"></div>
      <div v-else>
        <BookmarkIcon
          v-if="isBookmarked"
          class="size-6 fill-gray-asparagus-tr"
          aria-hidden="true"
        />
        <img v-else src="/icons/bookmark.svg" alt="bookmark" />
      </div>
    </button>
    <div class="text-center space-y-10 mb-8">
      <p>{{ dateFormatter(data?.data.created_at) }}</p>
      <h1>{{ data?.data.title }}</h1>
      <div class="flex items-center gap-3 justify-center">
        <NuxtImg
          :src="data?.data.user?.avatar || '/images/avatar.png'"
          class="w-8 h-8 rounded-full aspect-square border"
        />
        {{ data?.data.user?.name }}
      </div>
    </div>
    <div class="flex flex-wrap">
      <aside class="w-full md:w-[30%] basis-4/12 mb-10">
        <div class="sticky top-28">
          <ClientOnly>
            <div class="relative">
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
                <swiper-slide
                  v-for="(image, id) in data?.data.images"
                  :key="id"
                >
                  <NuxtImg
                    :src="image?.path"
                    class="w-full aspect-square object-cover rounded border"
                  />
                </swiper-slide>
              </swiper-container>
              <button
                @click="toggleModal"
                class="absolute z-10 bottom-2 right-2 transition rounded-full hover:bg-quartz/50 hover:scale-105 active:bg-kombu-green p-2"
              >
                <MagnifyingGlassPlusIcon class="size-6 stroke-white" />
              </button>
            </div>

            <swiper-container
              :spaceBetween="10"
              :slidesPerView="2.5"
              class="my-thumbs mt-[10px]"
              v-show="data?.data.images?.length > 1"
            >
              <swiper-slide
                v-for="(image, id) in data?.data.images"
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
        <div class="pl-0 md:pl-10" v-dompurify-html="data?.data.content"></div>
      </main>
    </div>
  </section>
  <SectionStoryRecomendation
    title="Similar Stories"
    :params="{ slug: route.params.slug }"
  />
  <HeadlessTransitionRoot appear :show="isPicsOpen" as="template">
    <HeadlessDialog as="div" @close="toggleModal" class="relative z-10">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-5 md:p-[110px] text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full h-[80vh] md:h-[85vh] transform overflow-hidden mt-20 md:mt-0 rounded-2xl bg-white py-14 px-5 md:p-10 text-left align-middle shadow-xl transition-all"
            >
              <div class="relative">
                <button
                  @click="toggleModal"
                  class="absolute z-10 -top-11 md:-top-7 -right-2 md:-right-7 transition rounded-full hover:bg-quartz/50 hover:scale-105 active:bg-kombu-green p-2 group"
                >
                  <XMarkIcon class="size-5 group-active:stroke-white" />
                </button>
                <ClientOnly>
                  <div>
                    <swiper-container
                      :style="{
                        '--swiper-navigation-color': 'rgba(90,90,90,.8)',
                        '--swiper-pagination-color': 'rgba(90,90,90,.8)',
                      }"
                      :spaceBetween="10"
                      :navigation="true"
                      :draggable="true"
                      thumbs-swiper=".my-bigger-thumbs"
                      :class="[
                        data?.data.images?.length > 1
                          ? 'h-[60vh] md:h-[48vh]'
                          : 'h-[70vh]',
                      ]"
                    >
                      <swiper-slide
                        v-for="(image, id) in data?.data.images"
                        :key="id"
                      >
                        <NuxtImg
                          :src="image?.path"
                          class="h-full rounded object-contain mx-auto"
                        />
                      </swiper-slide>
                    </swiper-container>
                  </div>

                  <swiper-container
                    :spaceBetween="10"
                    :slidesPerView="5"
                    class="my-bigger-thumbs mt-[10px]"
                    v-show="data?.data.images?.length > 1"
                  >
                    <swiper-slide
                      v-for="(image, id) in data?.data.images"
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
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup>
import { MagnifyingGlassPlusIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { BookmarkIcon } from "@heroicons/vue/24/solid";

const authStore = useAuthStore();
const storyStore = useStoryStore();
const { addToast } = useAppStore();
const route = useRoute();
const { user } = storeToRefs(authStore);

const isPicsOpen = ref(false);
const isBookmarkLoading = ref(false);

const { data } = await useAsyncData("story-" + route.params.slug, () =>
  storyStore.getStoryBySlug(route.params.slug)
);

const isBookmarked = ref(
  data?.value?.data?.bookmarks[0]?.user_id === user?.id || false
);

const handleBookmark = async () => {
  isBookmarkLoading.value = true;
  const storyStore = useStoryStore();
  try {
    await storyStore.toggleBookmark(data?.value?.data?.id);
    isBookmarked.value = !isBookmarked.value;
    if (isBookmarked.value) {
      addToast("Successfully added story to bookmarks", "success");
    } else {
      addToast("Successfully remove story to bookmarks", "success");
    }
  } catch (error) {
    console.log(error);
  } finally {
    isBookmarkLoading.value = false;
  }
};

const toggleModal = () => {
  isPicsOpen.value = !isPicsOpen.value;
};

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
.my-thumbs .thumb,
.my-bigger-thumbs .thumb {
  width: 25%;
  height: 100%;
  opacity: 0.5;
  cursor: pointer;
}

.my-thumbs .swiper-slide-thumb-active,
.my-bigger-thumbs .swiper-slide-thumb-active {
  opacity: 1;
}
</style>
