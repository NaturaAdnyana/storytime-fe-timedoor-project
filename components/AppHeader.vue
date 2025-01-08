<template>
  <header
    class="bg-white/80 backdrop-blur-lg fixed inset-x-0 top-0 z-20 shadow-md"
  >
    <nav
      class="mx-auto flex items-center justify-between p-4 lg:px-[110px]"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Storytime</span>
          <img class="h-8 w-auto" src="/logos/logo.png" alt="Storytime Logo" />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-quartz"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <div
        class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4"
        v-if="!user"
      >
        <BaseLink to="/register" class="btn-outline">Register</BaseLink>
        <BaseLink to="/login" class="btn-solid">Log in</BaseLink>
      </div>
      <div class="hidden lg:flex p-1 rounded-lg" v-else>
        <HeadlessMenu as="div" class="relative">
          <div class="flex items-center">
            <HeadlessMenuButton
              class="group inline-flex items-center rounded-md text-base font-medium focus:outline-none hover:text-gray-asparagus-tr"
            >
              <NuxtImg
                :src="user.avatar || '/images/avatar.png'"
                class="w-8 h-8 aspect-square mr-2 ring-1 ring-gray-200 rounded-full bg-gray-100"
              />

              <span>{{ user.username }}</span>
              <ChevronDownIcon
                class="ml-2 h-5 w-5 transition duration-150 ease-in-out"
                aria-hidden="true"
              />
            </HeadlessMenuButton>
          </div>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <HeadlessMenuItems
              class="absolute divide-y w-40 top-12 right-0 z-10 transform sm:px-0 lg:max-w-3xl bg-white text-normal font-medium text-quartz overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5"
            >
              <div class="p-2">
                <HeadlessMenuItem v-slot="{ close }">
                  <button class="w-full">
                    <NuxtLink
                      @click="close"
                      to="/profile"
                      class="block rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-asparagus-tr"
                    >
                      <span class="flex items-center">
                        <span> Profile </span>
                      </span>
                    </NuxtLink>
                  </button>
                </HeadlessMenuItem>
              </div>

              <div class="p-2">
                <HeadlessMenuItem v-slot="{ active }">
                  <button
                    @click="handleLogout"
                    :disabled="isLoading"
                    class="block w-full rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-asparagus-tr disabled:opacity-90 disabled:cursor-not-allowed"
                  >
                    <span v-if="isLoading" class="flex items-center gap-2">
                      <div class="loader animate-spin"></div>
                      Loading...
                    </span>
                    <span v-else class="flex items-center">
                      <span class=""> Logout </span>
                    </span>
                  </button>
                </HeadlessMenuItem>
              </div>
            </HeadlessMenuItems>
          </transition>
        </HeadlessMenu>
      </div>
    </nav>
    <HeadlessDialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-50" />
      <HeadlessDialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Storytime</span>
            <img
              class="h-8 w-auto"
              src="/logos/logo.png"
              alt="Storytime logo"
            />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="py-6" v-if="!user.username">
              <NuxtLink
                to="/register"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >Register</NuxtLink
              >
              <NuxtLink
                to="/login"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >Log in</NuxtLink
              >
            </div>
            <div class="py-6" v-else>
              <NuxtLink
                to="/profile"
                class="block rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-asparagus-tr"
              >
                <span class="flex items-center">
                  <span> Profile </span>
                </span>
              </NuxtLink>
              <hr class="my-2" />
              <button
                @click="handleLogout"
                :disabled="isLoading"
                class="block w-full rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-asparagus-tr disabled:opacity-90 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading" class="flex items-center gap-2">
                  <div class="loader animate-spin"></div>
                  Loading...
                </span>
                <span v-else class="flex items-center">
                  <span class=""> Logout </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </HeadlessDialogPanel>
    </HeadlessDialog>
  </header>
</template>

<script setup>
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();

const mobileMenuOpen = ref(false);

const isLoading = ref(false);

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);

const handleLogout = async () => {
  isLoading.value = true;
  try {
    await authStore.logout();
    router.push({ path: "/login" });
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* .router-link-exact-active {
  color: red;
} */
</style>
