<template>
  <section
    class="text-center min-h-screen flex flex-col justify-center gap-7 mx-6 lg:mx-[110px]"
  >
    <div class="flex flex-col gap-7">
      <div class="space-y-2 heading-shadow">
        <span v-show="user" class="text-5xl text-black font-playfair-display">
          Hi, {{ user?.name }}
        </span>
        <h1 class="">Welcome to Storytime</h1>
      </div>
      <p class="text-quartz mx-5">
        The world's most-loved social storytelling platform. Story time connects
        a global community of 90 million readers and writers through the power
        of story.
      </p>
    </div>
    <form @submit.prevent="handleSearch">
      <BaseSearchBar v-model="searchQuery" class="lg:w-2/3" />
    </form>
    <NuxtImg
      src="/images/hero.png"
      class="mx-auto w-full lg:w-1/2"
      format="webp"
    />
  </section>
  <SectionStoryRecomendation
    title="Latest Story"
    to="/stories?sort=newest"
    :params="{ sort: 'newest', paginate: 6 }"
  />
  <SectionSpecialRecomendation
    title="Comedy"
    to="/stories?category=comedy"
    :params="{ sort: 'newest', paginate: 3, category: 'comedy' }"
  />
  <SectionStoryRecomendation
    title="Romance"
    to="/stories?category=romance"
    :params="{ sort: 'newest', paginate: 3, category: 'romance' }"
  />
  <SectionSpecialRecomendation
    title="Horror"
    to="/stories?category=horror"
    :params="{ sort: 'newest', paginate: 6, category: 'horror' }"
  />
  <SectionMoreCategories
    title="More Categories"
    :exclude="['all', 'comedy', 'romance', 'horror']"
  />
</template>

<script setup>
const router = useRouter();
const searchQuery = ref("");
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const handleSearch = () => {
  router.push({
    path: "/stories",
    query: {
      keyword: searchQuery.value,
    },
  });
};
</script>
