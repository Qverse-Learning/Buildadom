<template>
  <div class="q-ma-lg">
    <q-table
      title="Approve KYC"
      :rows="rows"
      :hide-header="mode === 'grid'"
      :columns="columns"
      class="sort_tables"
      row-key="id"
      :grid="mode == 'grid'"
      :filter="filter"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
    >
      <template v-slot:top-right="props">
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-if="mode === 'list'"
        >
          <q-tooltip :disable="$q.platform.is.mobile">
            {{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="
            mode = mode === 'grid' ? 'list' : 'grid';
            separator = mode === 'grid' ? 'none' : 'horizontal';
          "
          v-if="!props.inFullscreen"
        >
          <q-tooltip :disable="$q.platform.is.mobile">{{
            mode === "grid" ? "List" : "Grid"
          }}</q-tooltip>
        </q-btn>

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          class="export"
          padding="xs"
          v-if="rows.length"
          @click="exportTable"
        />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <!-- <q-btn
              dense
              class="q-mr-sm"
              color="yellow-10"
              size="md"
              no-caps
              no-wrap
              :loading="loaders.save[props]"
              @click="viewKycDetails(props.row)"
              >View Kyc details
            </q-btn> -->
            <q-btn
              color="info"
              no-wrap
              no-caps
              class="q-mx-sm"
              icon-right="visibility"
              :loading="loaders.deleteBtn[props]"
              @click="viewDocuments(props.row)"
            >
              <span class="q-mr-sm"> View KYC documents </span>
            </q-btn>
            <q-btn
              dense
              class="q-mr-sm"
              color="green-7"
              size="md"
              :disable="props.row.status === 'verified'"
              no-caps
              no-wrap
              :loading="loaders.save[props]"
              @click="approveMerchantsKyc(props.row)"
              >{{
                props.row.status === "verified"
                  ? "Merchant approved"
                  : "Approve Merchant"
              }}
            </q-btn>
            <q-btn
              dense
              class="q-mr-sm"
              color="red-7"
              size="md"
              :disable="props.row.status === 'rejected'"
              no-caps
              v-if="props.row.status !== 'verified'"
              no-wrap
              :loading="loaders.save[props]"
              @click="rejectMerchantsKyc(props.row)"
              >{{
                props.row.status === "rejected"
                  ? "Merchant rejected"
                  : "Reject Merchant"
              }}
            </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <span> {{ message }} </span>
        </div>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="viewKycDetailsDialog">
    <q-scroll-area style="height: 90vh; width: 100%">
      <q-card class="edit_card">
        <q-card-section>
          <div class="text-h6">
            <q-btn
              round
              flat
              style="position: relative; z-index: 4"
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-h6 q-mb-md text-weight-bold">Main Information</div>
          <div v-for="key in filteredKeys" :key="key">
            <template
              v-if="key === 'application' && viewKycDetailsObj[key]?.hometown"
            >
              <div class="col">
                <q-item-label class="q-pb-xs text-weight-bold"
                  >Qualification</q-item-label
                >
                <small>{{ viewKycDetailsObj[key]?.qualification }}</small>
              </div>
              <div
                style="border-bottom: 1px solid #e4e4e4"
                class="row q-mb-md q-gutter-sm"
              >
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Hometown</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.hometown }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Hometown Address</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.hometown_address }}</small>
                </div>
              </div>
              <div
                style="border-bottom: 1px solid #e4e4e4"
                class="row q-mb-md q-gutter-sm"
              >
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Gender</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.gender }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Date of Birth</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.dob }}</small>
                </div>
              </div>
              <div
                style="border-bottom: 1px solid #e4e4e4"
                class="row q-mb-md q-gutter-sm"
              >
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Contact address</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.contact_address }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Disability</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.disability }}</small>
                </div>
              </div>
              <div
                style="border-bottom: 1px solid #e4e4e4"
                class="row q-mb-md q-gutter-sm"
              >
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >LGA</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.lga }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Religion</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.religion }}</small>
                </div>
              </div>
              <div
                style="border-bottom: 1px solid #e4e4e4"
                class="row q-mb-md q-gutter-sm"
              >
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Sponsor name</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.sponsor_name }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Sponsor phone number</q-item-label
                  >
                  <small>{{
                    viewKycDetailsObj[key]?.sponsor_phone_number
                  }}</small>
                </div>
              </div>
              <div
                style="border-bottom: 1px solid #e4e4e4"
                class="row q-mb-md q-gutter-sm"
              >
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Sponsor email</q-item-label
                  >
                  <small>{{ viewKycDetailsObj[key]?.sponsor_email }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Sponsor relationship</q-item-label
                  >
                  <small>{{
                    viewKycDetailsObj[key]?.sponsor_relationship
                  }}</small>
                </div>
              </div>
              <div
                style="border-bottom: 1px solid #e4e4e4"
                class="row q-mb-md q-gutter-sm"
              >
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Sponsor address</q-item-label
                  >
                  <small>{{
                    viewKycDetailsObj[key]?.sponsor_contact_address
                  }}</small>
                </div>
              </div>

              <div v-if="viewKycDetailsObj[key].first_sitting">
                <div
                  style="border-bottom: 1px solid #e4e4e4"
                  class="row q-mb-md q-gutter-sm"
                >
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >First Sitting Type</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewKycDetailsObj[key].first_sitting).type
                    }}</small>
                  </div>
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >First Sitting Year</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewKycDetailsObj[key].first_sitting).year
                    }}</small>
                  </div>
                </div>
                <div
                  style="border-bottom: 1px solid #e4e4e4"
                  class="row q-mb-md q-gutter-sm"
                >
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >First Sitting Exam Number</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewKycDetailsObj[key].first_sitting)
                        .exam_number
                    }}</small>
                  </div>
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >First Sitting Results</q-item-label
                    >
                    <div
                      style="border-bottom: 1px solid #e4e4e4"
                      v-for="(grade, index) in JSON.parse(
                        viewKycDetailsObj[key].first_sitting
                      ).first_sitting_grades"
                      :key="index"
                    >
                      <p class="q-mt-sm" v-if="grade.Grade">
                        {{ grade.subject }} - {{ grade.Grade }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="viewKycDetailsObj[key]?.second_sitting.year">
                <div
                  style="border-bottom: 1px solid #e4e4e4"
                  class="row q-mb-md q-gutter-sm"
                >
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >Second Sitting Type</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewKycDetailsObj[key].second_sitting).type
                    }}</small>
                  </div>
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >Second Sitting Year</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewKycDetailsObj[key].second_sitting).year
                    }}</small>
                  </div>
                </div>
                <div
                  style="border-bottom: 1px solid #e4e4e4"
                  class="row q-mb-md q-gutter-sm"
                >
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >Second Sitting Exam Number</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewKycDetailsObj[key].second_sitting)
                        .exam_number
                    }}</small>
                  </div>
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >Second Sitting Results</q-item-label
                    >
                    <div
                      style="border-bottom: 1px solid #e4e4e4"
                      v-for="(grade, index) in JSON.parse(
                        viewKycDetailsObj[key].second_sitting
                      ).first_sitting_grades"
                      :key="index"
                    >
                      <p class="q-mt-sm" v-if="grade.Grade">
                        {{ grade.subject }} - {{ grade.Grade }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <div
                style="border-bottom: 1px solid #e4e4e4"
                class="row q-mb-md q-gutter-sm"
              >
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold">{{
                    key.charAt(0).toUpperCase() + key.slice(1)
                  }}</q-item-label>
                </div>
                <div class="col">
                  <small class="q-pb-xs text-weight-bold">{{
                    viewKycDetailsObj[key]
                  }}</small>
                </div>
              </div>
            </template>
          </div>
        </q-card-section>
      </q-card>
    </q-scroll-area>
  </q-dialog>

  <q-dialog v-model="viewDocumentsDialog">
    <q-card class="card_img">
      <div class="q-pa-md">
        <div class="text-h6 text-weight-bold q-mb-sm">Documents</div>
        <q-list bordered>
          <q-item
            v-for="(doc, index) in viewData.kyc_files"
            :key="index"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                <img
                  v-if="isImage(doc.uploaded_file)"
                  :src="
                    doc.uploaded_file
                      ? doc.uploaded_file
                      : '/images/worklogo.png'
                  "
                  alt=""
                />
                <div v-else class="text-white">pdf</div>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ doc.description }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn no-caps no-wrap color="primary">
                View
                <q-popup-proxy
                  cover
                  class="proxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <div class="proxy_div">
                    <template v-if="isImage(doc.uploaded_file)">
                      <img :src="doc.uploaded_file" alt="Image" />
                    </template>
                    <template v-else>
                      <iframe
                        width="100%"
                        height="500px"
                        :src="doc.uploaded_file"
                        frameborder="0"
                      ></iframe>
                    </template>
                  </div>
                </q-popup-proxy>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { Dialog, exportFile, Loading, Notify, useMeta } from "quasar";
