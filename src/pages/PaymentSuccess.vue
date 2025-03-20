<template>
  <q-page>
    <div class="tr container">
      <section class="section getstarted">
        <div class="login">
          <div class="login_wrapper">
            <div class="right">
              <div class="sign column text-center items-center">
                <img
                  style="width: 166px; height: 166px"
                  src="/images/ordersuccess.png"
                  alt=""
                />
                <div class="head text-h4 text-weight-bold text-center q-my-md">
                  Payment Completed!
                </div>
                <p
                  style="max-width: 700px; margin: 0 auto"
                  class="text-left q-pa-sm"
                >
                  🎉 <strong>Congratulations!</strong> Your payment has been
                  successfully processed. <br />

                  Thank you for your purchase! Your order is being processed,
                  and you will receive an email confirmation shortly. <br />

                  If you have any questions or need further assistance, feel
                  free to contact our support team. <br />

                  Happy shopping!
                </p>
                <q-btn
                  color="primary"
                  class="q-px-xl q-py-sm btns__"
                  rounded
                  text-color="white"
                  no-caps
                  no-wrap
                  :to="{ name: 'dashboard' }"
                >
                  {{ "Go to dashboard"  }}
                </q-btn>
                <p
                  v-if="logisticsCompaniesArr.length"
                  style="max-width: 700px; margin: 0 auto"
                  class="text-left q-pa-sm"
                >
                  <strong
                    >Below is a list of logistics companies to you can work with
                    to convey your items. You can call the numbers to
                    negotiate...</strong
                  >
                </p>
              </div>

              <div
                v-if="logisticsCompaniesArr.length"
                class="responsive_grid logistics_card"
              >
                <div
                  v-for="(company, index) in logisticsCompaniesArr"
                  :key="index"
                  class="shadow-1 q-pa-md"
                >
                  <q-carousel
                    animated
                    style="max-height: 300px"
                    v-model="slide"
                    arrows
                    navigation
                    infinite
                  >
                    <q-carousel-slide
                      :name="1"
                      :img-src="company.driver_picture"
                      ><div
                        class="absolute-top bg-grey-7 text-white q-pa-sm custom-caption"
                      >
                        <div class="text-h6">Drivers Picture</div>
                      </div></q-carousel-slide
                    >
                    <q-carousel-slide
                      :name="2"
                      :img-src="company.vehicle_picture"
                      ><div
                        class="absolute-top bg-grey-7 text-white q-pa-sm custom-caption"
                      >
                        <div class="text-h6">Vehicle Picture</div>
                      </div></q-carousel-slide
                    >
                    <q-carousel-slide
                      :name="3"
                      :img-src="company.drivers_license"
                      ><div
                        class="absolute-top bg-grey-7 text-white q-pa-sm custom-caption"
                      >
                        <div class="text-h6">Drivers License</div>
                      </div></q-carousel-slide
                    >
                  </q-carousel>
                  <h6 class="text-h6 text-weight-bold">
                    Name: {{ company.name }}
                  </h6>
                  <h6 class="text-h6 text-weight-bold">
                    Plate number: {{ company.plate_number }}
                  </h6>

                  <ul>
                    <li>
                      Phone number:
                      <a :href="+`${company.phone_number}`"
                        ><i class="ri-phone-line"></i> +{{
                          company.phone_number
                        }}</a
                      >
                    </li>

                    <li>Park address: {{ company.park_address }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <FooterCompVue />
  </q-page>
</template>

<script setup>
import { Loading } from "quasar";
import { authAxios } from "src/boot/axios";
import FooterCompVue from "src/components/FooterComp.vue";
import { onMounted, ref } from "vue";
let logisticsCompaniesArr = ref([]);
let slide = ref(1);
const getLogisticsCompanies = async () => {
  try {
    Loading.show();
    let logisticsCompanies = await authAxios.get(`logistics/company/list`);
    console.log(logisticsCompanies);
    logisticsCompaniesArr.value = logisticsCompanies.data.data.data;
    Loading.hide();
  } catch (error) {
    console.error(error);
    Loading.hide();
  }
};

onMounted(() => {
  getLogisticsCompanies();
});
</script>

<style lang="scss" scoped></style>
