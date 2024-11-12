<template>
  <q-layout class="side_" view="hHh lpR fFf">
    <q-header class="header bg-white">
      <div class="">
        <div class="top_nav">
          <div class="container">
            <div class="left">Mon-Sat : <span>9:00am - 5:00pm</span></div>
            <div style="gap: 0.5rem" class="middle row items-center no-wrap">
              <p>For advert placements & store features on Buildadom</p>
              <router-link to="">Contact Us</router-link>
            </div>
            <div class="right">
              <p>
                <span
                  >Call Us:
                  <a
                    target="_blank"
                    href="tel:+2347044914032"
                    class="text-white"
                    >07044914032</a
                  >
                </span>
              </p>
              <div style="gap: 1rem" class="row items-center no-wrap">
                <a
                  target="_blank"
                  href="https://m.facebook.com/p/Buildadom-100069804551217/"
                >
                  <i class="fa-brands fa-facebook"></i
                ></a>
                <a target="_blank" href="https://www.instagram.com/buildadom/">
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="down_nav">
          <div class="container">
            <div class="logo">
              <router-link :to="{ name: 'home' }">
                <img src="/images/logo.svg" alt="" />
              </router-link>
            </div>
            <nav class="nav_items_">
              <ul>
                <li class="navLinks">
                  <router-link :to="{ name: 'stores' }">All Stores</router-link>
                </li>
                <!-- <li class="navLinks">
                  <router-link to="">Merchant</router-link>
                </li> -->
                <!-- <li class="navLinks">
                  <router-link to="">Categories</router-link>
                </li> -->
                <li class="navLinks">
                  <router-link
                    :to="{
                      name: 'explore',
                      params: {
                        id: 'all',
                      },
                    }"
                    >All Products</router-link
                  >
                </li>
                <!-- <li class="navLinks">
                  <router-link :to="{ name: 'logistics.onboard' }"
                    >Logistics</router-link
                  >
                </li> -->
                <!-- <li class="navLinks">
                  <router-link to="">Services</router-link>
                </li> -->
              </ul>
            </nav>

            <div style="gap: 0.5rem" class="row items-center no-wrap">
              <q-btn :to="{ name: 'cart' }" flat>
                <i class="fa-solid text-black fa-cart-shopping"></i>
                <q-badge color="red" floating>{{
                  cartStore.cart.length
                }}</q-badge>
              </q-btn>

              <q-btn v-if="store.token" flat>
                <img
                  style="width: 36px; height: 36px; border-radius: 100%"
                  src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                  alt=""
                />
                <q-menu class="q-pa-md">
                  <div class="column items-center">
                    <q-avatar size="72px">
                      <img
                        src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                      />
                    </q-avatar>

                    <div
                      style="white-space: nowrap"
                      class="text-subtitle1 name_text q-mt-md q-mb-xs"
                    >
                      {{
                        store.storedetails.name
                          ? store.storedetails.name
                          : store.userdetails.name
                      }}
                    </div>
                    <q-btn
                      color="green-7"
                      label="View Dashboard"
                      :to="{
                        name:
                          store.userdetails.type === 'business'
                            ? 'all.set'
                            : 'dashboard',
                      }"
                      push
                      no-caps
                      no-wrap
                      size="sm"
                      v-close-popup
                    />
                    <q-btn
                      color="primary"
                      label="Logout"
                      class="q-mt-sm"
                      push
                      :to="{
                        name: 'logout',
                        query: {
                          redirect: route.name,
                        },
                      }"
                      size="sm"
                      v-close-popup
                    />
                  </div>
                </q-menu>
              </q-btn>

              <q-btn
                v-if="!store.token"
                :to="{
                  name: 'merchant.register',
                }"
                color="primary"
                no-caps
                no-wrap
                rounded
                label="Sign in"
              />
              <q-btn @click="drawer = !drawer" class="expand_cats" flat>
                <i class="fa-solid text-black fa-bars"></i>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-header>

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
          <h6 class="text-h5 text-weight-bold q-mb-md">Navigation</h6>

          <q-list>
            <q-item :to="{ name: 'stores' }" clickable> Stores </q-item>
            <q-item
              :to="{
                name: 'explore',
                params: {
                  id: 'all',
                },
              }"
              clickable
            >
              Explore
            </q-item>
            <q-item :to="{ name: 'merchant.register' }" clickable>
              Register
            </q-item>
            <!-- <q-item :to="{ name: 'logistics.onboard' }" clickable>
              Logistics
            </q-item> -->
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useMyAuthStore } from "src/stores/auth";
import { useRoute } from "vue-router";
import { useCartStore } from "src/stores/cart";
let store = useMyAuthStore();
let route = useRoute();
let cartStore = useCartStore();
let leftDrawerOpen = ref(true);
let drawer = ref(false);
</script>
