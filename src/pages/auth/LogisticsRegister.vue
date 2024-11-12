<template>
  <div>
    <div class="small_container q-py-xl">
      <!-- <h4 class="biggerText text-center">
        Create a buildadom logistics business account
      </h4> -->
      <h4 class="biggerText text-center q-mt-lg">
        Onboard a logistics company
      </h4>

      <div style="margin-top: 1rem" class="auth">
        <form @submit.prevent="submitForm">
          <div class="input_wrap">
            <label for="">Name<span>*</span></label>
            <div class="input">
              <input
                v-model="data.name"
                placeholder="Enter name"
                required
                type="text"
              />
            </div>
            <small v-if="errors.name" class="text-red text-weight-bold">
              {{ errors.name[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for="">Plate number <span>*</span></label>
            <div class="input">
              <input
                v-model="data.plate_number"
                placeholder="Enter plate number"
                required
                type="text"
              />
            </div>
            <small v-if="errors.plate_number" class="text-red text-weight-bold">
              {{ errors.plate_number[0] }}
            </small>
          </div>

          <div class="input_wrap">
            <label for="">Base price <span>*</span></label>
            <div class="input">
              <input
                v-model="data.base_price"
                placeholder="Enter base price"
                required
                type="text"
              />
            </div>
            <small v-if="errors.base_price" class="text-red text-weight-bold">
              {{ errors.base_price[0] }}
            </small>
          </div>

          <div class="phone">
            <label for="">Phone Number<span>*</span></label>
            <div class="phone_wrap">
              <div class="country_select">
                <div class="input_wrap">
                  <div class="input">
                    <select @change="getStatesAndCities" v-model="country_code">
                      <option
                        v-for="(country, index) in countryList"
                        :key="index"
                        :value="`${country.phone_code}`"
                      >
                        +{{ country.phone_code }} {{ country.emoji }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="input_wrap">
                <div class="input">
                  <input
                    v-model="data.phone"
                    placeholder="Enter phone number"
                    required
                    type="text"
                  />
                </div>
              </div>
            </div>
            <small v-if="errors.phone" class="text-red text-weight-bold">
              {{ errors.phone[0] }}
            </small>
          </div>
          <div class="input_wrap">
            <label for="">State <span>*</span></label>
            <div class="input">
              <select
                required
                :disabled="!statesList.length"
                v-model="data.state_id"
              >
                <option disabled value="">Select State</option>
                <option
                  v-for="(state, index) in statesList"
                  :key="index"
                  :value="state.id"
                >
                  {{ state.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="input_wrap">
            <label for="">City <span>*</span></label>
            <div class="input">
              <select
                required
                :disabled="!cityList.length"
                v-model="data.city_id"
              >
                <option disabled value="">Select City</option>
                <option
                  v-for="(city, index) in cityList"
                  :key="index"
                  :value="city.id"
                >
                  {{ city.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="input_wrap">
            <label for="">Park Address<span>*</span></label>
            <div class="input">
              <input
                v-model="data.park_address"
                required
                placeholder="Enter address"
                type="text"
              />
            </div>
            <small v-if="errors.park_address" class="text-red text-weight-bold">
              {{ errors.park_address[0] }}
            </small>
          </div>
          <div class=".normal_grid {">
            <div class="input_wrap">
              <label for=""
                >Company logo or Drivers picture<span>*</span></label
              >
              <div class="input">
                <q-file
                  @update:model-value="setDriversPicture"
                  accept=".png,.jpeg,.jpg"
                  class="column profile_field justify-center items-center"
                  v-model="data.driver_picture"
                >
                  <div v-if="driversPicturePreview" class="img q-mb-sm">
                    <img
                      style="width: 100px; height: 100px; object-fit: contain"
                      :src="driversPicturePreview"
                      alt=""
                    />
                  </div>
                  <div v-if="!driversPicturePreview" class="img q-mb-sm">
                    <img src="../../assets/upload.svg" alt="" />
                  </div>
                  <div v-if="!driversPicturePreview" class="smallText">
                    Upload drivers picture
                  </div>
                </q-file>
              </div>
              <small
                v-if="errors.driver_picture"
                class="text-red text-weight-bold"
              >
                {{ errors.driver_picture[0] }}
              </small>
            </div>
            <div class="input_wrap">
              <label for="">Drivers license<span>*</span></label>
              <div class="input">
                <q-file
                  @update:model-value="setDriversLicense"
                  accept=".png,.jpeg,.jpg"
                  class="column profile_field justify-center items-center"
                  v-model="data.drivers_license"
                >
                  <div v-if="driversLicensePreview" class="img q-mb-sm">
                    <img
                      style="width: 100px; height: 100px; object-fit: contain"
                      :src="driversLicensePreview"
                      alt=""
                    />
                  </div>
                  <div v-if="!driversLicensePreview" class="img q-mb-sm">
                    <img src="../../assets/upload.svg" alt="" />
                  </div>
                  <div v-if="!driversLicensePreview" class="smallText">
                    Upload drivers license
                  </div>
                </q-file>
              </div>
              <small
                v-if="errors.drivers_license"
                class="text-red text-weight-bold"
              >
                {{ errors.drivers_license[0] }}
              </small>
            </div>
          </div>

          <div class="input_wrap">
            <label for="">Vehicle picture<span>*</span></label>
            <div class="input">
              <q-file
                @update:model-value="setVehiclePicture"
                accept=".png,.jpeg,.jpg"
                class="column profile_field justify-center items-center"
                v-model="data.vehicle_picture"
              >
                <div v-if="vehiclePicturePreview" class="img q-mb-sm">
                  <img
                    style="width: 100px; height: 100px; object-fit: contain"
                    :src="vehiclePicturePreview"
                    alt=""
                  />
                </div>
                <div v-if="!vehiclePicturePreview" class="img q-mb-sm">
                  <img src="../../assets/upload.svg" alt="" />
                </div>
                <div v-if="!vehiclePicturePreview" class="smallText">
                  Upload vehicle picture
                </div>
              </q-file>
            </div>
            <small
              v-if="errors.vehicle_picture"
              class="text-red text-weight-bold"
            >
              {{ errors.vehicle_picture[0] }}
            </small>
          </div>

          <div class="row justify-end q-mt-lg">
            <q-btn
              :loading="loading"
              color="primary"
              rounded
              no-wrap
              no-caps
              type="submit"
            >
              Submit
            </q-btn>
          </div>
        </form>

        <p class="text-h6 text-center q-mt-lg">
          Do you already have an account?
          <router-link
            :to="{
              name: 'merchant.login',
            }"
          >
            Login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Dialog, Loading, Notify } from "quasar";
import { authAxios } from "src/boot/axios";
import { useMyAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

let router = useRouter();
let data = ref({
  city_id: "",
  state_id: "",
  driver_picture: null,
  vehicle_picture: null,
  drivers_license: null,
});
let errors = ref({});
let countryList = ref([]);
let cityList = ref([]);
let statesList = ref([]);
let country_code = ref("");
let vehiclePicturePreview = ref("");
let driversPicturePreview = ref("");
let driversLicensePreview = ref("");
let viewPassword = ref(false);
let viewConfirmPassword = ref(false);
let loading = ref(false);
let loadingBtn = ref(false);
let verifyModal = ref(false);
let code = ref("");
const resending = ref(false);
let store = useMyAuthStore();

const setDriversPicture = (props) => {
  data.value.driver_picture = props;

  var reader = new FileReader();
  reader.onload = (e) => {
    driversPicturePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const setDriversLicense = (props) => {
  data.value.drivers_license = props;

  var reader = new FileReader();
  reader.onload = (e) => {
    driversLicensePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};
const setVehiclePicture = (props) => {
  data.value.vehicle_picture = props;

  var reader = new FileReader();
  reader.onload = (e) => {
    vehiclePicturePreview.value = e.target.result;
  };
  reader.readAsDataURL(props);
};

const formatPhoneNumber = (phone) => {
  if (phone.startsWith("0")) {
    return phone.slice(1);
  } else {
    return phone;
  }
};
const submitForm = () => {
  let newData = {
    ...data.value,
    // type: router.currentRoute.value.query.type,
    phone_number: country_code.value + formatPhoneNumber(data.value.phone),
  };
  console.log(newData);
  loading.value = true;
  authAxios
    .post("logistics/company/create", newData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);
      Notify.create({
        message: response.data.message,
        color: "green",
        position: "top",
      });
      loading.value = false;
      Dialog.create({
        title: "Successful",
        message: `You have successfully created this logistics company...`,
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          router.replace({
            name: "admin.list.merchants",
          });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
      // data.value = {};
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
      Notify.create({
        message: Object.values(response.data.errors).toString(),
        color: "red",
        position: "top",
        actions: [{ icon: "close", color: "white" }],
      });
    });
};

const getStatesAndCities = () => {
  let countryData = countryList.value.find(
    (country) => country.phone_code === country_code.value
  );
  Loading.show();
  getState(countryData);
  getCity(countryData);
};
const getState = async (country) => {
  try {
    let statesListResp = await authAxios.get(
      `country/states?country_id=${country.id}`
    );

    statesList.value = statesListResp.data.data;
    Loading.hide();
  } catch (error) {
    console.error(error);
    Loading.hide();
  }
};
const getCity = async (country) => {
  try {
    let cityListResp = await authAxios.get(
      `country/cities?country_id=${country.id}`
    );

    cityList.value = cityListResp.data.data;
    Loading.hide();
  } catch (error) {
    console.error(error);
    Loading.hide();
  }
};

onMounted(async () => {
  try {
    Loading.show();
    let countriesResp = await authAxios.get("country/supported-countries");
    console.log(countriesResp);
    countryList.value = countriesResp.data.data;
    Loading.hide();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
.small_container {
  padding: 0;
}
</style>
