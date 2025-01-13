<template>
  <section>
    <div class="py-10 mx-10 lg:mx-[110px] flex gap-5">
      <button
        @click="$router.back()"
        class="p-2 rounded-full active:outline active:outline-gray-asparagus-tr hover:bg-isabelline-sc"
      >
        <ArrowLeftIcon class="w-6 h-6" />
      </button>
      <h1 class="text-3xl font-semibold">Write Story</h1>
    </div>
  </section>
  <section>
    <form
      @submit.prevent="handleSubmitStory"
      class="py-10 space-y-5 basis-full md:basis-1/2 mx-10 lg:mx-[110px]"
    >
      <HeadlessTransitionRoot
        :show="showErrorMessage"
        enter="transition-opacity duration-75"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="bg-red-200 w-full p-3 rounded-lg text-red-700 text-sm flex justify-between items-center"
        >
          <span>
            {{ errorMessage.message }}
          </span>
          <button
            class="bg-red-100 rounded-full p-1"
            type="button"
            @click="handleClearErrorMessages"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
      </HeadlessTransitionRoot>
      <BaseInput
        label="Title"
        type="text"
        id="title"
        placeholder="Enter your story title"
        v-model="storyData.title"
        :messages="errorMessage.title"
      />
      <BaseSelectInput
        v-model="storyData.category"
        :items="categories"
        label="Category"
        :messages="errorMessage.category"
      />
      <BaseTextEditor
        v-model="storyData.content"
        label="Content"
        placeholder="Enter a content here"
        :messages="errorMessage.content"
      />
      <div class="space-y-2">
        <label for="" class="block text-sm font-medium">Cover Image</label>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <BaseBaseImgInput
            v-for="(image, index) in storyData.images"
            :key="index"
            :id="id"
            :imageUrl="image"
            :isLoading="isImageLoading"
            @update:file="handleFileUpdate"
            @remove:file="handleFileRemove"
          />
          <BaseBaseImgInput
            v-if="storyData.images.length < 5"
            id="add-image"
            @update:file="handleFileUpdate"
          />
        </div>
        <div class="text-red-500 text-xs">
          <p
            class="mb-1"
            v-show="errorMessage.images"
            v-for="message in errorMessage.images"
          >
            {{ message }}
          </p>
        </div>
      </div>
      <div class="pt-5 space-x-5">
        <button @click="$router.back()" class="btn btn-outline">Cancel</button>
        <button type="submit" class="btn btn-solid">
          <span v-if="isSubmitLoading" class="flex items-center gap-2">
            <div class="loader animate-spin"></div>
            Loading...
          </span>
          <span v-else>Post Story</span>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/vue/20/solid";

const router = useRouter();
const storyStore = useStoryStore();

const isSubmitLoading = ref(false);
const isImageLoading = ref(false);
const showErrorMessage = ref(false);

const storyData = reactive({
  title: "",
  category: "",
  content: "",
  images: [],
});

try {
  await storyStore.fetchCategories();
  storyData.category = storyStore.categories[0];
} catch (error) {
  console.log(error);
}

const errorMessage = reactive({
  message: "",
  title: "",
  category: "",
  content: "",
  images: "",
});

const handleClearErrorMessages = () => {
  showErrorMessage.value = false;
  errorMessage.message = "";
  errorMessage.title = "";
  errorMessage.category = "";
  errorMessage.content = "";
  errorMessage.images = "";
  clearError();
};

const { categories } = storeToRefs(storyStore);

const handleSubmitStory = async () => {
  isSubmitLoading.value = true;
  handleClearErrorMessages();
  try {
    await storyStore.create({
      title: storyData.title,
      images: storyData.images,
      categoryId: storyData.category.id,
      content: storyData.content,
    });
    router.push({ path: "/profile" });
  } catch (error) {
    console.log(error);
    showErrorMessage.value = true;
    errorMessage.message = error.data.message || "";
    errorMessage.title = error.data.errors?.title || "";
    errorMessage.category = error.data.errors?.category || "";
    errorMessage.content = error.data.errors?.content || "";
    errorMessage.images = error.data.errors?.images || "";
  } finally {
    isSubmitLoading.value = false;
  }
};

async function handleFileUpdate(file) {
  if (file) {
    isImageLoading.value = true;
    try {
      const response = await storyStore.uploadImage({ file: file });
      storyData.images.push(response.path);
    } catch (error) {
      console.error(error);
    } finally {
      isImageLoading.value = false;
    }
  }
}

const handleFileRemove = (file) => {
  if (file) {
    storyData.images = storyData.images.filter((image) => image !== file);
  }
};
</script>
