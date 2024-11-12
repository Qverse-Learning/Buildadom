<template>
  <div class="q-ma-lg">
    <h3 class="text-h5 text-weight-b">Welcome Admin</h3>
    <q-table
      title="All merchants"
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

      <!-- <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn
              dense
              class="q-mr-sm"
              color="yellow-10"
              size="md"
              no-caps
              no-wrap
              :loading="loaders.save[props]"
              @click="viewMerchantDetails(props.row)"
              >View merchant details
            </q-btn>
          </div>
        </q-td>
      </template> -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div>
            <span
              style="border-radius: 8px"
              v-if="props.row.status === 'pending'"
              class="bg-yellow-9 text-white q-pa-sm"
            >
              {{ props.row.status }}
            </span>
            <span
              style="border-radius: 8px"
              v-else
              class="bg-green-9 text-white q-pa-sm"
            >
              {{ props.row.status }}
            </span>
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

  <q-dialog v-model="viewMerchantDetailsDialog">
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
              v-if="
                key === 'application' && viewMerchantDetailsObj[key]?.hometown
              "
            >
              <div class="col">
                <q-item-label class="q-pb-xs text-weight-bold"
                  >Qualification</q-item-label
                >
                <small>{{ viewMerchantDetailsObj[key]?.qualification }}</small>
              </div>
              <div
                style="border-bottom: 1px solid #e4e4e4"
                class="row q-mb-md q-gutter-sm"
              >
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Hometown</q-item-label
                  >
                  <small>{{ viewMerchantDetailsObj[key]?.hometown }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Hometown Address</q-item-label
                  >
                  <small>{{
                    viewMerchantDetailsObj[key]?.hometown_address
                  }}</small>
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
                  <small>{{ viewMerchantDetailsObj[key]?.gender }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Date of Birth</q-item-label
                  >
                  <small>{{ viewMerchantDetailsObj[key]?.dob }}</small>
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
                  <small>{{
                    viewMerchantDetailsObj[key]?.contact_address
                  }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Disability</q-item-label
                  >
                  <small>{{ viewMerchantDetailsObj[key]?.disability }}</small>
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
                  <small>{{ viewMerchantDetailsObj[key]?.lga }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Religion</q-item-label
                  >
                  <small>{{ viewMerchantDetailsObj[key]?.religion }}</small>
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
                  <small>{{ viewMerchantDetailsObj[key]?.sponsor_name }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Sponsor phone number</q-item-label
                  >
                  <small>{{
                    viewMerchantDetailsObj[key]?.sponsor_phone_number
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
                  <small>{{
                    viewMerchantDetailsObj[key]?.sponsor_email
                  }}</small>
                </div>
                <div class="col">
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Sponsor relationship</q-item-label
                  >
                  <small>{{
                    viewMerchantDetailsObj[key]?.sponsor_relationship
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
                    viewMerchantDetailsObj[key]?.sponsor_contact_address
                  }}</small>
                </div>
              </div>

              <div v-if="viewMerchantDetailsObj[key].first_sitting">
                <div
                  style="border-bottom: 1px solid #e4e4e4"
                  class="row q-mb-md q-gutter-sm"
                >
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >First Sitting Type</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewMerchantDetailsObj[key].first_sitting).type
                    }}</small>
                  </div>
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >First Sitting Year</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewMerchantDetailsObj[key].first_sitting).year
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
                      JSON.parse(viewMerchantDetailsObj[key].first_sitting)
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
                        viewMerchantDetailsObj[key].first_sitting
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
              <div v-if="viewMerchantDetailsObj[key]?.second_sitting.year">
                <div
                  style="border-bottom: 1px solid #e4e4e4"
                  class="row q-mb-md q-gutter-sm"
                >
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >Second Sitting Type</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewMerchantDetailsObj[key].second_sitting)
                        .type
                    }}</small>
                  </div>
                  <div class="col">
                    <q-item-label class="q-pb-xs text-weight-bold"
                      >Second Sitting Year</q-item-label
                    >
                    <small>{{
                      JSON.parse(viewMerchantDetailsObj[key].second_sitting)
                        .year
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
                      JSON.parse(viewMerchantDetailsObj[key].second_sitting)
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
                        viewMerchantDetailsObj[key].second_sitting
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
                    viewMerchantDetailsObj[key]
                  }}</small>
                </div>
              </div>
            </template>
          </div>
        </q-card-section>
      </q-card>
    </q-scroll-area>
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
    // field: (row, index) => console.log(row, index),
    sortable: true,
  },

  {
    name: "fullname",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row?.lastname + " " + row?.firstname,
    sortable: true,
  },

  {
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "phone",
    required: true,
    label: "Phone",
    align: "left",
    field: "phone",
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
    name: "status",
    required: true,
    label: "Status",
    align: "left",
    field: "status",
    sortable: true,
  },

  // {
  //   name: "created_at",
  //   required: true,
  //   label: "Created At",
  //   align: "left",
  //   field: (row) =>
  //     new Date(row.created_at).toLocaleDateString("en-US", {
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //     }),
  //   sortable: true,
  // },
  // {
  //   name: "actions",
  //   required: true,
  //   label: "Actions",
  //   align: "left",
  //   field: (row) => row.id,
  //   sortable: true,
  // },
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
      title: "Merchants",
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
      viewMerchantDetailsDialog: false,
      viewDocumentsDialog: false,
      viewMerchantDetailsObj: {},
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
      return Object.keys(this.viewMerchantDetailsObj).filter(
        (key) => !omittedProperties.includes(key)
      );
    },
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  methods: {
    isImage(link) {
      const extension = link.split(".").pop().toLowerCase();
      return ["jpg", "jpeg", "png"].includes(extension);
    },
    viewMerchantDetails(application) {
      try {
        Loading.show();
        authAxios
          .get(`admin/single-application?id=${application.id}`)
          .then(({ data }) => {
            console.log(data);
            this.viewMerchantDetailsObj = data.data;
            this.viewMerchantDetailsDialog = true;
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
      const url = `admin/merchant/list`;
      this.curl = url;
      authAxios
        .get(url)
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.rows = data.data;
        })
        .catch(({ response }) => {
          this.loading = false;
          this.rows = [];
        });
    },

    refreshPage() {
      if (this.curl !== "") {
        this.loading = true;
        this.$authAxios
          .get(this.curl)
          .then(({ data }) => {
            this.loading = false;
            this.rows = data.data;
            // console.log(data);
          })
          .catch(({ response }) => {
            // console.log(response);
            this.loading = false;
            this.rows = [];
          });
      }
    },

    exportTable() {
      // naive encoding to csv format
      // const fieldsToInclude = ["fullname", "specialization", "practice_id"];
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
      const status = exportFile(`Merchants`, content, "text/csv");
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
