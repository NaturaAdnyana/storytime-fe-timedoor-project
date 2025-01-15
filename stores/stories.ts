export const useStoryStore = defineStore("storyStore", () => {
  const stories = reactive<{
    all: Record<number, any[]>;
    myStories: Record<number, any[]>;
    bookmark: Record<number, any[]>;
  }>({
    all: {},
    myStories: {},
    bookmark: {},
  });

  const currentPage = reactive<{
    all: number;
    myStories: number;
    bookmark: number;
  }>({
    all: 1,
    myStories: 1,
    bookmark: 1,
  });

  const categories = ref();
  const token = useCookie("token");
  const config = useRuntimeConfig();

  async function fetchStories(
    type: "all" | "myStories" | "bookmark" = "all",
    page: number = 1
  ) {
    if (stories[type][page]) {
      currentPage[type] = page;
      return;
    }

    const endpoint = {
      all: "/api/stories",
      myStories: "/api/stories/my",
      bookmark: "/api/stories/bookmarks",
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (type === "myStories") {
      headers.Authorization = `Bearer ${token.value}`;
    }

    const response: any = await $fetch(
      `${config.public.apiBase}${endpoint[type]}?page=${page}`,
      {
        method: "GET",
        headers,
        onResponse({ response }) {
          if (response.status === 200) {
            stories[type][page] = response._data.data.stories;
            console.log(stories[type][page]);
            currentPage[type] = page;
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

  function clearStories(type?: "all" | "myStories" | "bookmark") {
    if (type) {
      stories[type] = {};
    } else {
      stories.all = {};
      stories.myStories = {};
      stories.bookmark = {};
    }
  }

  return {
    stories,
    currentPage,
    categories,
    create,
    fetchStories,
    fetchCategories,
    uploadImage,
    clearStories,
  };
});
