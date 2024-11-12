<template>
  <div>
    <div style="max-width: 700px" class="small_container q-py-xl">
      <div class="frame row justify-center">
        <img
          style="width: 40px; height: 40px"
          src="../../assets/frame.png"
          alt=""
        />
      </div>

      <h4 class="biggerText text-center">Hello Admin, Welcome Back</h4>

      <div class="auth">
        <form @submit.prevent="submitForm">
          <div class="input_wrap">
            <label for="">Email<span>*</span></label>
            <div class="input">
              <input
                v-model="data.email"
                placeholder="Enter email address"
                required
                name="email"
                type="email"
              />
            </div>
            <small v-if="errors.email" class="text-red text-weight-bold">
              {{ errors.email[0] }}
            </small>
          </div>

          <div class="password">
            <div class="input_wrap">
              <label for=""> Password<span>*</span></label>
              <div class="input row items-center no-wrap justify-between">
                <input
                  v-model="data.password"
                  required
                  placeholder="*********"
                  :type="!viewConfirmPassword ? 'password' : 'text'"
                />
                <q-btn
                  @click="viewConfirmPassword = !viewConfirmPassword"
                  flat
                  icon="visibility"
                >
                </q-btn>
              </div>

              <small v-if="errors.password" class="text-red text-weight-bold">
                {{ errors.password[0] }}
              </small>
            </div>
          </div>

          <div class="row justify-end q-mt-lg">
            <q-btn
              style="width: 100%"
              color="primary"
              rounded
              class="q-pa-md"
              no-wrap
              no-caps
              :loading="loading"
              type="submit"
            >
              Submit
            </q-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
  <FooterCompVue />
</template>

<script setup>
import FooterCompVue from "src/components/FooterComp.vue";
import { Dialog, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { ref } from "vue";
import { useMyAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";
let router = useRouter();
let data = ref({});
let errors = ref({});
let verifyModal = ref(false);
let verifyEmailModal = ref(false);
let code = ref("");
const bindModal = ref("");
const bindEmailModal = ref("");
const resending = ref(false);
const viewConfirmPassword = ref(false);
const loading = ref(false);
let store = useMyAuthStore();

const submitForm = () => {
  let newData = {
    ...data.value,
  };
  console.log(newData);
  loading.value = true;
  authAxios
    .post("auth/login", newData)
    .then((response) => {
      console.log(response);
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });

      data.value = {};
      store.setUserDetails(response);
      router.replace({
        name: "admin.list.merchants",
      });
    })
    .catch(({ response }) => {
      console.log(response);
      loading.value = false;
      errors.value = response.data.errors || {};
      Notify.create({
        message: response.data.message
          ? response.data.message
          : "Recheck your credentials",
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
</script>

<style lang="scss" scoped>
.small_container {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 2rem;
  border-radius: 10px;
  margin: 3rem auto;
}

@media (max-width: 700px) {
  .small_container {
    padding: 1rem;
  }
}
</style>
