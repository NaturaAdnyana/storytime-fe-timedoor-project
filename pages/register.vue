<template>
  <section class="flex flex-wrap p-3 border min-h-screen">
    <div
      class="basis-full md:basis-1/2 pt-6 px-10 md:px-12 bg-isabelline-sc rounded-md flex flex-col justify-between gap-10 flex-1"
    >
      <div class="space-y-5">
        <NuxtImg src="/logos/logo.png" class="w-36" format="webp" />
        <h1>Join the World’s Most-Loved Social Storytelling Platform!</h1>
        <p>
          Create an account to explore interesting articles, connect with
          like-minded people, and share your own stories.
        </p>
      </div>
      <img src="/images/register.svg" alt="register" class="object-contain" />
    </div>
    <div
      class="basis-full md:basis-1/2 py-12 md:py-6 px-10 md:pl-20 md:pr-[110px] flex flex-col justify-center flex-1"
    >
      <h2 class="font-bold mb-5">Create Account</h2>
      <form @submit.prevent="handleRegister" class="space-y-6">
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
          label="Name"
          type="text"
          placeholder="Enter your name"
          v-model="registerData.name"
          :messages="errorMessage.name"
        />
        <BaseInput
          label="Username"
          type="text"
          placeholder="Enter your username"
          v-model="registerData.username"
          :messages="errorMessage.username"
        />
        <BaseInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          v-model="registerData.email"
          :messages="errorMessage.email"
        />
        <BaseInput
          label="Password"
          type="password"
          placeholder="Enter your chosen password"
          v-model="registerData.password"
          :messages="errorMessage.password"
        />
        <BaseInput
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your chosen password"
          v-model="registerData.confirmPassword"
          :messages="errorMessage.confirmPassword"
        />
        <button
          type="submit"
          class="btn btn-solid"
          :disabled="
            isLoading ||
            !registerData.name ||
            !registerData.username ||
            !registerData.email ||
            !registerData.password ||
            !registerData.confirmPassword
          "
        >
          <span v-if="isLoading" class="flex items-center gap-2">
            <div class="loader animate-spin"></div>
            Loading...
          </span>
          <span v-else>Create Account</span>
        </button>
        <p class="text-sm">
          Already have an account?
          <NuxtLink
            to="/login"
            class="text-gray-asparagus-tr font-bold hover:underline"
            >Login</NuxtLink
          >
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
h2 {
  font-family: "DM Sans", sans-serif;
}
</style>

<script setup>
definePageMeta({
  layout: "base",
  middleware: ["auth"],
});

const { addToast } = useAppStore();

import { XMarkIcon } from "@heroicons/vue/24/outline";

const registerData = reactive({
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const router = useRouter();

const isLoading = ref(false);

const showErrorMessage = ref(false);

const errorMessage = reactive({
  message: "",
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleClearErrorMessages = () => {
  showErrorMessage.value = false;
  errorMessage.message = "";
  errorMessage.name = "";
  errorMessage.username = "";
  errorMessage.email = "";
  errorMessage.password = "";
  errorMessage.confirmPassword = "";
  clearError();
};

const handleRegister = async () => {
  isLoading.value = true;
  const appStore = useAppStore();
  await appStore.csrfToken();
  handleClearErrorMessages();
  const authStore = useAuthStore();
  try {
    await authStore.register({
      name: registerData.name,
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword,
    });
    addToast("You have successfully registered", "success");
    router.push({ path: "/" });
  } catch (error) {
    showErrorMessage.value = true;
    errorMessage.message = error.data.message || "";
    errorMessage.name = error.data.errors?.name || "";
    errorMessage.username = error.data.errors?.username || "";
    errorMessage.email = error.data.errors?.email || "";
    errorMessage.password = error.data.errors?.password || "";
    errorMessage.confirmPassword = error.data.errors?.confirmPassword || "";
    addToast("Something went wrong!", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>
