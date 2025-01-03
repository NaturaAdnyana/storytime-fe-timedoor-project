export const useAuthStore = defineStore("authStore", () => {
  const user = ref();
  const token = useCookie("token", {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
  const config = useRuntimeConfig();

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const response: any = await $fetch(config.public.apiBase + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status === "success") {
      token.value = response.data.token;
      await fetchUser();
      return response;
    } else {
      console.error("Login failed:", response.message);
      return response;
    }
  }

  async function fetchUser() {
    if (token.value) {
      try {
        const response = await $fetch(config.public.apiBase + "/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        user.value = response;
        return response;
      } catch (error) {
        token.value = "";
        return "Failed to fetch user" + error;
      }
    } else {
      return "No token";
    }
  }
  return { user, token, login, fetchUser };
});
