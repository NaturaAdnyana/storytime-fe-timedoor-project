export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  if (!authStore.user) {
    useLazyAsyncData("fetch-user", () => authStore.fetchData(), {
      server: false,
    });
  }
});
