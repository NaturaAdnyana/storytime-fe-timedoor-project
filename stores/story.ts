type Stories = {
  public: any;
  userStories: any;
  userBookmarks: any;
};

type CurrentPage = {
  public: number;
  userStories: number;
  userBookmarks: number;
};

type Params = {
  page: number;
  sort: string;
  category?: string;
  keyword?: string;
};

export const useStoryStore = defineStore("storyStore", () => {
  const stories = reactive<Stories>({
    public: {},
    userStories: {},
    userBookmarks: {},
  });

  const currentPage = reactive<CurrentPage>({
    public: 1,
    userStories: 1,
    userBookmarks: 1,
  });

  const categories = ref();
  const currentParamsName = ref("newest");
  const token = useCookie("token");
  const config = useRuntimeConfig();

  async function getStories(
    type: "public" | "userStories" | "userBookmarks",
    params: Params
  ) {
    currentPage[type] = params?.page || 1;
    createParamsName(params.sort, params.category, params.keyword);

    if (stories[type]?.[currentParamsName.value]?.[params.page]) {
      // createParamsName(params.sort, params.category, params.keyword);
      // currentPage[type] = params.page;
      return;
    }

    const endpoint = {
      public: "/api/stories",
      userStories: "/api/stories/my",
      userBookmarks: "/api/stories/bookmarks",
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    };

    const response: any = await $fetch(
      `${config.public.apiBase}${endpoint[type]}`,
      {
        method: "GET",
        headers,
        params: {
          page: params?.page || 1,
          sort: params?.sort || "newest",
          category: params?.category || "",
          keyword: params?.keyword || "",
        },
        onResponse({ response }) {
          if (response.status === 200) {
            if (!stories[type][currentParamsName.value]) {
              stories[type][currentParamsName.value] = {};
            }

            stories[type][currentParamsName.value][currentPage[type]] =
              response._data.data.stories;
          }
        },
        onResponseError({ response }) {
          console.error(response);
          // showError({
          //   fatal: true,
          //   statusCode: response.status,
          //   statusMessage:
          //     "Something went wrong when fetching data. Please contact support.",
          // });
        },
      }
    );
    return response;
  }

  async function getStoryBySlug(slug: string) {
    const response: any = await $fetch(
      config.public.apiBase + "/api/stories/" + slug,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        onResponseError({ response }) {
          console.error(response);
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

  async function update({
    id,
    title,
    categoryId,
    content,
    images,
  }: {
    id: Number;
    title: string;
    categoryId: number;
    content: string;
    images: [string];
  }) {
    const response: any = await $fetch(
      config.public.apiBase + "/api/stories/" + id,
      {
        method: "PUT",
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
      }
    );
    return response;
  }

  async function getCategories() {
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

  async function clearStories(
    type?: "public" | "userStories" | "userBookmarks"
  ) {
    // console.log("CLEAR", type);
    if (type) {
      stories[type] = {};
    } else {
      stories.public = {};
      stories.userStories = {};
      stories.userBookmarks = {};
    }
  }

  async function toggleBookmark(
    id: number,
    type: "public" | "userStories" | "userBookmarks" = "public"
  ) {
    const authStore = useAuthStore();
    const response: any = await $fetch(
      config.public.apiBase + "/api/stories/bookmarks/" + id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        onResponse() {
          const storiesData =
            stories[type]?.[currentParamsName.value]?.[currentPage[type]]?.data;

          for (const story of storiesData) {
            if (story.id === id) {
              if (story.bookmarks[0]?.user_id === authStore.user?.id) {
                story.bookmarks = [];
                break;
              } else {
                story.bookmarks = [{ user_id: authStore.user?.id }];
                break;
              }
            }
          }
          if (type === "userBookmarks") {
            clearStories();
            getStories(type, { page: currentPage[type], sort: "newest" });
          }
        },
        onResponseError({ response }) {
          console.error(response);
        },
      }
    );
    return response;
  }

  async function destroy(
    id: number,
    type: "public" | "userStories" | "userBookmarks" = "public"
  ) {
    const response: any = await $fetch(
      config.public.apiBase + "/api/stories/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        onResponse() {
          clearStories();
          getStories(type, { page: currentPage[type], sort: "newest" });
        },
        onResponseError({ response }) {
          console.error(response);
          showError({
            fatal: true,
            statusCode: response.status,
            statusMessage:
              "Something went wrong when deleting data. Please contact support.",
          });
        },
      }
    );
    return response;
  }

  function createParamsName(
    sortBy: string = "newest",
    category?: string,
    keyword?: string
  ) {
    currentParamsName.value =
      sortBy +
      (category ? "-" + category : "") +
      (keyword ? "-" + keyword : "");
  }

  return {
    stories,
    currentPage,
    categories,
    currentParamsName,
    create,
    update,
    getStories,
    getStoryBySlug,
    getCategories,
    uploadImage,
    clearStories,
    toggleBookmark,
    destroy,
    createParamsName,
  };
});
