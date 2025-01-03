export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();

  if (!authStore.user && authStore.token) {
    useAsyncData(() => authStore.fetchUser());
  }
});
