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
      <form @submit.prevent="handleRegister" class="space-y-5">
        <BaseInput
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          v-model="registerData.name"
        />
        <BaseInput
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your username"
          v-model="registerData.username"
        />
        <BaseInput
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          v-model="registerData.email"
        />
        <BaseInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your chosen password"
          v-model="registerData.password"
        />
        <BaseInput
          label="Confirm Password"
          type="password"
          name="confirm-password"
          placeholder="Re-enter your chosen password"
          v-model="registerData.confirmPassword"
        />
        <button type="submit" class="btn btn-solid">Create Account</button>
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
});

const registerData = reactive({
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleRegister = () => {
  console.log(registerData);
};
</script>
