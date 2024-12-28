<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium">
      {{ label }}
    </label>
    <HeadlessCombobox
      :modelValue="modelValue"
      @update:modelValue="(value) => emit('update:modelValue', value)"
    >
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden bg-white rounded-md mx-auto outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-asparagus-tr"
        >
          <HeadlessComboboxInput
            class="w-full border-none py-3 pl-3 pr-10 text-sm leading-5 text-quartz focus:ring-0"
            :displayValue="(item) => item.name"
            @change="query = $event.target.value"
          />
          <HeadlessComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </HeadlessComboboxButton>
        </div>
        <HeadlessTransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <HeadlessComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredData.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-quartz"
            >
              Nothing found.
            </div>

            <HeadlessComboboxOption
              v-for="item in filteredData"
              as="template"
              :key="item.id"
              :value="item"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-pointer select-none py-2 pl-10 pr-4 transition-colors"
                :class="{
                  'bg-gray-asparagus-tr text-white': active,
                  'text-quartz': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{
                    'font-medium': selected,
                    'font-normal': !selected,
                  }"
                >
                  {{ item.name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{
                    'text-white': active,
                    'text-gray-asparagus-tr': !active,
                  }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </HeadlessComboboxOption>
          </HeadlessComboboxOptions>
        </HeadlessTransitionRoot>
      </div>
    </HeadlessCombobox>
  </div>
</template>

<script setup>
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  modelValue: Object,
  label: String,
  items: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const query = ref("");

const filteredData = computed(() =>
  query.value === ""
    ? props.items
    : props.items.filter((item) => {
        return item.name.toLowerCase().includes(query.value.toLowerCase());
      })
);
</script>
