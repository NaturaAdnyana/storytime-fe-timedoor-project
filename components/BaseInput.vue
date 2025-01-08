<template>
  <div class="space-y-1">
    <label :for="id" class="block text-sm font-medium">
      {{ label }}
    </label>
    <div
      class="flex items-center rounded-md overflow-hidden bg-white w-full mx-auto outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-asparagus-tr"
    >
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        :required="required"
        @input="$emit('update:modelValue', $event.target.value)"
        class="block min-w-0 min-h-20 grow py-3 px-4 text-base placeholder:text-gray-400 sm:text-sm"
      />
      <input
        v-else
        :id="id"
        :type="computedType"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="block min-w-0 grow py-3 px-4 text-base placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="px-3 py-2 mr-1 rounded text-gray-500 hover:text-gray-700 focus:outline-gray-asparagus-tr"
        @click="togglePasswordVisibility"
      >
        <EyeIcon class="w-5 h-5" v-if="isPasswordVisible" />
        <EyeSlashIcon class="w-5 h-5" v-else />
        <span class="sr-only">Toggle Password Visibility</span>
      </button>
    </div>
    <div class="text-red-500 text-xs">
      <p class="mb-1" v-show="messages" v-for="message in messages">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

const {
  label,
  id,
  type,
  placeholder,
  disabled,
  modelValue,
  messages,
  required,
} = defineProps({
  label: String,
  id: String,
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
  messages: Array,
  required: false,
});

const isPasswordVisible = ref(false);

const computedType = computed(() => {
  return type === "password" && isPasswordVisible.value ? "text" : type;
});

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
