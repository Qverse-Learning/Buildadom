v
<template>
  <div class="q-my-xl">
    <div class="container">
      <div class="row items-center search_wrap no-wrap justify-between">
        <h4 class="bigText">Shop/Store</h4>
        <form class="full-width row justify-end" @submit.prevent="searchStores">
          <div class="search_input">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search stores"
            />
            <q-btn
              type="submit"
              flat
              class="bg-primary text-white"
              rounded
              no-caps
              no-wrap
              ><i class="fa-solid fa-search"></i
            ></q-btn>
            <q-btn
              @click="reset"
              flat
              class="bg-red-7 q-ml-sm text-white"
              rounded
              v-if="searchQuery"
              no-caps
              no-wrap
              >Reset</q-btn
            >
          </div>
        </form>
      </div>

      <div>
        <!-- <div class="stores_list q-mb-xl">
          <q-item v-for="(stores, index) in categoryListArr" :key="index"
            >{{ stores.name }}
          </q-item>
        </div> -->

        <div v-if="loadingProducts" class="q-pa-md responsive_grid">
          <div v-for="n in 4" :key="n">
            <q-card flat style="max-width: 300px">
              <q-skeleton height="150px" square />

              <q-card-section>
                <q-skeleton type="text" class="text-subtitle1" />
                <q-skeleton type="text" width="50%" class="text-subtitle1" />
                <q-skeleton type="text" class="text-caption" />
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div
          v-if="!loadingProducts && filteredStores.length !== 0"
          class="stores_wrap"
        >
          <div v-for="store in filteredStores" class="" :key="store.id">
            <StoresComp :storeData="store" />
          </div>
        </div>
        <div
          v-if="!loadingProducts && filteredStores.length === 0"
          class="column items-center text-center justify-center"
        >
          <img
            style="width: 308.001px; height: 204.304px"
            src="../assets/box.png"
            alt=""
          />
          <p class="smallText q-my-lg">No Stores</p>
        </div>
      </div>
    </div>
  </div>
  <FooterCompVue />
</template>

<script setup>
import { Loading, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import FooterCompVue from "src/components/FooterComp.vue";
import { computed, onMounted, ref } from "vue";
import StoresComp from "../components/StoresComp.vue";

let loading = ref(false);
let storesArr = ref([]);
let categoryListArr = ref([]);
let searchQuery = ref("");
let loadingProducts = ref(true);

const filteredStores = computed(() => {
  let filtered = [...storesArr.value];

  // Searching
  // if (searchQuery.value.trim() !== "") {
  //   filtered = filtered.filter((store) =>
  //     store.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  //   );
  // }

  return filtered;
});

const getCategories = async () => {
  try {
    loading.value = true;
    let prodCatList = await authAxios.get("product/category/list");

    categoryListArr.value = prodCatList.data.data;
    // console.log(categoryListArr.value);
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};
const searchStores = async () => {
  try {
    loadingProducts.value = true;
    Loading.show({ message: "Searching" });
    let prodList = await authAxios.get(
      `store/search?query=${searchQuery.value}`
    );
    console.log(prodList);
    storesArr.value = prodList.data.data;
    loadingProducts.value = false;
    Loading.hide();
  } catch (error) {
    console.error(error);
    Loading.hide();
  }
};
const reset = async () => {
  searchQuery.value = "";
  getStores();
};
const getStores = () => {
  authAxios
    .get("store/list")
    .then((response) => {
      console.log(response);
      loading.value = false;
      storesArr.value = response?.data?.data;
      loadingProducts.value = false;
    })
    .catch(({ response }) => {
      // console.log(response);
      loading.value = false;
      Notify.create({
        message: response.data.error,
        color: "red",
        position: "bottom",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};
onMounted(() => {
  getStores();
  getCategories();
});
</script>

<style lang="scss" scoped></style>
