<template>
  <div class="h-full flex flex-col">
    <div class="relative w-full h-full flex-1 overflow-hidden">
      <img
        src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
        class="w-full h-full rounded-lg border object-cover"
      />
      <button
        class="absolute bottom-4 right-4 rounded-full w-14 h-14 p-2 bg-gray-asparagus-tr"
      >
        <img src="/icons/bookmark.svg" alt="bookmark" />
      </button>
    </div>
    <div class="flex flex-col gap-3 mt-3">
      <h3>Gemma</h3>
      <p class="text-justify custom-truncate">
        1. GOLDEN Gemma was only five minutes away from her parents' hut, but
        the jungle had already taken on a different personality. It was thicker.
        The trees had grown taller. The ti plants shaded the green forest a
        sinister red.
      </p>
      <div class="flex justify-between text-sm">
        <div class="basis-1/2 flex items-center gap-2 overflow-hidden">
          <NuxtImg
            src="https://avatar.iran.liara.run/public/35"
            class="w-8 h-8 rounded-full"
          />
          <h4 class="text-nowrap">Khrisvana (updated) 1</h4>
        </div>
        <div class="basis-1/2 flex justify-end items-center gap-3">
          12 March 2024
          <span
            class="px-2 py-1 bg-isabelline-sc rounded text-gray-asparagus-tr"
            >Comedy</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