import { authAxios } from "src/boot/axios";
const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: "id",
    sortable: true,
  },

  {
    name: "fullname",
    required: true,
    label: "Name",
    align: "left",
    field: "fullname",
    sortable: true,
  },

  {
    name: "address",
    required: true,
    label: "Address",
    align: "left",
    field: "address",
    sortable: true,
  },

  {
    name: "actions",
    required: true,
    label: "Actions",
    align: "left",
    field: (row) => row.id,
    sortable: true,
  },
];
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}
export default {
  setup() {
    useMeta({
      title: "Approve KYC",
    });
  },
  data() {
    return {
      columns,
      title: "",
      documentSlide: 1,
      selected: [],
      rows: [],
      errors: {},
      viewData: {},
      viewKycDetailsDialog: false,
      viewDocumentsDialog: false,
      viewKycDetailsObj: {},
      data: {},
      image: null,
      viewDialog: false,
      create_memberDialog: false,
      editstate: false,
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 50,
      },
      filter: "",
      curl: "",
      separator: "",
      mode: "list",
      role: "personels",
      editId: "",
      loading: false,
      loaders: {
        delete: false,
        category: false,
        deleteBtn: [],
        save: [],
      },
    };
  },
  computed: {
    filteredKeys() {
      const omittedProperties = [
        "id",
        "accpetance_fee_payment_status",
        "amount",
        "deleted_at",
        "is_applied",
        "password",
        "reference",
        "tuition_payment_status",
        "application_payment_status",
        "created_at",
        "updated_at",
      ];
      return Object.keys(this.viewKycDetailsObj).filter(
        (key) => !omittedProperties.includes(key)
      );
    },
  },
  mounted() {
    this.onRequest();
  },
  methods: {
    isImage(link) {
      const extension = link.split(".").pop().toLowerCase();
      return ["jpg", "jpeg", "png"].includes(extension);
    },
    viewKycDetails(application) {
      try {
        Loading.show();
        authAxios
          .get(`admin/single-application?id=${application.id}`)
          .then(({ data }) => {
            console.log(data);
            this.viewKycDetailsObj = data.data;
            this.viewKycDetailsDialog = true;
            Loading.hide();
          })
          .catch(({ response }) => {
            Loading.hide();
          });
      } catch (error) {
        console.error(error);
      }
    },
    onRequest(props) {
      // let type = this.$router.currentRoute.value.params.id;
      this.loading = true;
      const url = `admin/kyc/list`;
      this.curl = url;
      authAxios
        .get(url)
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.rows = data.data.data;
        })
        .catch(({ response }) => {
          this.loading = false;
          this.rows = [];
        });
    },

    refreshPage() {
      if (this.curl !== "") {
        this.loading = true;
        authAxios
          .get(this.curl)
          .then(({ data }) => {
            // console.log(data);
            this.loading = false;
            this.rows = data.data.data;
          })
          .catch(({ response }) => {
            // console.log(response);
            this.loading = false;
            this.rows = [];
          });
      }
    },

    approveMerchantsKyc(merchant) {
      Dialog.create({
        title: "Confirm",
        message: "Would you like to approve this entry?",
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          try {
            this.loading = true;
            const response = await authAxios.post(
              `admin/kyc/action/${merchant.id}`,
              {
                status: "verified",
              }
            );
            // console.log(response);
            Notify.create({
              message: response.data.message
                ? response.data.message
                : "Merchants approval successful",
              position: "top",
              color: "green-6",
            });
            this.loading = false;
            this.refreshPage();
          } catch ({ response }) {
            this.loading = false;
            Notify.create({
              message: response.data.message
                ? response.data.message
                : "There was an error approving personnel",
              position: "top",
              color: "red-6",
            });
          }
        })

        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    rejectMerchantsKyc(merchant) {
      console.log(merchant);
      Dialog.create({
        title: "Confirm",
        message: "Why would you like to reject this entry?",
        cancel: true,
        prompt: {
          model: "",
          type: "text", // optional
        },
        persistent: true,
      })
        .onOk(async (data) => {
          try {
            this.loading = true;
            const response = await authAxios.delete(
              `admin/reject-application?application_id=${student.id}&reaseon=${data}`
            );
            Notify.create({
              message: response.data.message
                ? response.data.message
                : "Entry rejected",
              position: "top",
              color: "green-6",
            });
            this.loading = false;
            this.refreshPage();
          } catch ({ response }) {
            // console.log(response);
            this.loading = false;
            Notify.create({
              message: response.data.message
                ? response.data.message
                : "There was an error approving personnel",
              position: "top",
              color: "red-6",
            });
          }
        })

        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    viewDocuments(data) {
      this.viewData = data;
      this.viewDocumentsDialog = true;
      // try {
      //   Loading.show();
      //   authAxios
      //     .get(`admin/single-application?id=${data.id}`)
      //     .then(({ data }) => {
      //       console.log(data);
      //       this.viewData = data.data;
      //       this.viewDocumentsDialog = true;
      //       Loading.hide();
      //     })
      //     .catch(({ response }) => {
      //       Loading.hide();
      //     });
      // } catch (error) {
      //   console.error(error);
      // }
    },

    exportTable() {
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.rows.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");
      const status = exportFile(`KYCs`, content, "text/csv");
      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}

p {
  margin-bottom: 0;
}
</style>
