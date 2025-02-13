export const useAuthStore = defineStore("authStore", () => {
  const user = ref();
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
        "X-XSRF-TOKEN": useCookie("XSRF-TOKEN").value || "",
      },
      body: JSON.stringify({
        username_or_email: email,
        password,
      }),
      credentials: "include",
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
          "X-XSRF-TOKEN": useCookie("XSRF-TOKEN").value || "",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
        credentials: "include",
        onResponse({ response }) {
          if (response.status === 201) {
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
    const response: any = await $fetch(config.public.apiBase + "/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": useCookie("XSRF-TOKEN").value || "",
      },
      credentials: "include",
      onResponse({ response }) {
        user.value = response?._data?.data?.user || "";
      },
      onRequestError({ response }) {
        user.value = null;
      },
    });

    return response;
  }

  async function uploadAvatar({ file }: { file: File }) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "profile");
    const response: any = await $fetch(config.public.apiBase + "/api/upload", {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": useCookie("XSRF-TOKEN").value || "",
      },
      body: formData,
      credentials: "include",
      onResponseError({ response }) {
        console.error(response);
      },
    });
    return {
      path: response.url,
    };
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
        "X-XSRF-TOKEN": useCookie("XSRF-TOKEN").value || "",
      },
      body: JSON.stringify(payload),
      credentials: "include",
      onResponse({ response }) {
        if (response.status === 200) {
          useAsyncData("user", () => fetchData());
        }
      },
      onResponseError({ response }) {
        console.error(response);
      },
    });
    return response;
  }

  async function logout() {
    const response: any = await $fetch(config.public.apiBase + "/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": useCookie("XSRF-TOKEN").value || "",
      },
      credentials: "include",
      onResponse({ response }) {
        if (response.status === 200) {
          user.value = null;
        }
      },
      onResponseError({ response }) {
        console.error(response);
      },
    });
    return response;
  }

  return {
    user,
    login,
    register,
    fetchData,
    uploadAvatar,
    update,
    logout,
  };
});
