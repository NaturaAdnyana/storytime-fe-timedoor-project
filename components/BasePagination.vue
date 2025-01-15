<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white py-5"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPage"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ from }}</span>
          to
          <span class="font-medium">{{ to }}</span>
          of
          <span class="font-medium">{{ totalResult }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <ChevronLeftIcon class="size-5" aria-hidden="true" />
            <span class="sr-only">Previous</span>
          </button>
          <template v-for="page in pagesToShow" :key="page">
            <button
              @click="goToPage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20',
                page === currentPage
                  ? 'z-10 bg-gray-asparagus-tr text-white'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
              ]"
            >
              <div
                v-if="isLoading === 'pending' || isLoading === false"
                class="loader animate-spin"
              ></div>
              <span v-else>{{ page }}</span>
            </button>
          </template>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPage"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <ChevronRightIcon class="size-5" aria-hidden="true" />
            <span class="sr-only">Next</span>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  from: Number,
  to: Number,
  totalResult: Number,
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPage: Number,
  isLoading: String,
});

const emit = defineEmits(["update:modelValue"]);

const pagesToShow = computed(() => {
  const pages = [];
  const delta = 2;
  const start = Math.max(2, props.currentPage - delta);
  const end = Math.min(props.totalPage - 1, props.currentPage + delta);

  pages.push(1);
  if (start > 2) pages.push("...");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < props.totalPage - 1) pages.push("...");
  if (props.totalPage > 1) pages.push(props.totalPage);
  return pages;
});

const goToPage = (page) => {
  if (page < 1 || page > props.totalPage || page === props.currentPage) return;
  emit("update:modelValue", page);
};
</script>
