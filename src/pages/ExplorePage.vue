v
<template>
  <div class="q-mt-xl">
    <div class="container">
      <div class="row items-center no-wrap justify-between">
        <h4 class="bigText q-pa-sm q-mb-md"></h4>
        <form
          class="full-width row justify-end"
          @submit.prevent="searchProducts"
        >
          <div class="search_input">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products"
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

      <div class="q-mt-lg">
        <div class="explore_wrapper">
          <div class="left">
            <div class="row items-center no-wrap">
              <h4 class="bigText q-pa-sm q-mb-md">Market Place</h4>
            </div>
            <div class="explore_categories">
              <div class="row q-mb-md items-center justify-between">
                <h6 class="text-h6 text-weight-bold">Category</h6>

                <q-btn
                  @click="getProducts"
                  :to="{
                    name: 'explore',
                    params: {
                      id: 'all',
                    },
                  }"
                  color="primary"
                  no-caps
                  no-wrap
                  >All</q-btn
                >
              </div>
              <!-- {{ categoryListArr }} -->
              <div class="q-mt-md" v-if="loading">
                <q-skeleton height="100px" />
              </div>
              <q-list v-else>
                <q-item
                  clickable
                  v-for="(cat, index) in categoryListArr"
                  :key="index"
                  :to="{
                    name: 'explore',
                    params: {
                      id: cat.id,
                    },
                    query: {
                      name: cat.name,
                    },
                  }"
                >
                  {{ cat.name }}
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="q-pb-lg">
            <div
              style="gap: 1rem"
              class="row items-center justify-between no-wrap"
            >
              <div style="gap: 1rem" class="row items-center no-wrap">
                <q-btn
                  class="expand_cats"
                  dense
                  round
                  unelevated
                  color="accent"
                  icon="chevron_right"
                  @click="drawer = !drawer"
                />
                <q-btn-dropdown outline label="Sort by">
                  <q-list>
                    <q-item
                      :class="
                        selectedSort === 'name' ? 'bg-primary text-white' : ''
                      "
                      clickable
                      v-close-popup
                      @click="setSortParam('name')"
                    >
                      <q-item-section>
                        <q-item-label>Name</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      :class="
                        selectedSort === 'price' ? 'bg-primary text-white' : ''
                      "
                      clickable
                      v-close-popup
                      @click="setSortParam('price')"
                    >
                      <q-item-section>
                        <q-item-label>Price</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item
                      :class="
                        selectedSort === 'date' ? 'bg-primary text-white' : ''
                      "
                      clickable
                      v-close-popup
                      @click="setSortParam('date')"
                    >
                      <q-item-section>
                        <q-item-label>Date</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
              <form @submit.prevent="filterByPrice">
                <div style="gap: 1rem" class="filter row items-center no-wrap">
                  <div class="grid">
                    <div class="input_wrap">
                      <label for="min-price">Min Price:</label>
                      <div class="input">
                        <input
                          type="text"
                          v-model="minPrice"
                          placeholder="Enter min price"
                        />
                      </div>
                    </div>
                    <div class="input_wrap">
                      <label for="max-price">Max Price:</label>
                      <div class="input">
                        <input
                          type="text"
                          v-model="maxPrice"
                          placeholder="Enter max price"
                        />
                      </div>
                    </div>
                  </div>

                  <div style="gap: 1rem" class="column items-center">
                    <q-btn
                      :disable="minPrice === '' && maxPrice === ''"
                      no-wrap
                      no-caps
                      type="submit"
                      color="primary"
                    >
                      Apply
                    </q-btn>
                    <q-btn
                      @click="reset"
                      flat
                      class="bg-red-7 text-white"
                      rounded
                      v-if="minPrice && maxPrice"
                      no-caps
                      no-wrap
                      >Reset</q-btn
                    >
                  </div>
                </div>
              </form>
            </div>
            <div class="q-pa-md responsive_grid">
              <div v-for="n in 4" :key="n">
                <q-card v-if="loadingProducts" flat style="max-width: 300px">
                  <q-skeleton height="150px" square />

                  <q-card-section>
                    <q-skeleton type="text" class="text-subtitle1" />
                    <q-skeleton
                      type="text"
                      width="50%"
                      class="text-subtitle1"
                    />
                    <q-skeleton type="text" class="text-caption" />
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div
              v-if="!loadingProducts && filteredProducts.length !== 0"
              class="responsive_grid"
            >
              <div v-for="product in filteredProducts" :key="product.id">
                <ProductsComp :product="product" />
              </div>
            </div>
            <div
              v-if="!loadingProducts && filteredProducts.length === 0"
              class="column items-center text-center justify-center"
            >
              <img
                style="width: 308.001px; height: 204.304px"
                src="../assets/box.png"
                alt=""
              />
              <p class="smallText q-my-lg">No products</p>
            </div>
          </div>
          <!-- <div class="stores_wrap">
            <div v-for="n in 10" class="" :key="n">
              <ProductsComp />
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <FooterCompVue />
  <q-drawer
    v-model="drawer"
    @click.capture="drawer = !drawer"
    :width="250"
    :breakpoint="800"
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <div class="explore_categories">
        <div class="row q-mb-md items-center justify-between">
          <h6 class="text-h5 text-weight-bold q-mb-md">Category</h6>
          <q-btn
            @click="getProducts"
            :to="{
              name: 'explore',
              params: {
                id: 'all',
              },
            }"
            color="primary"
            no-caps
            no-wrap
            >All</q-btn
          >
        </div>
        <div class="q-mt-md" v-if="loading">
          <q-skeleton height="100px" />
        </div>
        <q-list v-else>
          <q-item
            clickable
            v-for="(cat, index) in categoryListArr"
            :key="index"
            :to="{
              name: 'explore',
              params: {
                id: cat.id,
              },
              query: {
                name: cat.name,
              },
            }"
          >
            {{ cat.name }}
          </q-item>
        </q-list>
      </div>
    </q-scroll-area>

    <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
  </q-drawer>
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import { computed, onMounted, ref, watch } from "vue";
import ProductsComp from "../components/ProductsComp.vue";
import FooterCompVue from "src/components/FooterComp.vue";
import { useRoute, useRouter } from "vue-router";
import { Loading } from "quasar";
const route = useRoute();
let loadingProducts = ref(true);
let loading = ref(true);
let prodListArr = ref([]);
let categoryListArr = ref([]);
const selectedSort = ref("name");
const searchQuery = ref("");
const drawer = ref(false);
const minPrice = ref("");
const maxPrice = ref("");
// const routeParams = ref(route.params);
watch(
  () => route.params.id,
  (newParams, oldParams) => {
    console.log("params");
    console.log(newParams);
    console.log(oldParams);
    if (newParams !== oldParams) {
      getProductsByCategories(newParams);
    } else {
      return;
    }
  }
);

