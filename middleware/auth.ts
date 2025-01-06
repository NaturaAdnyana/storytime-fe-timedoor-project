export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  if (authStore.user && authStore.token) {
    // return abortNavigation("You are already authenticated");
    return navigateTo("/");
  }
});
