<template>
  <section>
    <div class="py-10 mx-10 lg:mx-[110px] flex gap-5">
      <button
        @click="$router.back()"
        class="p-2 rounded-full active:outline active:outline-gray-asparagus-tr"
      >
        <ArrowLeftIcon class="w-6 h-6" />
      </button>
      <h1 class="text-3xl font-semibold">Write Story</h1>
    </div>
  </section>
  <section>
    <form
      @submit.prevent="handleSubmitStory"
      class="py-10 space-y-4 basis-full md:basis-1/2 md:px-5 mx-10 lg:mx-[110px]"
    >
      <BaseInput
        label="Title"
        type="text"
        id="title"
        placeholder="Enter your story title"
        v-model="storyData.title"
      />
      <BaseSelectInput
        v-model="storyData.category"
        :items="categories"
        label="Category"
      />
      <BaseCoverImgInput
        label="Cover Image"
        id="cover-image"
        :imageUrl="storyData.coverImage"
        @update:file="handleFileUpdate"
      />
      <div class="pt-5 space-x-5">
        <button @click="$router.back()" class="btn btn-outline">Cancel</button>
        <button type="submit" class="btn btn-solid">Post Story</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ArrowLeftIcon } from "@heroicons/vue/20/solid";

const handleSubmitStory = () => {
  console.log("Story submitted", storyData);
};

const categories = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Sci-Fi" },
  { id: 5, name: "Thriller" },
];

function handleFileUpdate(file) {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      storyData.coverImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

const storyData = reactive({
  title: "",
  category: categories[0],
  content: "",
  coverImage: null,
});
</script>
