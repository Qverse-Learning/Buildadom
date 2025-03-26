<template>
  <div>
    <div class="product_card">
      <router-link
        :to="{
          name:
            store.userdetails.type === 'business' &&
            route.name === 'account.dashboard'
              ? 'product.detail'
              : 'user.product.detail',
          // query: {
          //   id: product.id,
          // },
          query: {
            name: product.name,
            id: product.id,
          },
        }"
      >
        <img
          :src="
            product?.images ? product?.images[0]?.url : '/images/man_smile.png'
          "
          alt=""
        />
      </router-link>
      <div style="gap: 0.5rem" class="row justify-end items-center no-wrap">
        <q-btn
          no-caps
          class="addtocart"
          no-wrap
          v-if="store.userdetails.type !== 'business'"
          @click="cartStore.addTocart(product)"
          color="primary"
          >Add to cart <i class="fa-solid q-ml-sm fa-cart-shopping"></i
        ></q-btn>
        <!-- <q-btn flat><i class="fa-regular fa-heart"></i></q-btn> -->
        <!-- @click="handleBtnClicked" -->
        <!-- {{ product.store }} -->
        <q-btn
          v-if="
            store.storedetails.id === product.store.id &&
            route.name === 'account.dashboard'
          "
          :to="{
            name: 'product.detail',
            query: {
              id: product.id,
            },
          }"
          flat
          ><i class="fa-solid fa-pen-to-square"></i
        ></q-btn>
      </div>
      <h6 class="mediumText text-primary">
        <router-link
          :to="{
            name:
              store.userdetails.type === 'business' &&
              route.name === 'account.dashboard'
                ? 'product.detail'
                : 'user.product.detail',
            // query: {
            //   id: product.id,
            // },
            query: {
              name: product.name,
              id: product.id,
            },
          }"
          >{{ product.name }}</router-link
        >
      </h6>
      <p class="smallText q-my-sm">
        {{ product?.description?.slice(0, 50) + "..." }}
      </p>

      <p class="bigMediumText">
        {{ product?.currency?.code }} {{ product.price.toLocaleString() }}
        <small>per {{ product?.unit?.name }}</small>
      </p>

      <p class="smallText q-my-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        {{ product?.store?.address }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useMyAuthStore } from "src/stores/auth";
import { useCartStore } from "src/stores/cart";
import { useRoute } from "vue-router";
import img from "../assets/man_smile.png";
let route = useRoute();
let store = useMyAuthStore();
let cartStore = useCartStore();
let props = defineProps({
  product: Object,
});

const emit = defineEmits(["editProduct"]);

const handleBtnClicked = () => {
  emit("editProduct", props.product);
};
</script>

<style lang="scss" scoped></style>
