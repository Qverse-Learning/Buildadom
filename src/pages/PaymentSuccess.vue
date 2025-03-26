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

      <!-- <q-dialog v-model="showModal" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="info" color="primary" text-color="white" />
            <span class="q-ml-md">Your order has been successfully placed!</span>
          </q-card-section>
          <q-card-section>
            <p>
              Thank you for your purchase! You will receive an email confirmation shortly.<br>
              Do you have a driver that would pick your order up or are we to deliver it?
            </p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog> -->

      <!-- First Modal: Ask user about driver -->
      <q-dialog v-model="showModal" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="info" color="primary" text-color="white" />
            <span class="q-ml-md">Your order has been successfully placed!</span>
          </q-card-section>
          <q-card-section>
            <p>
              Thank you for your purchase! You will receive an email confirmation shortly.<br />
              Do you have a driver that would pick your order up or are we to deliver it?
            </p>
            <q-option-group
              v-model="hasDriver"
              :options="[
                { label: 'Yes, I have a driver', value: 'yes' },
                { label: 'No, please deliver', value: 'no' }
              ]"
              color="primary"
            />
            <p class="text-red text-bold">NOTE *</p> If we are to deliver your order extra charges will be needed to pay after the collation of your order. The charges depends on the distance of the delivery.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Proceed" color="primary" @click="handleResponse" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Second Modal: Driver Details Form -->
      <q-dialog v-model="showDriverForm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="directions_car" color="primary" text-color="white" />
            <span class="q-ml-md">Enter Driver's Information</span>
          </q-card-section>
          <q-card-section>
            <q-input v-model="driverName" label="Driver's Name" filled /><br />
            <q-input v-model="driverPhone" label="Driver's Phone Number" filled type="tel" /> <br />
            <p class="text-red text-bold">NOTE *</p> Your driver will be given a call to come and pick up your delivery after collation.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Submit" color="primary" @click="submitDriverDetails" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Third Modal: Agent Will Contact -->
      <q-dialog v-model="showAgentMessage">
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="support_agent" color="primary" text-color="white" />
            <span class="q-ml-md">Our agent will contact you soon!</span>
          </q-card-section>
          <q-card-section>
            <p>Thank you! Our logistics team will reach out to you shortly to arrange the delivery.</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Okay" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
let showModal = ref(true); // Open the first modal by default
let hasDriver = ref(null);
let showDriverForm = ref(false);
let showAgentMessage = ref(false);
let driverName = ref("");
let driverPhone = ref("");

// Handle user response from the first modal
const handleResponse = () => {
  if (hasDriver.value === "yes") {
    showModal.value = false;
    showDriverForm.value = true;
  } else if (hasDriver.value === "no") {
    showModal.value = false;
    showAgentMessage.value = true;
  }
};

// Submit driver details
const submitDriverDetails = () => {
  console.log("Driver Name:", driverName.value);
  console.log("Driver Phone:", driverPhone.value);
  showDriverForm.value = false; // Close the modal after submission
};

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
