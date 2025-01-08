<template>
  <div class="flex items-center gap-5">
    <input
      :id="id"
      :name="name"
      type="file"
      class="sr-only"
      @change="handleFileChange"
      :disabled="isLoading"
    />
    <NuxtImg
      :src="imageUrl ? imageUrl : '/images/avatar.png'"
      class="w-32 h-w-32 aspect-square rounded-full object-cover ring-1 ring-gray-200"
      :class="isLoading && 'image-loader'"
    />
    <label
      :for="id"
      class="inline btn btn-outline"
      :class="isLoading && 'opacity-80 cursor-not-allowed'"
    >
      <span v-if="isLoading" class="flex items-center gap-2">
        <div class="loader animate-spin"></div>
        Uploading...
      </span>
      <span v-else>Change Picture</span>
    </label>
  </div>
  <div class="text-red-500 text-xs">
    <p class="mb-1" v-show="messages" v-for="message in messages">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  name: String,
  imageUrl: String,
  isLoading: Boolean,
  messages: Array,
});

const emit = defineEmits(["update:file"]);

function handleFileChange(event) {
  const file = event.target.files[0];
  emit("update:file", file);
}
</script>
