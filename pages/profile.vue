<template>
  <section class="bg-isabelline-sc px-20 lg:px-[110px] py-10">
    <div class="flex justify-center flex-wrap gap-y-10">
      <div class="flex-1 basis-full md:basis-2/12 aspect-square p-5">
        <NuxtImg
          class="mx-auto w-full h-full object-cover rounded-full bg-gray-100 ring-1 ring-gray-200"
          :src="user?.avatar || '/images/avatar.png'"
          alt="My Profile Picture"
          format="webp"
        />
      </div>
      <div class="flex-1 md:basis-8/12 flex flex-col justify-center md:px-10">
        <h1 class="font-dm-sans text-2xl mb-1">{{ user?.name }}</h1>
        <p class="mb-4">{{ user?.email }}</p>
        <p>
          {{ user?.bio }}
        </p>
      </div>
      <div
        class="flex-1 basis-full md:basis-2/12 flex items-center justify-start md:justify-end"
      >
        <button @click="toggleModal" class="btn btn-solid">Edit Profile</button>
      </div>
    </div>
  </section>
  <section class="py-20">
    <div class="px-6 md:px-20 lg:px-[110px] pb-10 space-x-5">
      <NuxtLink to="/profile/story" class="btn btn-thin">My Story</NuxtLink>
      <NuxtLink to="/profile/bookmark" class="btn btn-thin">Bookmark</NuxtLink>
    </div>
    <div class="px-6 lg:px-[110px] flex flex-wrap">
      <aside class="basis-full md:basis-4/12 mb-10">
        <div class="border p-10 rounded text-center space-y-5 sticky top-28">
          <h2>Write your story</h2>
          <p>
            Share your unique voice with the world – start writing your story
            today!
          </p>
          <NuxtLink to="/write" class="btn btn-solid">Write Story</NuxtLink>
        </div>
      </aside>
      <main class="basis-full md:basis-8/12">
        <NuxtPage />
      </main>
    </div>
  </section>
  <HeadlessTransitionRoot appear :show="isOpen" as="template">
    <HeadlessDialog as="div" @close="toggleModal" class="relative z-10">
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
          class="flex min-h-full items-center justify-center p-5 md:p-[110px] text-center"
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
              class="w-full transform overflow-hidden mt-20 md:mt-0 rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all"
            >
              <HeadlessDialogTitle
                as="h3"
                class="text-xl font-medium leading-6 text-gray-900"
              >
                Edit Profile
              </HeadlessDialogTitle>
              <div class="mt-10">
                <form @submit.prevent="handleSubmit" class="flex flex-wrap">
                  <div class="space-y-4 basis-full md:basis-1/2 md:px-5">
                    <HeadlessTransitionRoot
                      :show="showErrorMessage"
                      enter="transition-opacity duration-75"
                      enter-from="opacity-0"
                      enter-to="opacity-100"
                      leave="transition-opacity duration-150"
                      leave-from="opacity-100"
                      leave-to="opacity-0"
                    >
                      <div
                        class="bg-red-200 w-full p-3 rounded-lg text-red-700 text-sm flex justify-between items-center"
                      >
                        <span>
                          {{ errorMessage.message }}
                        </span>
                        <button
                          class="bg-red-100 rounded-full p-1"
                          type="button"
                          @click="handleClearErrorMessages"
                        >
                          <XMarkIcon class="w-5 h-5" />
                        </button>
                      </div>
                    </HeadlessTransitionRoot>
                    <BaseProfileImgInput
                      id="profile-image"
                      name="profile-image"
                      :imageUrl="updateUserData.avatar"
                      @update:file="handleFileUpdate"
                      :isLoading="isAvatarLoading"
                    />
                    <BaseInput
                      type="text"
                      id="name"
                      label="Name"
                      placeholder="Your Name"
                      v-model="updateUserData.name"
                      :messages="errorMessage.name"
                    />
                    <BaseInput
                      type="text"
                      id="username"
                      label="Username"
                      disabled="true"
                      placeholder="Your Username"
                      v-model="updateUserData.username"
                    />
                    <BaseInput
                      type="email"
                      id="email"
                      label="Email"
                      disabled="true"
                      placeholder="Your Email"
                      v-model="updateUserData.email"
                    />
                    <BaseInput
                      type="textarea"
                      id="bio"
                      label="About Me"
                      placeholder="Your Bio"
                      v-model="updateUserData.bio"
                      :messages="errorMessage.bio"
                    />
                  </div>
                  <div
                    class="space-y-4 basis-full md:basis-1/2 md:px-5 mt-10 md:mt-0"
                  >
                    <h4>Change Password</h4>
                    <BaseInput
                      type="password"
                      id="old-password"
                      label="Old Password"
                      placeholder="Enter your old password"
                      v-model="updateUserData.oldPassword"
                      :messages="errorMessage.oldPassword"
                    />
                    <BaseInput
                      type="password"
                      id="new-password"
                      label="New Password"
                      placeholder="Enter your new password"
                      v-model="updateUserData.newPassword"
                      :messages="errorMessage.newPassword"
                    />
                    <BaseInput
                      type="password"
                      id="confirm-password"
                      label="Confirm New Password"
                      placeholder="Re-enter your new password"
                      v-model="updateUserData.confirmNewPassword"
                      :messages="errorMessage.confirmNewPassword"
                    />
                  </div>
                  <div class="basis-full px-0 md:px-5 pt-5 space-x-5">
                    <button
                      type="button"
                      @click="toggleModal"
                      class="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button type="submit" class="btn btn-solid">
                      <span
                        v-if="isUpdateLoading"
                        class="flex items-center gap-2"
                      >
                        <div class="loader animate-spin"></div>
                        Loading...
                      </span>
                      <span v-else>Update Profile</span>
                    </button>
                  </div>
                </form>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  scrollToTop: false,
  middleware: ["auth"],
});

