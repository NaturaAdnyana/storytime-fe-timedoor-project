<script setup>
const props = defineProps({
  error: Object,
  required: true,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout>
    <div class="flex h-[80vh] px-10 md:px-[110px] flex-wrap">
      <div
        class="flex-1 basis-full md:basis-1/2 flex items-center justify-center"
      >
        <img src="/images/404.svg" alt="404 image" class="w-full" />
      </div>
      <div
        class="flex-1 basis-full md:basis-1/2 flex flex-col items-center justify-center gap-8 text-center px-0 md:px-10"
      >
        <h1 class="text-9xl font-bold">{{ error.statusCode }}</h1>
        <h2 class="text-3xl font-bold">{{ error.message }}</h2>
        <p>
          Oops! It looks like this page doesn't exist. Please check the URL or
          return to the homepage.
        </p>
        <div>
          <button class="btn btn-solid" @click="handleError">Go to Home</button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
