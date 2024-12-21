<template>
  <section class="bg-isabelline-sc px-20 lg:px-[110px] py-10">
    <div class="flex justify-center flex-wrap gap-y-10">
      <div class="flex-1 basis-full md:basis-2/12">
        <NuxtImg
          class="mx-auto"
          src="https://avatar.iran.liara.run/public/35"
          alt=""
        />
      </div>
      <div class="flex-1 basis-8/12 flex flex-col justify-center md:px-10">
        <h1 class="font-dm-sans text-2xl mb-1">Iswara</h1>
        <p class="mb-4">dewiratnaiswara99@gmail.com</p>
        <p>
          Avid reader and aspiring writer. Lover of mysteries, thrillers, and
          sci-fi. Coffee enthusiast and nature explorer. Always on the lookout
          for new stories and adventures.
        </p>
      </div>
      <div class="flex-1 basis-2/12 flex items-center">
        <button class="btn btn-solid">Edit Profile</button>
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
</template>

<script setup></script>

<style scoped>
.router-link-exact-active {
  @apply bg-isabelline-sc;
}
</style>
