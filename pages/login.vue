<template>
  <section class="flex flex-wrap p-3 border min-h-screen">
    <div
      class="basis-full md:basis-1/2 py-12 md:py-6 px-10 md:pr-20 md:pl-[110px] flex flex-col justify-center flex-1"
    >
      <h2 class="font-bold mb-5">Login</h2>
      <form @submit.prevent="handleRegister" class="space-y-5">
        <BaseInput
          label="Username/Email"
          type="text"
          name="username"
          placeholder="Enter your username or email"
          v-model="registerData.username"
        />
        <BaseInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          v-model="registerData.password"
        />
        <button
          type="submit"
          class="bg-gray-asparagus-tr text-white transition hover:bg-kombu-green inline-block rounded-lg px-5 py-2 cursor-pointer"
        >
          Login
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
      class="basis-full md:basis-1/2 pt-20 px-10 md:px-12 bg-isabelline-sc rounded-md flex flex-col justify-between gap-10 flex-1"
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
definePageMeta({
  layout: "base",
});

const registerData = reactive({
  username: "",
  password: "",
});

const handleRegister = () => {
  console.log(registerData);
};
</script>