const isOpen = ref(false);
const isUpdateLoading = ref(false);
const isAvatarLoading = ref(false);
const showErrorMessage = ref(false);

const toggleModal = () => {
  isOpen.value = !isOpen.value;
};

const authStore = useAuthStore();
const { addToast } = useAppStore();

const { user } = storeToRefs(authStore);

const updateUserData = reactive({
  name: user?.value?.name || "",
  username: user?.value?.username || "",
  email: user?.value?.email || "",
  avatar: user?.value?.avatar || "",
  bio: user?.value?.bio || "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const errorMessage = reactive({
  message: "",
  name: "",
  avatar: "",
  bio: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const handleClearErrorMessages = () => {
  showErrorMessage.value = false;
  errorMessage.message = "";
  errorMessage.avatar = "";
  errorMessage.name = "";
  errorMessage.bio = "";
  errorMessage.oldPassword = "";
  errorMessage.newPassword = "";
  errorMessage.confirmNewPassword = "";
  clearError();
};

const handleFileUpdate = async (file) => {
  if (file) {
    isAvatarLoading.value = true;
    try {
      const response = await authStore.uploadAvatar({ file: file });
      updateUserData.avatar = response.path;
    } catch (error) {
      console.error(error);
    } finally {
      isAvatarLoading.value = false;
    }
  }
};

const handleSubmit = async () => {
  isUpdateLoading.value = true;
  handleClearErrorMessages();
  try {
    await authStore.update({
      name: updateUserData.name,
      avatar: updateUserData.avatar,
      bio: updateUserData.bio,
      oldPassword: updateUserData.oldPassword,
      newPassword: updateUserData.newPassword,
      confirmNewPassword: updateUserData.confirmNewPassword,
    });
    addToast("Successfully edit your profile", "success");
  } catch (error) {
    showErrorMessage.value = true;
    errorMessage.message = error.data.message || "";
    errorMessage.name = error.data.errors?.name || "";
    errorMessage.avatar = error.data.errors?.avatar || "";
    errorMessage.bio = error.data.errors?.bio || "";
    errorMessage.oldPassword = error.data.errors?.old_password || "";
    errorMessage.newPassword = error.data.errors?.new_password || "";
    errorMessage.confirmNewPassword =
      error.data.errors?.confirm_new_password || "";
    addToast("Something went wrong!", "error");
  } finally {
    isUpdateLoading.value = false;
  }
};
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-isabelline-sc;
}
</style>
