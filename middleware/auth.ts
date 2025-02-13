export default defineNuxtRouteMiddleware(async (to, from) => {
  const authExpiration = useCookie("auth_expiration");

  if (to.path === "/login" || to.path === "/register") {
    if (authExpiration.value) {
      return navigateTo("/");
    }
  }

  if (to.matched?.[0]?.path === "/profile") {
    if (!authExpiration.value) {
      return navigateTo("/login");
    }
  }

  if (to.path === "/write") {
    if (!authExpiration.value) {
      return navigateTo("/login");
    }
  }
});