const filteredProducts = computed(() => {
  let filtered = [...prodListArr.value];

  // Sorting
  if (selectedSort.value === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort.value === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort.value === "date") {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Searching
  // if (searchQuery.value.trim() !== "") {
  //   filtered = filtered.filter((product) =>
  //     product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  //   );
  // }

  return filtered;
});
const setSortParam = (sortParam) => {
  selectedSort.value = sortParam;
};
const getProducts = async () => {
  try {
    loadingProducts.value = true;
    let prodList = await authAxios.get("product/list");
    console.log(prodList);
    prodListArr.value = prodList.data.data;
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
};
const filterByPrice = async () => {
  try {
    loadingProducts.value = true;
    let prodList = await authAxios.get(
      `product/filter?min_price=${minPrice.value}&max_price=${maxPrice.value}`
    );
    console.log(prodList);
    prodListArr.value = prodList.data.data;
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
};
const getProductsByCategories = async (id) => {
  try {
    loadingProducts.value = true;
    let prodList = await authAxios.get(`product/filter?product_category=${id}`);
    console.log(prodList);
    prodListArr.value = prodList.data.data;
    loadingProducts.value = false;
  } catch (error) {
    console.error(error);
  }
};
const reset = async () => {
  searchQuery.value = "";
  minPrice.value = "";
  maxPrice.value = "";
  getProducts();
};
const searchProducts = async () => {
  try {
    loadingProducts.value = true;
    Loading.show({ message: "Searching" });
    let prodList = await authAxios.get(
      `product/search?query=${searchQuery.value}`
    );
    console.log(prodList);
    prodListArr.value = prodList.data.data;
    loadingProducts.value = false;
    Loading.hide();
  } catch (error) {
    console.error(error);
    Loading.hide();
  }
};
const getCategories = async () => {
  try {
    loading.value = true;
    let prodCatList = await authAxios.get("product/category/list");
    console.log(prodCatList);
    categoryListArr.value = prodCatList.data.data;
    // console.log(categoryListArr.value);
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getCategories();
  getProducts();
});
</script>

<style lang="scss" scoped>
@media (max-width: 1200px) {
  .responsive_grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
}
@media (max-width: 800px) {
  .row.items-center.justify-between.no-wrap {
    flex-wrap: wrap;

    .grid {
      gap: 1rem;
    }
  }
}
</style>
