<template>
  <HeadlessTransitionRoot appear :show="modal.isOpen" as="template">
    <HeadlessDialog as="div" @close="closeModal" class="relative z-10">
      <!-- Background -->
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all"
            >
              <HeadlessDialogTitle
                as="h3"
                class="text-2xl font-medium leading-6 text-gray-900"
              >
                {{ modal.title || "Hi!" }}
              </HeadlessDialogTitle>

              <div class="mt-5">
                <p class="text-sm text-gray-500">
                  {{ modal.text || "-" }}
                </p>
              </div>

              <div class="mt-6 flex justify-between gap-5">
                <button
                  type="button"
                  class="w-1/2 btn btn-outline"
                  @click="closeModal"
                >
                  {{ modal.cancelText || "No" }}
                </button>
                <button
                  type="button"
                  class="w-1/2 btn btn-solid"
                  @click="confirmAction"
                >
                  {{ modal.confirmText || "Yes" }}
                </button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup>
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();

const { modal } = storeToRefs(appStore);

function closeModal() {
  appStore.closeModal();
}

function confirmAction() {
  if (modal.value.onConfirm) {
    modal.value.onConfirm();
  }
  closeModal();
}
</script>
