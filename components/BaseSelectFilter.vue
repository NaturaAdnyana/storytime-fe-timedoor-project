<template>
  <HeadlessListbox
    :modelValue="modelValue"
    @update:modelValue="(value) => emit('update:modelValue', value)"
  >
    <div class="relative">
      <HeadlessListboxButton
        class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left font-medium focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-asparagus-tr"
      >
        <span class="block truncate min-w-14 md:min-w-20">{{
          modelValue.name
        }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
        </span>
      </HeadlessListboxButton>

      <Headlesstransition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <HeadlessListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white text-xs md:text-base shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <HeadlessListboxOption
            v-slot="{ active, selected }"
            v-for="item in items"
            :key="item.name"
            :value="item"
            as="template"
          >
            <li
              :class="[
                active && 'text-gray-asparagus-tr',
                selected && 'border-l-4 border-gray-asparagus-tr',
                'relative select-none py-3 px-4 cursor-pointer group',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate transition group-hover:translate-x-1',
                ]"
                >{{ item.name }}</span
              >
            </li>
          </HeadlessListboxOption>
        </HeadlessListboxOptions>
      </Headlesstransition>
    </div>
  </HeadlessListbox>
</template>

<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
