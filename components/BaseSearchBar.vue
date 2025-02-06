<template>
  <div
    class="flex items-center rounded-md bg-white pl-4 pr-2 py-2 h-12 w-full mx-auto outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-asparagus-tr"
  >
    <input
      type="text"
      name="searchQuery"
      id="search"
      class="block min-w-0 grow h-full pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
      placeholder="Search story"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button
      type="submit"
      class="h-full aspect-square text-base text-gray-500 sm:text-sm/6 rounded-full outline-gray-asparagus-tr focus:outline-2 active:outline-2 hover:bg-isabelline-sc active:scale-95"
    >
      <MagnifyingGlassIcon class="size-4 mx-auto" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const { modelValue } = defineProps({
  modelValue: String,
});
</script>
