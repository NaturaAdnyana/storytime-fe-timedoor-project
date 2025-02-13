export default defineNuxtRouteMiddleware((to, from) => {
  // if (useCookie("auth_token").value) {
  //   const authStore = useAuthStore();
  //   const { token } = storeToRefs(authStore);
  //   token.value = useCookie("auth_token").value;
  // }
  if (to.path === "/profile") {
    return navigateTo("/profile/story");
  }
});
