export const useStoryStore = defineStore("storyStore", () => {
  const stories = ref();
  const categories = ref();
  const token = useCookie("token");
  const config = useRuntimeConfig();

  async function create({
    title,
    categoryId,
    content,
    images,
  }: {
    title: string;
    categoryId: number;
    content: string;
    images: [string];
  }) {
    const response: any = await $fetch(config.public.apiBase + "/api/stories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        title,
        category_id: categoryId,
        content,
        images,
      }),
      onResponseError({ response }) {
        console.error(response);
      },
    });
    return response;
  }

  async function fetchCategories() {
    const response: any = await $fetch(
      config.public.apiBase + "/api/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        onResponse({ response }) {
          if (response.status === 200) {
            categories.value = response._data.data.categories;
          }
        },
        onResponseError({ response }) {
          console.error(response);
          showError({
            fatal: true,
            statusCode: response.status,
            statusMessage:
              "Something went wrong when fetching data. Please contact support.",
          });
        },
      }
    );
    return response;
  }

  async function uploadImage({ file }: { file: File }) {
    if (token.value) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "story");
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

  return { stories, categories, create, fetchCategories, uploadImage };
});
