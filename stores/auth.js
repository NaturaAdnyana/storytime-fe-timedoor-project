export const useAuthStore = defineStore("authStore", {
  state: () => ({
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
  }),
  actions: {
    async fetch() {
      // const infos = await $fetch("https://api.nuxt.com/modules/pinia");

      const data = {
        username: "Iswara",
        email: "dewiratnaiswara99@gmail.com",
        imageUrl:
          "https://d22gwcrfo2de51.cloudfront.net/wp-content/uploads/2022/07/BUDI_ARIE_SETIADI_DI_ISTANA_NEGARA_2.jpg",
        bio: "Avid reader and aspiring writer. Lover of mysteries, thrillers, and sci-fi. Coffee enthusiast and nature explorer. Always on the lookout for new stories and adventures.",
      };

      this.username = data.username;
      this.email = data.email;
      this.imageUrl = data.imageUrl;
      this.bio = data.bio;
    },
  },
  getters: {
    // getDetails() {
    //   return this.details;
    // },
    // getFavorite() {
    //   return this.details.find((detail) => detail.name === "Pinia");
    // },
  },
});
