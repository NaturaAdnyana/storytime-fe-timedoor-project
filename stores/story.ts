export const useStoryStore = defineStore("storyStore", () => {
  const stories = reactive<{
    all: any;
    myStories: any;
    bookmarks: any;
  }>({
    all: {},
    myStories: {},
    bookmarks: {},
  });

  const currentPage = reactive<{
    all: number;
    myStories: number;
    bookmarks: number;
  }>({
    all: 1,
    myStories: 1,
    bookmarks: 1,
  });

  const categories = ref();
  const token = useCookie("token");
  const config = useRuntimeConfig();

  async function fetchStories(
    type: "all" | "myStories" | "bookmarks" = "all",
    page: number = 1
  ) {
    if (stories[type][page]) {
      currentPage[type] = page;
      return;
    }

    const endpoint = {
      all: "/api/stories",
      myStories: "/api/stories/my",
      bookmarks: "/api/stories/bookmarkss",
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (type === "all" || type === "myStories") {
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

  function clearStories(type?: "all" | "myStories" | "bookmarks") {
    if (type) {
      stories[type] = {};
    } else {
      stories.all = {};
      stories.myStories = {};
      stories.bookmarks = {};
    }
  }

  async function toggleBookmark(
    id: number,
    type: "all" | "myStories" | "bookmarks" = "all"
  ) {
    const authStore = useAuthStore();
    const response: any = await $fetch(
      config.public.apiBase + "/api/stories/bookmark/" + id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        onResponse() {
          const storiesData = stories[type]?.[currentPage[type]]?.data;

          for (const story of storiesData) {
            if (story.id === id) {
              if (story.bookmarks[0]?.user_id === authStore.user?.id) {
                console.log("BOOKMARKED");
                story.bookmarks = [];
                break;
              } else {
                console.log("NOT BOOKMARKED");
                story.bookmarks = [{ user_id: authStore.user?.id }];
                break;
              }
            }
          }
        },
        onResponseError({ response }) {
          console.error(response);
        },
      }
    );
    return response;
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
    toggleBookmark,
  };
});
