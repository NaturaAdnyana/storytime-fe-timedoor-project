type Toasts = {
  id?: number;
  message?: string;
  type?: string;
  // 'success' || 'error'
}[];

export const useAppStore = defineStore("app", () => {
  const modal = reactive({
    isOpen: false,
    title: "",
    text: "",
    cancelText: "Cancel",
    confirmText: "Confirm",
    onConfirm: null,
  });

  const toasts = ref<Toasts>([]);

  const config = useRuntimeConfig();

  const openModal = (config: any) => {
    Object.assign(modal, {
      ...config,
      isOpen: true,
    });
  };

  const closeModal = () => {
    modal.isOpen = false;
  };

  const addToast = (message: string, type = "info", duration = 3100) => {
    const id = Date.now();
    toasts.value.push({ id, message, type });

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index !== -1) toasts.value.splice(index, 1);
  };

  const csrfToken = async () => {
    await $fetch(config.public.apiBase + "/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
      onResponseError({ response }) {
        console.error(response);
      },
    });
  };

  return {
    modal,
    openModal,
    closeModal,
    toasts,
    addToast,
    removeToast,
    csrfToken,
  };
});
