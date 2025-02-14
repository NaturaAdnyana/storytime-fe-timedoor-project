<template>
  <div>
    <NuxtLink
      :to="data?.slug ? '/stories/' + data?.slug : '#'"
      class="relative w-full h-full flex flex-col group rounded-lg"
    >
      <div
        class="relative w-full rounded-lg overflow-hidden aspect-square border"
      >
        <div
          v-if="isLoading"
          class="w-full h-full aspect-square border animate-pulse bg-slate-200"
        ></div>
        <NuxtImg
          v-else
          :src="data?.images?.[0]?.path || '/images/landscape-placeholder.svg'"
          class="w-full object-cover aspect-square transition-opacity"
          :class="!isLoading && 'group-hover:opacity-80'"
        />
        <div
          class="absolute bottom-4 right-4 flex space-x-2"
          v-if="showAction === 'all'"
        >
          <div
            v-if="isLoading"
            class="rounded-full w-12 h-12 bg-slate-300 animate-pulse"
          ></div>
          <template v-else>
            <StoryActionButton type="edit" @action="handleEdit" />
            <StoryActionButton
              type="bookmark"
              :isBookmarked="isBookmarked"
              :isLoading="isActionLoading.bookmarkBtn"
              @action="handleBookmark"
            />
            <StoryActionButton
              type="delete"
              :isLoading="isActionLoading.deleteBtn"
              @action="openDeleteModal"
            />
          </template>
        </div>
        <div
          class="absolute bottom-4 right-4"
          v-else-if="showAction === 'bookmark-only'"
        >
          <div
            v-if="isLoading"
            class="rounded-full w-12 h-12 bg-slate-300 animate-pulse"
          ></div>
          <StoryActionButton
            v-else
            type="bookmark"
            :isBookmarked="isBookmarked"
            :isLoading="isActionLoading.bookmarkBtn"
            @action="handleBookmark"
          />
        </div>
      </div>
      <div class="flex flex-col gap-3 pb-10 mt-3">
        <div
          v-if="isLoading"
          class="w-2/3 h-8 bg-slate-200 animate-pulse rounded-lg"
        ></div>
        <h3 class="transition-color group-hover:text-gray-asparagus-tr" v-else>
          {{ data?.title || "Untitled" }}
        </h3>
        <div v-if="isLoading" class="space-y-2">
          <div class="w-full h-4 bg-slate-200 animate-pulse rounded-lg"></div>
          <div class="w-full h-4 bg-slate-200 animate-pulse rounded-lg"></div>
          <div class="w-full h-4 bg-slate-200 animate-pulse rounded-lg"></div>
        </div>
        <p v-else class="text-justify custom-truncate">
          {{ previewText || "" }}
        </p>
      </div>
      <div class="absolute bottom-0 w-full flex justify-between text-sm">
        <div
          class="basis-3/7 flex items-center gap-2 overflow-hidden"
          v-show="showAction !== 'all'"
        >
          <div
            v-if="isLoading"
            class="w-8 h-8 aspect-square rounded-full bg-slate-200 animate-pulse"
          ></div>
          <NuxtImg
            v-else
            :src="data?.user?.avatar || '/images/avatar.png'"
            class="w-8 h-8 rounded-full aspect-square border"
            format="webp"
          />
          <div
            v-if="isLoading"
            class="w-36 h-4 bg-slate-200 animate-pulse rounded-lg"
          ></div>
          <h4 v-else class="text-nowrap truncate">
            {{ data?.user?.name || "Unknown" }}
          </h4>
        </div>
        <div
          :class="[
            'basis-full flex items-center gap-3',
            showAction === 'all' ? 'justify-between' : 'justify-end',
          ]"
        >
          <div
            v-if="isLoading"
            class="w-16 h-4 bg-slate-200 animate-pulse rounded-lg"
          ></div>
          <span v-else :class="showAction === 'all' && 'order-last'">
            {{ dateFormatter(data?.created_at) }}
          </span>
          <div
            v-if="isLoading"
            class="w-20 h-8 bg-slate-200 animate-pulse rounded-lg"
          ></div>
          <span
            v-else
            class="px-2 py-1 bg-isabelline-sc rounded text-gray-asparagus-tr"
            >{{ data?.category?.name }}</span
          >
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const appStore = useAppStore();
const { addToast } = useAppStore();

import { BookmarkIcon } from "@heroicons/vue/24/solid";
import DOMPurify from "dompurify";

const router = useRouter();

const { showAction, userId, isLoading, data, getStory } = defineProps({
  showAction: {
    type: String,
    // bookmark-only || all || none
    default: "none",
  },
  userId: {
    type: Number,
    default: 0,
  },
  isLoading: Boolean,
  data: {
    type: {},
  },
  getStory: {
    type: String,
  },
});
const isBookmarked = ref(data?.bookmarks[0]?.user_id === userId || false);
const previewText = ref("");

const getFirstParagraphText = (html) => {
  const cleanHtml = DOMPurify.sanitize(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanHtml, "text/html");
  const firstParagraph = doc.querySelector("p");
  return firstParagraph ? firstParagraph.textContent : "";
};

onMounted(() => {
  previewText.value = getFirstParagraphText(data?.content);
});

const isActionLoading = reactive({
  bookmarkBtn: false,
  deleteBtn: false,
});

const handleEdit = () => {
  router.push(data?.slug ? "/stories/" + data?.slug + "/edit" : "#");
};

const handleBookmark = async () => {
  isActionLoading.bookmarkBtn = true;
  const storyStore = useStoryStore();
  try {
    await storyStore.toggleBookmark(data?.id, getStory);
    isBookmarked.value = !isBookmarked.value;
    if (isBookmarked.value) {
      addToast("Successfully added story to bookmarks", "success");
    } else {
      addToast("Successfully remove story to bookmarks", "success");
    }
  } catch (error) {
    console.log(error);
  } finally {
    isActionLoading.bookmarkBtn = false;
  }
};

function openDeleteModal() {
  appStore.openModal({
    title: "Confirm Delete",
    text: "Are you sure you want to delete this item?",
    cancelText: "Cancel",
    confirmText: "Delete",
    onConfirm: handleDelete,
  });
}

const handleDelete = async () => {
  isActionLoading.deleteBtn = true;
  const storyStore = useStoryStore();
  try {
    await storyStore.destroy(data?.id, getStory);
    addToast("Successfully delete a story", "success");
  } catch (error) {
    addToast("Something went wrong!", "error");
    console.log(error);
  } finally {
    isActionLoading.deleteBtn = false;
  }
};

const dateFormatter = (rawDate) => {
  const date = new Date(rawDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};
</script>
