<template>
  <section>
    <div class="py-10 mx-10 lg:mx-[110px] flex gap-5">
      <button
        @click="$router.back()"
        class="p-2 rounded-full active:outline active:outline-gray-asparagus-tr hover:bg-isabelline-sc"
      >
        <ArrowLeftIcon class="w-6 h-6" />
      </button>
      <h1 class="text-3xl font-semibold">Edit Story</h1>
    </div>
  </section>
  <SectionStoryForm :data="data?.data" :isEdit="true" />
</template>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/20/solid";

const storyStore = useStoryStore();

const route = useRoute();
const router = useRouter();
const { user } = useAuthStore();
const { data } = await useAsyncData("edit-story", () =>
  storyStore.getStoryBySlug(route.params.slug)
);

onMounted(() => {
  if (data?.value?.data?.user_id !== user.id) {
    router.push("/");
  }
});

definePageMeta({
  middleware: ["auth"],
});
</script>
