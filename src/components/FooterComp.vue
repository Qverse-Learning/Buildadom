<template>
  <footer class="footer">
    <div class="container">
      <div class="footer_wrap responsive_grid">
        <div>
          <div class="logo">
            <img src="../assets/logo2.svg" alt="" />
          </div>

          <div class="icons q-mt-md">
            <div style="gap: 1rem" class="row items-center no-wrap">
              <a
                class="text-white"
                target="_blank"
                href="https://m.facebook.com/p/Buildadom-100069804551217/"
                ><i class="fa-brands text-white fa-facebook"></i
              ></a>
              <a
                class="text-white"
                target="_blank"
                href="https://www.instagram.com/buildadom/"
                ><i class="fa-brands text-white fa-instagram"></i
              ></a>
            </div>
          </div>
          <!-- <h6 class="text1 q-mt-md">Sign Up To Our Newsletter.</h6>
          <p class="q-my-md smallText">
            Be the first to hear about the latest offers.
          </p>

          <div class="q-mt-md">
            <form style="gap: 1rem" class="row items-center no-wrap">
              <input type="text" placeholder="Your Email" />

              <q-btn
                color="primary"
                class="q-px-xl q-py-sm"
                rounded
                text-color="white"
                no-caps
                no-wrap
                type="submit"
              >
                Subscribe
              </q-btn>
            </form>
          </div> -->
        </div>
        <div>
          <h6 class="footer_head">Information</h6>

          <ul>
            <!-- <li>
              <router-link to="">About Us</router-link>
            </li> -->
            <li>
              <router-link to="">Privacy Policy</router-link>
            </li>
            <li>
              <router-link to="">Orders and Returns</router-link>
            </li>
            <li>
              <router-link to="">Contact Us</router-link>
            </li>
          </ul>
        </div>
        <div>
          <h6 class="footer_head">Address</h6>
          <ul>
            <li>Address: No. 56 Coal City Garden Estate, Enugu.</li>
            <li>
              Phones:
              <a href="tel:+2347044914032" class="text-primary">07044914032</a>
            </li>
            <li>We are open: Monday-Sunday: 9:00 AM - 5:30 PM</li>
            <li>Friday: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 11:00 AM - 5:00 PM</li>
            <li>
              Email: <a href="" class="text-primary">buildadom@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row footer_down container items-center justify-between">
      <div style="gap: 1rem" class="row items-center no-wrap">
        <a href=""
          ><img
            style="width: 33.314px; height: 21.957px"
            src="/images/paypall.svg"
            alt=""
        /></a>
        <a href=""
          ><img
            style="width: 33.314px; height: 21.957px"
            src="/images/visa.svg"
            alt=""
        /></a>
        <a href=""
          ><img
            style="width: 33.314px; height: 21.957px"
            src="/images/mastercard.svg"
            alt=""
        /></a>
        <a href=""
          ><img
            style="width: 33.314px; height: 21.957px"
            src="/images/discover.svg"
            alt=""
        /></a>
        <a href=""
          ><img
            style="width: 33.314px; height: 21.957px"
            src="/images/aexpress.svg"
            alt=""
        /></a>
      </div>

      <div>
        <p>Copyright © {{ new Date().getFullYear() }} Buildadom.</p>
      </div>
    </div>
    <div class="fixed_mvr">
      <div class="vr_btn_hold">
        <a
          href="mailto:hello@buildadom.com"
          target="_blank"
          class="animated-button1"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          <i class="fa-solid fa-envelope"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.fixed_mvr {
  position: fixed;
  bottom: 12%;
  z-index: 10000;
  right: 3%;
  background: #254594;
  width: 50px;
  height: 50px;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}

.fixed_mvr i {
  font-size: 2rem;
  color: #fff;
}
</style>
