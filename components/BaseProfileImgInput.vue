<template>
  <div class="flex items-center gap-5">
    <input
      :id="id"
      :name="name"
      type="file"
      class="sr-only"
      @change="handleFileChange"
    />
    <NuxtImg
      :src="imageUrl ? imageUrl : 'https://avatar.iran.liara.run/public/35'"
      class="w-32 h-w-32 aspect-square rounded-full object-cover"
    />
    <label :for="id" class="inline btn btn-outline">Change Picture</label>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  name: String,
  imageUrl: String,
});

const emit = defineEmits(["update:file"]);

function handleFileChange(event) {
  const file = event.target.files[0];
  emit("update:file", file);
}
</script>
