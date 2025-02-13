<template>
  <section>
    <div class="py-10 mx-10 lg:mx-[110px] flex gap-5">
      <button
        @click="$router.back()"
        class="p-2 rounded-full active:outline active:outline-gray-asparagus-tr hover:bg-isabelline-sc"
      >
        <ArrowLeftIcon class="w-6 h-6" />
      </button>
      <h1 class="text-3xl font-semibold">Write Story</h1>
    </div>
  </section>
  <SectionStoryForm />
</template>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/20/solid";

definePageMeta({
  middleware: ["auth"],
});
</script>
