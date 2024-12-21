<template>
  <div class="space-y-2">
    <label :for="name" class="block text-sm font-medium">
      {{ label }}
    </label>
    <div
      class="flex items-center rounded-md overflow-hidden bg-white w-full mx-auto outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
    >
      <textarea
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="block min-w-0 min-h-20 grow py-3 px-4 text-base placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
        v-if="type === 'textarea'"
      />
      <input
        :id="name"
        :type="computedType"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="block min-w-0 grow py-3 px-4 text-base placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
        v-else
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        @click="togglePasswordVisibility"
      >
        <EyeIcon class="w-5 h-5" v-if="isPasswordVisible" />
        <EyeSlashIcon class="w-5 h-5" v-else />
      </button>
    </div>
  </div>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

const { label, name, placeholder, modelValue, type } = defineProps({
  label: String,
  name: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: String,
});

const isPasswordVisible = ref(false);

const computedType = computed(() => {
  return type === "password" && isPasswordVisible.value ? "text" : type;
});

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
