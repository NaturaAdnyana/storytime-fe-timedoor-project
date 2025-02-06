export const useAppStore = defineStore("app", () => {
  const modal = reactive({
    isOpen: false,
    title: "",
    text: "",
    cancelText: "Cancel",
    confirmText: "Confirm",
    onConfirm: null,
  });

  const openModal = (config: any) => {
    Object.assign(modal, {
      ...config,
      isOpen: true,
    });
  };

  const closeModal = () => {
    modal.isOpen = false;
  };

  return { modal, openModal, closeModal };
});
