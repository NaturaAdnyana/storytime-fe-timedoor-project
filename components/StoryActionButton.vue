<template>
  <div>
    <button
      :disabled="isLoading"
      @click.prevent="emit('action')"
      class="rounded-full w-12 h-12 p-2 flex justify-center items-center transition relative group active:scale-90"
      :class="[
        isBookmarked
          ? 'bg-white hover:bg-isabelline-sc bookmarked border shadow'
          : 'bg-gray-asparagus-tr hover:bg-kombu-green',
      ]"
    >
      <div v-if="isLoading" class="loader animate-spin"></div>
      <div v-else>
        <template v-if="type == 'bookmark'">
          <BookmarkIcon
            v-if="isBookmarked"
            class="size-6 fill-gray-asparagus-tr popup"
            aria-hidden="true"
          />
          <img v-else class="popup" src="/icons/bookmark.svg" alt="bookmark" />
        </template>
        <template v-else-if="type == 'edit'">
          <img src="/icons/edit.svg" alt="edit" />
        </template>
        <template v-else-if="type == 'delete'">
          <img src="/icons/delete.svg" alt="delete" />
        </template>
      </div>
      <div
        v-show="title"
        :class="[
          'opacity-0 md:group-hover:opacity-100 absolute transition-all -translate-y-8 scale-0 md:group-hover:scale-100 md:group-hover:-translate-y-[60px] md:group-hover:-translate-x-6 min-w-[94px] p-1.5 bg-isabelline-sc rounded text-[10px] text-gray-asparagus-tr text-opacity-70 shadow-[0_-1px_3px_1px_rgba(0,0,0,0.13)]',
          'before:block before:absolute before:-bottom-3 before:right-[13px] before:border-l-[10px] before:border-r-[10px] before:border-t-[20px] before:border-t-isabelline-sc before:border-l-transparent before:border-r-transparent before:w-0 before:h-0',
        ]"
      >
        {{ title }}
      </div>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { BookmarkIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  type: String,
  // bookmark || edit || delete
  title: String,
  isBookmarked: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["action"]);
</script>
