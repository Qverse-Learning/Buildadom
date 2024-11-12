import { defineStore } from "pinia";
// import { authAxios } from "src/boot/axios";
// import { Notify } from "quasar";

export const useMyAuthStore = defineStore("buildadomauth", {
  state: () => ({
    modals: false,
    userdetails: {},
    storedetails: {},
    userstores: [],
    token: "",
  }),
  getters: {
    registrationForm: (state) => state.userdetails,
  },
  persist: {
    key: "buildadomauth",
    storage: localStorage,
  },
  actions: {
    setUserDetails(response) {
      console.log(response);
      const token = response.data.data.token;
      const user = response.data.data.user;
      const stores = response.data.data.stores ? response.data.data.stores : [];
      localStorage.setItem("token", token);
      localStorage.setItem("userdet", JSON.stringify(user));
      console.log(token);
      this.userdetails = user;
      this.userstores = stores;
      this.token = token;
    },

    async logOut(userdetails) {
      console.log(userdetails);
      this.token = "";
      this.userdetails = {};
      userdetails = {};
      localStorage.setItem("token", "");
      localStorage.setItem("userdet", "");
    },
  },
});
