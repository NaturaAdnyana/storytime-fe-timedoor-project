<template>
  <section>
    <div class="py-5 px-10 lg:px-[110px] bg-isabelline-sc">
      <ul class="flex gap-x-2 text-gray-asparagus-tr">
        <li v-for="(pre, id) in preffix" :key="id" class="space-x-2">
          <NuxtLink :to="pre.url"
            ><span class="hover:underline">{{ pre.name }}</span>
          </NuxtLink>
        </li>
        <li class="space-x-2" v-show="route.name">
          <span>/</span>
          <NuxtLink
            :to="route.name === 'stories-slug' ? '/stories' : route.name"
            ><span class="hover:underline capitalize">{{
              route.name === "stories-slug" ? "Stories" : route.name
            }}</span>
          </NuxtLink>
        </li>
        <li class="space-x-2" v-show="route.query.category">
          <span>/</span>
          <NuxtLink :to="route.path + '?category=' + route.query.category"
            ><span class="hover:underline capitalize">{{
              route.query.category
            }}</span>
          </NuxtLink>
        </li>
        <li class="space-x-2" v-show="route.query.sort">
          <span>/</span>
          <NuxtLink :to="route.path + '?sort=' + route.query.sort"
            ><span class="hover:underline capitalize">{{
              route.query.sort
            }}</span>
          </NuxtLink>
        </li>
        <li class="space-x-2" v-show="route.query.keyword">
          <span>/</span>
          <NuxtLink :to="route.path + '?keyword=' + route.query.keyword"
            ><span class="hover:underline">
              Search: {{ route.query.keyword }}</span
            >
          </NuxtLink>
        </li>
        <li class="space-x-2" v-show="route.query.page">
          <span>/</span>
          <span
            ><span class="capitalize opacity-80"
              >Page: {{ route.query.page }}</span
            >
          </span>
        </li>
        <li class="space-x-2" v-show="route.params.slug">
          <span>/</span>
          <NuxtLink :to="route.href"
            ><span class="hover:underline capitalize">{{ cleanedSlug }}</span>
          </NuxtLink>
        </li>
        <li v-for="(su, id) in suffix" :key="id" class="space-x-2">
          <span>/</span>
          <NuxtLink :to="su.url"
            ><span class="hover:underline">{{ su.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const { preffix, suffix } = defineProps({
  preffix: Object,
  suffix: Object,
});

const route = useRoute();

const cleanedSlug = computed(() =>
  route.params.slug ? route.params.slug.replace(/-/g, " ") : ""
);
</script>
