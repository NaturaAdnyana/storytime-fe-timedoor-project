<template>
  <div class="space-y-2 relative">
    <button
      v-show="imageUrl"
      @click="handleRemoveImage"
      class="absolute right-3 top-5 p-2 rounded-full transition-colors shadow bg-gray-asparagus-tr/70 hover:bg-gray-asparagus-tr focus:outline-gray-asparagus-tr backdrop-blur"
    >
      <span class="sr-only">Remove image</span>
      <XMarkIcon class="w-5 h-5 stroke-white" />
    </button>
    <label :for="id" class="block text-sm font-medium">
      {{ label }}
    </label>
    <label
      :for="id"
      class="flex flex-col gap-5 cursor-pointer w-full max-w-96 h-72 justify-center items-center rounded-md overflow-hidden bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-asparagus-tr text-xs hover:text-gray-asparagus-tr"
      :class="isLoading && 'image-loader'"
    >
      <input
        type="file"
        :id="id"
        class="sr-only"
        @change="handleFileChange"
        :disabled="isLoading"
      />
      <NuxtImg
        :src="
          imageUrl ? config.public.apiBase + imageUrl : '/icons/blank-img.svg'
        "
        :class="imageUrl ? 'w-full h-full object-cover' : 'w-20 h-w-20'"
      />
      <div v-show="!imageUrl">
        <span v-if="isLoading">
          <div class="loader animate-spin"></div>
          Uploading...
        </span>
        <span v-else>Choose Image</span>
      </div>
    </label>
  </div>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

const config = useRuntimeConfig();

const props = defineProps({
  label: String,
  id: String,
  imageUrl: String,
  isLoading: Boolean,
});

const emit = defineEmits(["update:file", "remove:file"]);

function handleFileChange(event) {
  const file = event.target.files[0];
  emit("update:file", file);
}

function handleRemoveImage() {
  emit("remove:file", props.imageUrl);
}
</script>
