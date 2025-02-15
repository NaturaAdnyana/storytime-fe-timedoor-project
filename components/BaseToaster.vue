<template>
  <div class="fixed top-20 left-1/2 -translate-x-1/2 z-50 space-y-4">
    <div
      class="toaster rounded-lg shadow-md border-r border-l border-t bg-white overflow-hidden"
      v-for="toast in toasts"
      :key="toast.id"
    >
      <div class="p-4 flex items-center justify-center gap-5 relative">
        <img
          v-if="toast.type === 'success'"
          src="/icons/check.svg"
          alt="Finished process"
          class="w-6 popup"
        />
        <span class="text-base font-medium w-4/5">
          {{ toast.message }}
        </span>
        <button
          @click="appStore.removeToast(toast.id)"
          class="p-1 absolute right-3 rounded-full transition-all hover:bg-gainsboro active:scale-90"
        >
          <XMarkIcon class="size-6" aria-hidden="true" />
        </button>
        <div
          :class="[
            'w-full h-1 absolute bottom-0 loadbar',
            toast.type === 'success'
              ? 'bg-gray-asparagus-tr'
              : toast.type === 'error'
              ? 'bg-red-600'
              : 'bg-blue-700',
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

const appStore = useAppStore();
const { toasts } = storeToRefs(appStore);
</script>
