import { boot } from "quasar/wrappers";
import axios from "axios";
import { Notify } from "quasar";
import loadStore from "stores/loader";

const authAxios = axios.create({
  baseURL: "https://dev.buildadom.net/api/v1",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Credentials": "true",
  },
});

export default boot(({ app, store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file
  app.config.globalProperties.$authAxios = authAxios;

  app.config.globalProperties.$store = loadStore;

  let auth = store.state.value.buildadomauth;
  // console.log(auth);
  authAxios.interceptors.response.use(function (response) {
    if (response.data && response.data.token) {
      token = response.data.token;
    }

    return response;
  });
  authAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    (e) => {
      console.log(e);
      let status_code = !e.response || e.response.status;
      if (e.message === "Network Error") {
        Notify.create({
          message: e.message ? e.message : "Network error",
          color: "red",
          position: "top",
        });
      } else if (status_code === 401) {
        console.log(status_code);
        Notify.create({
          message: e.response.data.message
            ? e.response.data.message
            : "You need to login",
          color: "red",
          position: "top",
        });
        store.state.value.buildadomauth.previousRoute =
          router.currentRoute.value.name;
        return router.replace({ name: "logout" });
      } else if (status_code === 406) {
        Notify.create({
          message: e.response.data.message
            ? e.response.data.message
            : "An error occured",
          color: "red",
          position: "top",
        });
        // store.state.value.buildadom.previousRoute =
        //   router.currentRoute.value.name;
        // return router.replace({ name: "logout" });
      } else if (status_code === 403) {
        console.log(status_code);
        Notify.create({
          message: e.response.data.message
            ? e.response.data.message
            : "Invalid",
          color: "red",
          position: "top",
        });
      } else if (e.response.data.message === "Unauthorized User") {
        Notify.create({
          message: e.response.data.message,
          color: "red",
        });
        return router.replace({ name: "logout" });
      } else if (e.message === "Network Error") {
        Notify.create({
          message: e.message + " check your internet connection",
          color: "red",
        });
      } else if (e.message === "timeout exceeded") {
        Notify.create({
          message: e.message + " check your internet connection",
          color: "red",
        });
      } else if (status_code === 500) {
        if (typeof e.response.data.message !== "string") {
          return;
        } else {
          Notify.create({
            message: e.response.data.message
              ? e.response.data.message
              : "This is not your fault, we have been notified and is currently fixing any issues.",
            position: "top",
            color: "red",
          });
        }
      } else if (status_code === 404) {
        console.log(404);
        Notify.create({
          message: e.response.data.message
            ? e.response.data.message
            : "This is not your fault, we have been notified and is currently fixing any issues.",
          position: "top",
          color: "red",
        });
      } else {
        return Promise.reject(e);
      }
    }
  );

  authAxios.interceptors.request.use(function (config) {
    if (auth.token) {
      config.headers.Authorization = "Bearer " + auth.token;
    }
    return config;
  });
  router.beforeEach((to, from, next) => {
    const store = app.config.globalProperties.$store;
    // console.log(store);

    if (store.buildadomauth.token) {
      authAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${store.buildadomauth.token}`;
    }
    if (to.name === "logout") {
      // console.log(store.buildadom);
      // console.log(store.buildadom.token);
      // console.log(store.buildadom.userdetails);
      // console.log(store.buildadom.userdetails.type);
      if (to.query.redirect && to.name !== "account.dashboard") {
        console.log("there");
        if (store.buildadomauth.userdetails.type === "business") {
          router.replace({
            name: "merchant.login",
          });
        } else if (to.query.redirect === "dashboard") {
          router.replace({
            name: "customer.login",
          });
        } else {
          router.replace({
            name: to.query.redirect,
          });
        }
        // router.replace({
        //   name:
        //     store.buildadomauth.userdetails.type === "business"
        //       ? "merchant.login"
        //       : to.query.redirect,
        // });
        store.buildadomauth.token = "";
        store.buildadomauth.userdetails = {};
        store.buildadomauth.storedetails = {};
        store.buildadomauth.userstores = [];
      } else {
        console.log("here");
        console.log(store.buildadomauth.userdetails.type);
        router.replace({
          name:
            store.buildadomauth.userdetails.type === "business"
              ? "merchant.login"
              : "customer.login",
        });
        store.buildadomauth.token = "";
        store.buildadomauth.userdetails = {};
        store.buildadomauth.storedetails = {};
        store.buildadomauth.userstores = [];
      }

      // console.log(store.buildadom.userdetails.type);
      // next();
    }

    next();
  });
});

export { axios, authAxios };
