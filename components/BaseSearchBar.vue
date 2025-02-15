<template>
  <div
    class="relative flex items-center rounded-md bg-white pl-4 pr-2 py-2 h-12 w-full mx-auto outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-asparagus-tr"
  >
    <input
      type="text"
      name="searchQuery"
      id="search"
      class="block min-w-0 grow h-full pr-3 z-10 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
      placeholder="Search story"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button
      :disabled="isLoading"
      type="submit"
      :class="[
        'h-full aspect-square text-base disabled:cursor-not-allowed text-gray-500 sm:text-sm/6 rounded-full outline-gray-asparagus-tr focus:outline-2 active:outline-2 hover:bg-isabelline-sc active:scale-95',
        isLoading && 'bg-isabelline-sc',
      ]"
    >
      <div
        v-if="isLoading"
        class="loader animate-spin mx-auto opacity-50"
      ></div>
      <MagnifyingGlassIcon v-else class="size-4 mx-auto" aria-hidden="true" />
    </button>
    <div
      class="absolute right-16 flex items-center gap-2 text-xs text-quartz/50"
    >
      <div class="border p-1 rounded-lg">
        <ArrowTurnDownLeftIcon class="size-3" />
      </div>
      to Search
    </div>
  </div>
</template>

<script setup>
import {
  ArrowTurnDownLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";

const { isLoading, modelValue } = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  modelValue: String,
});
</script>
