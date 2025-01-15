<template>
  <div class="h-full flex flex-col">
    <div class="relative w-full h-full flex-1 overflow-hidden">
      <div
        v-if="isLoading"
        class="w-full h-full rounded-lg border animate-pulse bg-slate-200 aspect-square"
      ></div>
      <img
        v-else
        src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
        class="w-full h-full rounded-lg border object-cover aspect-square"
      />
      <div
        class="absolute bottom-4 right-4 space-x-2"
        v-if="showAction && isUser"
      >
        <div
          v-if="isLoading"
          class="rounded-full w-12 h-12 bg-slate-300 animate-pulse"
        ></div>
        <template v-else>
          <button
            class="rounded-full w-12 h-12 p-2 bg-gray-asparagus-tr transition hover:bg-kombu-green"
          >
            <img src="/icons/edit.svg" alt="edit" />
          </button>
          <button
            class="rounded-full w-12 h-12 p-2 bg-gray-asparagus-tr transition hover:bg-kombu-green"
          >
            <img src="/icons/bookmark.svg" alt="bookmark" />
          </button>
          <button
            class="rounded-full w-12 h-12 p-2 bg-gray-asparagus-tr transition hover:bg-kombu-green"
          >
            <img src="/icons/delete.svg" alt="delete" />
          </button>
        </template>
      </div>
      <div class="absolute bottom-4 right-4" v-else-if="showAction">
        <div
          v-if="isLoading"
          class="rounded-full w-12 h-12 bg-slate-300 animate-pulse"
        ></div>
        <button
          v-else
          class="rounded-full w-12 h-12 p-2 bg-gray-asparagus-tr transition hover:bg-kombu-green"
        >
          <img src="/icons/bookmark.svg" alt="bookmark" />
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-3 mt-3">
      <div
        v-if="isLoading"
        class="w-2/3 h-8 bg-slate-200 animate-pulse rounded-lg"
      ></div>
      <h3 v-else>Gemma</h3>
      <div v-if="isLoading" class="space-y-2">
        <div class="w-full h-4 bg-slate-200 animate-pulse rounded-lg"></div>
        <div class="w-full h-4 bg-slate-200 animate-pulse rounded-lg"></div>
        <div class="w-full h-4 bg-slate-200 animate-pulse rounded-lg"></div>
      </div>
      <p v-else class="text-justify custom-truncate">
        1. GOLDEN Gemma was only five minutes away from her parents' hut, but
        the jungle had already taken on a different personality. It was thicker.
        The trees had grown taller. The ti plants shaded the green forest a
        sinister red.
      </p>
      <div class="flex justify-between text-sm">
        <div
          class="basis-3/7 flex items-center gap-2 overflow-hidden"
          v-show="!isUser"
        >
          <div
            v-if="isLoading"
            class="w-8 h-8 aspect-square rounded-full bg-slate-200 animate-pulse"
          ></div>
          <NuxtImg
            v-else
            src="https://avatar.iran.liara.run/public/35"
            class="w-8 h-8 rounded-full aspect-square"
            format="webp"
          />
          <div
            v-if="isLoading"
            class="w-36 h-4 bg-slate-200 animate-pulse rounded-lg"
          ></div>
          <h4 v-else class="text-nowrap truncate">Khrisvana (updated) 1</h4>
        </div>
        <div
          :class="[
            'basis-full flex items-center gap-3',
            isUser ? 'justify-between' : 'justify-end',
          ]"
        >
          <div
            v-if="isLoading"
            class="w-16 h-4 bg-slate-200 animate-pulse rounded-lg"
          ></div>
          <span v-else :class="isUser && 'order-last'"> 12 March 2024 </span>
          <div
            v-if="isLoading"
            class="w-20 h-8 bg-slate-200 animate-pulse rounded-lg"
          ></div>
          <span
            v-else
            class="px-2 py-1 bg-isabelline-sc rounded text-gray-asparagus-tr"
            >Comedy</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { showAction, isUser, isLoading } = defineProps({
  showAction: {
    type: Boolean,
    default: true,
  },
  isUser: {
    type: {},
  },
  isLoading: Boolean,
});
</script>

<style scoped>
.custom-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
