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
        username_or_email: email,
        password,
      }),
      onResponse({ response }) {
        if (response.status === 200) {
          token.value = response._data.data.token;
          fetchUser();
        }
      },
      onResponseError({ response }) {
        console.error(response);
      },
    });
    return response;
  }

  async function register({
    name,
    username,
    email,
    password,
    confirmPassword,
  }: {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const response: any = await $fetch(config.public.apiBase + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        password_confirmation: confirmPassword,
      }),
      onResponse({ response }) {
        if (response.status === 201) {
          token.value = response._data.data.token;
          fetchUser();
        }
      },
      onResponseError({ response }) {
        console.error(response);
      },
    });
    return response;
  }

  async function fetchUser() {
    if (token.value) {
      try {
        const response: any = await $fetch(config.public.apiBase + "/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        user.value = response.data.user;
        return response;
      } catch (error) {
        token.value = "";
        return "Failed to fetch user" + error;
      }
    } else {
      return "No token";
    }
  }
  return { user, token, login, register, fetchUser };
});
