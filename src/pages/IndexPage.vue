<template>
  <q-page class="landingpage">
    <section class="hero q-py-xl">
      <h2 class="text-center q-mt-xl biggerText">
        <span class="yellowColor">Buildadom</span> is an ecosystem of innovative
        solutions <br />
        for the building and construction industry
      </h2>

      <p class="text-center bigMediumText q-my-lg">
        Sign up now and be among the first people to <br />
        enjoy our amazing features
      </p>

      <div
        style="gap: 1rem"
        class="q-mt-lg row justify-center container items-center no-wrap"
      >
        <q-btn
          color="primary"
          class="q-px-xl q-py-sm btns__"
          rounded
          v-if="store.userdetails.type === 'business'"
          text-color="white"
          no-caps
          no-wrap
          :to="{
            name:
              store.token && store.userdetails.type === 'business'
                ? 'all.set'
                : 'merchant.register',
          }"
        >
          {{ store.token ? "Goto dashboard" : "Sign up now" }}
        </q-btn>
        <q-btn
          v-else
          color="primary"
          class="q-px-xl q-py-sm btns__"
          rounded
          text-color="white"
          no-caps
          no-wrap
          :to="{
            name:
              store.token && store.userdetails.type === 'individual'
                ? 'dashboard'
                : 'individual.register',
          }"
        >
          {{ store.token ? "Goto dashboard" : "Sign up now" }}
        </q-btn>

        <q-btn
          @click="scrollTo"
          outline
          class="q-px-xl btns__ q-py-sm"
          no-wrap
          no-caps
          rounded
        >
          Learn more
        </q-btn>
      </div>
    </section>

    <section class="container">
      <div class="normal_grid">
        <div class="left">
          <img src="../assets/img1.png" alt="" />
        </div>

        <div class="right">
          <p class="bigMediumText">
            Join manufacturers, distributors and dealers all over the world who
            are taking advantage of digital transformation opportunities to
            change the way they do business - reach customers, sell, take,
            process and fulfill orders.
          </p>
          <div class="q-mt-lg">
            <strong class="mediumText">Shop/Stores</strong>
            <h6 class="bigText">3000+</h6>
          </div>
        </div>
      </div>
    </section>
    <section id="features" class="features container">
      <div class="responsive_grid big">
        <div>
          <img src="../assets/secured.svg" alt="" />
          <h6 class="bigMediumText q-my-sm">Secured Transactions</h6>
          <p class="mediumText">
            We sincerely care about how you make your transactions and hence
            made it easier. Payments are guaranteed through an escrow account to
            ensure that all parties are happy and satisfied.
          </p>
        </div>
        <div>
          <img src="../assets/trust.svg" alt="" />
          <h6 class="bigMediumText q-my-sm">Trust and Quality</h6>
          <p class="mediumText">
            We are on a mission to transform Africa’s building and construction
            industry, every block we lay lies on a foundation of trust. Quality
            assurance and delivery is at the heart of everything we do.
          </p>
        </div>
        <div>
          <img src="../assets/growth.svg" alt="" />
          <h6 class="bigMediumText q-my-sm">Growth</h6>
          <p class="mediumText">
            We are on a journey to grow Africa’s digital economy and we want
            your business to be part of this growth. Therefore, we would be
            continuously working hard to provide digital solutions and support
            you with tools that will enable growth.
          </p>
        </div>
      </div>
    </section>

    <section>
      <div class="sigup">
        <p
          class="biggerText text-white column justify-center items-center text-center"
        >
          Sign up now and be among the first people to <br />
          enjoy our amazing features when we launch
        </p>
        <div class="q-mt-xl row justify-center">
          <q-btn
            color="primary"
            class="q-px-xl q-py-sm"
            rounded
            text-color="white"
            no-caps
            :to="{ name: 'merchant.register' }"
            no-wrap
          >
            Sign up now
          </q-btn>
        </div>
      </div>
    </section>

    <section class="container">
      <div class="offers">
        <h4 class="text-center text-primary biggerText q-mb-xl">
          Whatever you want to achieve, our stack of solutions are designed to
          help you succeed
        </h4>
        <div class="normal_grid">
          <div class="shaded">
            <img
              style="width: 50px; height: 50px"
              src="../assets/marketplace.svg"
              alt=""
            />

            <h6 class="q-my-sm bigMediumText">Building material marketplace</h6>

            <ul class="q-mt-sm">
              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span>
                  Buildadom’s building material marketplace features the best
                  collection of products from trusted suppliers
                </span>
              </li>

              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span
                  >Building materials are sourced from a wide range of local and
                  international manufacturers, distributors and suppliers.</span
                >
              </li>
            </ul>
          </div>
          <div class="notshaded">
            <img
              style="width: 50px; height: 50px"
              src="../assets/chat.svg"
              alt=""
            />

            <h6 class="q-my-sm bigMediumText">
              Use our API to start taking orders and selling on your company’s
              website
            </h6>

            <ul class="q-mt-sm">
              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span>
                  If you already have an existing website, our software
                  engineers will help you set up an online store on your company
                  website with just a few clicks
                </span>
              </li>

              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span
                  >We can help you automate the process of taking orders from
                  your already-existing customers</span
                >
              </li>
            </ul>
          </div>
          <div class="notshaded">
            <img
              style="width: 50px; height: 50px"
              src="../assets/chat2.svg"
              alt=""
            />

            <h6 class="q-my-sm bigMediumText">
              Create and manage your digital store
            </h6>

            <ul class="q-mt-sm">
              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span>
                  Easily set up and upload an unlimited number of products to
                  your store.
                </span>
              </li>

              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span
                  >Create a shareable digital catalogue that you can share with
                  prospective customers</span
                >
              </li>
              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span
                  >Generate a customized link to your store and share it with
                  your customers</span
                >
              </li>
            </ul>
          </div>
          <div class="shaded">
            <img
              style="width: 50px; height: 50px"
              src="../assets/manage.svg"
              alt=""
            />

            <h6 class="q-my-sm bigMediumText">Manage Procurement</h6>

            <ul class="q-mt-sm">
              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span> Source from verified vendors </span>
              </li>

              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span>Keep a record of your procurement</span>
              </li>
              <li>
                <img
                  style="width: 10px; height: 10px"
                  src="../assets/dot.svg"
                  alt=""
                />
                <span>Easy tracking </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="safe_sec">
      <div class="safe container">
        <div class="normal_grid">
          <div>
            <h4 class="biggerText q-mb-md">You're In Safe Hands</h4>

            <p class="mediumText">
              Experience a 40% boost in computing from last generation. MSI
              Desktop equips the 10th Gen. Intel® Core™ i7 processor with the
              upmost computing power to bring you an unparalleled gaming
              experience.
            </p>

            <p class="mediumText q-mt-md">
              *Performance compared to i7-9700. Specs varies by model.
            </p>
          </div>

          <div>
            <img src="../assets/shield.svg" alt="" />
          </div>
        </div>
      </div>
    </section>

    <section class="sec_support">
      <div class="support container">
        <div class="normal_grid">
          <div>
            <div class="row item items-center justify-between">
              <p>Product Support</p>
              <router-link to=""
                ><i class="fa-solid fa-arrow-right"></i
              ></router-link>
            </div>

            <div class="row item items-center justify-between">
              <p>Our Policy</p>
              <router-link to=""
                ><i class="fa-solid fa-arrow-right"></i
              ></router-link>
            </div>
            <div class="row item items-center justify-between">
              <p>Our Buyer Guide</p>
              <router-link to=""
                ><i class="fa-solid fa-arrow-right"></i
              ></router-link>
            </div>
          </div>

          <div>
            <!-- <img src="../assets/support.svg" alt="" /> -->
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="faq container">
        <h4 class="biggerText text-center">FAQs</h4>

        <div class="faqs q-mt-xl">
          <ul class="accordion">
            <li v-for="(faqItem, index) in faqItems" :key="index">
              <div
                style="gap: 1rem"
                class="row justify-between faq_top items-center no-wrap"
              >
                <p @click="toggleFaqItem(index)" class="bigMediumText">
                  {{ faqItem.title }}
                </p>
                <q-btn
                  @click="toggleFaqItem(index)"
                  color="primary"
                  class="text-primary"
                  flat
                  no-caps
                >
                  <i
                    :class="
                      faqItem.open
                        ? 'fa-solid fa-chevron-down'
                        : 'fa-solid fa-chevron-right'
                    "
                  ></i>
                </q-btn>
              </div>
              <div v-if="faqItem.open" class="faqcontent">
                <p class="mediumText small q-mt-md">
                  {{ faqItem.content }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <FooterCompVue />
  </q-page>
</template>

<script setup>
// advert banners
// listing view product comp
import { ref } from "vue";
import FooterCompVue from "src/components/FooterComp.vue";
import { useMyAuthStore } from "src/stores/auth";
let store = useMyAuthStore();
const toggleFaqItem = (index) => {
  faqItems.value[index].open = !faqItems.value[index].open;
};
const faqItems = ref([
  {
    title: "How to get started?",
    content:
      "Join manufacturers all over the world and sell your product to a wider range of custormers and increase your earning rate through our mega platform  and also advertise your product to go top of the list anytime.",
    open: false,
  },
  {
    title: "How to sell on House Depot",
    content:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus ducimus vel a corrupti quia necessitatibus asperiores vero deserunt sint doloremque.",
    open: false,
  },
  {
    title: "How to apply for adverts",
    content:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus ducimus vel a corrupti quia necessitatibus asperiores  vero deserunt sint doloremque.",
    open: false,
  },
  {
    title: "What is Escrow Account",
    content:
      " Lorem, ipsum dolor sit amet consectetur adipisicing elit.  Minus ducimus vel a corrupti quia necessitatibus asperiores vero deserunt sint doloremque.",
    open: false,
  },
]);

let scrollTo = () => {
  document.getElementById("features").scrollIntoView({ behavior: "smooth" });
};
</script>
