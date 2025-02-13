export default defineNuxtPlugin((nuxtApp) => {
  const authExpiration = useCookie("auth_expiration");
  const authStore = useAuthStore();
  if (authExpiration.value) {
    useLazyAsyncData(() => authStore.fetchData(), { server: false });
  }
});
