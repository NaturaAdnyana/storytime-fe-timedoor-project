<template>
  <section class="bg-isabelline-sc px-20 lg:px-[110px] py-10">
    <div class="flex justify-center flex-wrap gap-y-10">
      <div class="flex-1 basis-full md:basis-2/12 aspect-square p-5">
        <NuxtImg
          class="mx-auto w-full h-full object-cover rounded-full bg-gray-100 ring-1 ring-gray-200"
          :src="user.avatar || '/images/avatar.png'"
          alt="My Profile Picture"
          format="webp"
        />
      </div>
      <div class="flex-1 md:basis-8/12 flex flex-col justify-center md:px-10">
        <h1 class="font-dm-sans text-2xl mb-1">{{ user.username }}</h1>
        <p class="mb-4">{{ user.email }}</p>
        <p>
          {{ user.bio }}
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
          <button class="btn btn-solid">Write Story</button>
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
                    <BaseProfileImgInput
                      id="profile-image"
                      name="profile-image"
                      :imageUrl="updateUserData.avatar"
                      @update:file="handleFileUpdate"
                      :isLoading="isLoading"
                    />
                    <BaseInput
                      type="text"
                      id="name"
                      label="Name"
                      placeholder="Your Name"
                      v-model="updateUserData.name"
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
                    />
                    <BaseInput
                      type="password"
                      id="new-password"
                      label="New Password"
                      placeholder="Enter your new password"
                      v-model="updateUserData.newPassword"
                    />
                    <BaseInput
                      type="password"
                      id="confirm-password"
                      label="Confirm New Password"
                      placeholder="Re-enter your new password"
                      v-model="updateUserData.confirmNewPassword"
                    />
                  </div>
                  <div class="basis-full px-0 md:px-5 pt-5 space-x-5">
                    <button @click="toggleModal" class="btn btn-outline">
                      Cancel
                    </button>
                    <button type="submit" class="btn btn-solid">
                      Update Profile
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
definePageMeta({ scrollToTop: false });
const isOpen = ref(false);
const isLoading = ref(false);

const toggleModal = () => {
  isOpen.value = !isOpen.value;
};

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const updateUserData = reactive({
  name: user.value.name,
  username: user.value.username,
  email: user.value.email,
  avatar: user.value.avatar,
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const handleFileUpdate = async (file) => {
  if (file) {
    isLoading.value = true;
    try {
      const response = await authStore.uploadAvatar({ file: file });
      updateUserData.avatar = response.url;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
};

const handleSubmit = () => {
  console.log("Profile updated", updateUserData);
};
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-isabelline-sc;
}
</style>
