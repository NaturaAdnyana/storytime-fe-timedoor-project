export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (to.path === "/profile") {
    return navigateTo("/profile/story");
  }
});
