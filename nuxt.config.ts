// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/image",
    "nuxt-swiper",
    "nuxt-headlessui",
  ],
  headlessui: {
    prefix: "Headless",
  },
  css: ["~/assets/css/fonts.css", "~/assets/css/main.css"],
  runtimeConfig: {
    apiSecret: "",
    public: {
      apiBase: "",
    },
  },
});
