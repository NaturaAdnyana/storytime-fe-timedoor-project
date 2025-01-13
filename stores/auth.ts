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
    const response: any = await $fetch(config.public.apiBase + "/api/login", {
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
          fetchData();
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
    const response: any = await $fetch(
      config.public.apiBase + "/api/register",
      {
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
            fetchData();
          }
        },
        onResponseError({ response }) {
          console.error(response);
        },
      }
    );
    return response;
  }

  async function fetchData() {
    if (token.value) {
      try {
        const response: any = await $fetch(
          config.public.apiBase + "/api/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );

        user.value = response.data.user;
        return response;
      } catch (error) {
        token.value = null;
        user.value = null;
        return "Failed to fetch user" + error;
      }
    } else {
      return "No token";
    }
  }

  async function uploadAvatar({ file }: { file: File }) {
    if (token.value) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "profile");
      const response: any = await $fetch(
        config.public.apiBase + "/api/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          body: formData,
          onResponseError({ response }) {
            console.error(response);
          },
        }
      );
      return {
        path: response.url,
      };
    } else {
      return "No token";
    }
  }

  async function update({
    avatar,
    name,
    // username,
    // email,
    bio,
    oldPassword,
    newPassword,
    confirmNewPassword,
  }: {
    avatar?: string;
    name?: string;
    // username: string;
    // email: string;
    bio?: string;
    oldPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }) {
    const payload: Record<string, any> = {};
    if (avatar) payload.avatar = avatar;
    if (name) payload.name = name;
    if (bio) payload.bio = bio;
    if (oldPassword) payload.old_password = oldPassword;
    if (newPassword) {
      payload.new_password = newPassword;
      payload.new_password_confirmation = confirmNewPassword;
    }
    // console.log(payload);
    const response: any = await $fetch(config.public.apiBase + "/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify(payload),
      onResponse({ response }) {
        if (response.status === 200) {
          fetchData();
        }
      },
      onResponseError({ response }) {
        console.error(response);
      },
    });
    return response;
  }

  async function logout() {
    if (token.value) {
      const response: any = await $fetch(
        config.public.apiBase + "/api/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          onResponse({ response }) {
            if (response.status === 200) {
              token.value = null;
              user.value = null;
            }
          },
          onResponseError({ response }) {
            console.error(response);
          },
        }
      );
      return response;
    } else {
      return "No token";
    }
  }

  return {
    user,
    token,
    login,
    register,
    fetchData,
    uploadAvatar,
    update,
    logout,
  };
});
