<template>
  <section class="flex flex-wrap p-3 border min-h-screen">
    <div
      class="order-2 md:order-1 basis-full md:basis-1/2 py-12 md:py-6 px-10 md:pr-20 md:pl-[110px] flex flex-col justify-center flex-1"
    >
      <h2 class="font-bold mb-5">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div
          v-show="errorMessage.message"
          class="bg-red-200 w-full p-3 rounded-lg text-red-700 text-sm flex justify-between items-center"
        >
          {{ errorMessage.message }}
          <button
            class="bg-red-100 rounded-full p-1"
            type="button"
            @click="handleErrorMessages"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
        <div>
          <BaseInput
            label="Email"
            type="text"
            placeholder="Enter your username or email"
            v-model="loginData.email"
            :message="errorMessage.email"
            required="true"
          />
        </div>
        <BaseInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          v-model="loginData.password"
          :message="errorMessage.password"
          required="true"
        />
        <button
          type="submit"
          class="btn btn-solid"
          :disabled="isLoading || !loginData.email || !loginData.password"
        >
          <span v-if="isLoading" class="flex items-center gap-2">
            <div class="loader animate-spin"></div>
            Loading...
          </span>
          <span v-else>Login</span>
        </button>
        <p class="text-sm">
          Don’t have an account?
          <NuxtLink
            to="/register"
            class="text-gray-asparagus-tr font-bold hover:underline"
            >Register</NuxtLink
          >
        </p>
      </form>
    </div>
    <div
      class="order-1 md:order-2 basis-full md:basis-1/2 pt-20 px-10 md:px-12 bg-isabelline-sc rounded-md flex flex-col justify-between gap-10 flex-1"
    >
      <div class="space-y-5">
        <h1>Welcome Back to Story Time!</h1>
        <p>
          Dive back into captivating stories, follow your favorite authors, and
          continue sharing your own tales.
        </p>
      </div>
      <img src="/images/login.svg" alt="register" class="object-contain" />
    </div>
  </section>
</template>

<style scoped>
h2 {
  font-family: "DM Sans", sans-serif;
}
</style>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "base",
  middleware: ["auth"],
});

const router = useRouter();

const isLoading = ref(false);

const loginData = reactive({
  email: "",
  password: "",
});

const errorMessage = reactive({
  show: false,
  message: "",
  email: "",
  password: "",
});

const handleErrorMessages = () => {
  errorMessage.message = "";
  errorMessage.email = "";
  errorMessage.password = "";
  clearError();
};

const handleLogin = async () => {
  isLoading.value = true;
  const authStore = useAuthStore();
  try {
    await authStore.login({
      email: loginData.email,
      password: loginData.password,
    });
    router.push({ path: "/" });
  } catch (error) {
    errorMessage.message = error.data.message || "";
    errorMessage.email = error.data.errors?.email[0] || "";
    errorMessage.password = error.data.errors?.password[0] || "";
    console.error(error.data);
  } finally {
    isLoading.value = false;
  }
};
</script>
