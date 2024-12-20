<template>
  <section
    class="text-center min-h-screen flex flex-col justify-center gap-7 mx-20 lg:mx-[110px]"
  >
    <div class="flex flex-col gap-7">
      <h1 class="heading-shadow">Welcome to Storytime</h1>
      <p class="text-quartz">
        The world's most-loved social storytelling platform. Story time connects
        a global community of 90 million readers and writers through the power
        of story.
      </p>
    </div>
    <div
      class="flex items-center rounded-md bg-white px-4 w-full lg:w-2/3 mx-auto outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-asparagus-tr"
    >
      <input
        type="text"
        name="price"
        id="price"
        class="block min-w-0 grow py-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
        placeholder="Search story"
      />
      <div class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
        <MagnifyingGlassIcon class="size-4" aria-hidden="true" />
      </div>
    </div>
    <NuxtImg src="/images/hero.png" class="mx-auto w-full lg:w-1/2" />
  </section>
  <SectionStoryRecomendation to="/stories" />
  <SectionSpecialRecomendation to="/stories" />
  <SectionStoryRecomendation to="/stories" />
  <SectionSpecialRecomendation to="/stories" />
  <SectionMoreCategories />
</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
</script>
