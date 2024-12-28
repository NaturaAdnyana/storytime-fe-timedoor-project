<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium">
      {{ label }}
    </label>
    <label
      :for="id"
      class="flex flex-col gap-5 cursor-pointer w-full max-w-96 h-72 justify-center items-center rounded-md overflow-hidden bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-asparagus-tr"
    >
      <input type="file" :id="id" class="sr-only" @change="handleFileChange" />
      <NuxtImg
        :src="imageUrl || '/icons/blank-img.svg'"
        :class="imageUrl ? '' : 'w-20 h-w-20'"
      />
      <span class="text-xs hover:text-gray-asparagus-tr">Choose Image</span>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  id: String,
  imageUrl: String,
});

const emit = defineEmits(["update:file"]);

function handleFileChange(event) {
  const file = event.target.files[0];
  emit("update:file", file);
}
</script>
