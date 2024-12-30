export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/profile") {
    return navigateTo("/profile/story");
  }
});
