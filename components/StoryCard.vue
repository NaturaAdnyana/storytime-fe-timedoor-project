<template>
  <NuxtLink :to="data?.slug || 0" class="h-full flex flex-col group">
    <div class="relative w-full h-full flex-1 overflow-hidden">
      <div
        v-if="isLoading"
        class="w-full h-full rounded-lg border animate-pulse bg-slate-200 aspect-square"
      ></div>
      <div v-else class="border rounded-lg overflow-hidden">
        <NuxtImg
          :src="
            data?.images?.[0]?.path
              ? config.public.apiBase + data?.images?.[0]?.path
              : '/images/landscape-placeholder.svg'
          "
          class="w-full h-full object-cover aspect-square transition-opacity"
          :class="!isLoading && 'group-hover:opacity-80'"
        />
      </div>
      <div
        class="absolute bottom-4 right-4 flex space-x-2"
        v-if="showAction && isUser"
      >
        <div
          v-if="isLoading"
          class="rounded-full w-12 h-12 bg-slate-300 animate-pulse"
        ></div>
        <template v-else>
          <NuxtLink
            :to="data?.slug + '/edit'"
            class="rounded-full w-12 h-12 p-2 bg-gray-asparagus-tr transition hover:bg-kombu-green"
          >
            <img src="/icons/edit.svg" alt="edit" />
          </NuxtLink>
          <button
            @click.prevent="$emit('bookmarkClicked', data?.id)"
            class="rounded-full w-12 h-12 p-2 bg-gray-asparagus-tr transition hover:bg-kombu-green"
          >
            <img src="/icons/bookmark.svg" alt="bookmark" />
          </button>
          <button
            @click.prevent="$emit('deleteClicked', data?.id)"
            class="rounded-full w-12 h-12 p-2 bg-gray-asparagus-tr transition hover:bg-kombu-green"
          >
            <img src="/icons/delete.svg" alt="delete" />
          </button>
        </template>
      </div>
      <div class="absolute bottom-4 right-4" v-else-if="showAction">
        <div
          v-if="isLoading"
          class="rounded-full w-12 h-12 bg-slate-300 animate-pulse"
        ></div>
        <button
          v-else
          class="rounded-full w-12 h-12 p-2 bg-gray-asparagus-tr transition hover:bg-kombu-green"
        >
          <img src="/icons/bookmark.svg" alt="bookmark" />
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-3 mt-3">
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
        {{ data?.content.replace(regexRemoveTag, "") }}
      </p>
      <div class="flex justify-between text-sm">
        <div
          class="basis-3/7 flex items-center gap-2 overflow-hidden"
          v-show="!isUser"
        >
          <div
            v-if="isLoading"
            class="w-8 h-8 aspect-square rounded-full bg-slate-200 animate-pulse"
          ></div>
          <NuxtImg
            v-else
            :src="data?.user?.avatar || '/images/avatar.png'"
            class="w-8 h-8 rounded-full aspect-square"
            format="webp"
          />
          <div
            v-if="isLoading"
            class="w-36 h-4 bg-slate-200 animate-pulse rounded-lg"
          ></div>
          <h4 v-else class="text-nowrap truncate">
            {{ data?.user?.avatar || "Unknown" }}
          </h4>
        </div>
        <div
          :class="[
            'basis-full flex items-center gap-3',
            isUser ? 'justify-between' : 'justify-end',
          ]"
        >
          <div
            v-if="isLoading"
            class="w-16 h-4 bg-slate-200 animate-pulse rounded-lg"
          ></div>
          <span v-else :class="isUser && 'order-last'">
            {{ dateFormatter(data?.updated_at) }}
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
    </div>
  </NuxtLink>
</template>

<script setup>
const emit = defineEmits();
const config = useRuntimeConfig();

const { showAction, isUser, isLoading, data } = defineProps({
  showAction: {
    type: Boolean,
    default: true,
  },
  isUser: {
    type: {},
  },
  isLoading: Boolean,
  data: {
    type: {},
  },
});

let regexRemoveTag = /(<([^>]+)>)/gi;

const dateFormatter = (rawDate) => {
  const date = new Date(rawDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};
</script>

<style scoped>
.custom-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
