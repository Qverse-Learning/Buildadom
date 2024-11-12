<template>
  <div class="q-ma-lg">
    <q-table
      title="All logistics companies"
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
        <q-btn
          :to="{ name: 'logistics.onboard' }"
          no-caps
          no-wrap
          class="q-mx-sm"
          >Create</q-btn
        >
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
            <q-btn
              dense
              class="q-mr-sm"
              color="yellow-10"
              size="md"
              no-caps
              no-wrap
              @click="verify(props.row)"
              >Verify
            </q-btn>
            <q-btn
              dense
              class="q-mr-sm"
              color="yellow-10"
              size="md"
              no-caps
              no-wrap
              @click="viewDetails(props.row)"
              >View details
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

    <q-dialog v-model="viewDocumentsDialog">
      <q-card class="card_img">
        <div class="q-pa-md">
          <div class="text-h6 text-weight-bold q-mb-sm">Documents</div>
          <q-list bordered>
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <img
                    v-if="isImage(viewDocumentsObj.driver_picture)"
                    style="max-width: 700px"
                    :src="
                      viewDocumentsObj.driver_picture
                        ? viewDocumentsObj.driver_picture
                        : '/images/bg.png'
                    "
                    alt=""
                  />
                  <div v-else class="text-white">pdf</div>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Companies logo / Drivers picture</q-item-label>
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
                      <template v-if="isImage(viewDocumentsObj.driver_picture)">
                        <img
                          :src="viewDocumentsObj.driver_picture"
                          alt="Image"
                          style="max-width: 700px"
                        />
                      </template>
                      <template v-else>
                        <iframe
                          width="100%"
                          height="500px"
                          :src="viewDocumentsObj.driver_picture"
                          frameborder="0"
                        ></iframe>
                      </template>
                    </div>
                  </q-popup-proxy>
                </q-btn>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <img
                    v-if="isImage(viewDocumentsObj.drivers_license)"
                    :src="viewDocumentsObj.drivers_license"
                    alt="Image"
                    style="max-width: 700px"
                  />
                  <div v-else class="text-white">pdf</div>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Drivers license</q-item-label>
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
                      <template
                        v-if="isImage(viewDocumentsObj.drivers_license)"
                      >
                        <img
                          :src="viewDocumentsObj.drivers_license"
                          alt="Image"
                          style="max-width: 700px"
                        />
                      </template>
                      <template v-else>
                        <iframe
                          width="100%"
                          height="500px"
                          :src="viewDocumentsObj.drivers_license"
                          frameborder="0"
                        ></iframe>
                      </template>
                    </div>
                  </q-popup-proxy>
                </q-btn>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item class="q-my-sm" clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">
                  <img
                    v-if="isImage(viewDocumentsObj.vehicle_picture)"
                    :src="viewDocumentsObj.vehicle_picture"
                    alt="Image"
                    style="max-width: 700px"
                  />

                  <div v-else class="text-white">pdf</div>
                  <!-- <img
                  :src="
                    viewDocumentsObj.owner_nin_image
                      ? viewDocumentsObj.owner_nin_image
                      : '/images/bg.png'
                  "
                  alt=""
                /> -->
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>Vehicle picture</q-item-label>
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
                      <template
                        v-if="isImage(viewDocumentsObj.vehicle_picture)"
                      >
                        <img
                          :src="viewDocumentsObj.vehicle_picture"
                          alt="Image"
                          style="max-width: 700px"
                        />
                      </template>
                      <template v-else>
                        <iframe
                          width="100%"
                          height="500px"
                          :src="viewDocumentsObj.vehicle_picture"
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
  </div>
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
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "base_price",
    required: true,
    label: "Base price",
    align: "left",
    field: "base_price",
    sortable: true,
  },

  {
    name: "park_address",
    required: true,
    label: "Park address",
    align: "left",
    field: "park_address",
    sortable: true,
  },
  {
    name: "phone_number",
    required: true,
    label: "Phone number",
    align: "left",
    field: "phone_number",
    sortable: true,
  },

  {
    name: "created_at",
    required: true,
    label: "Created At",
    align: "left",
    field: (row) =>
      new Date(row.created_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
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
      title: "Logistics companies",
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
      viewDocumentsObj: {},
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
    viewDetails(data) {
      this.viewDocumentsObj = data;
      this.viewDocumentsDialog = true;
    },
    verify(application) {},
    onRequest(props) {
      // let type = this.$router.currentRoute.value.params.id;
      this.loading = true;
      const url = `admin/logistics/company/list`;
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
      const status = exportFile(`Logistics companies`, content, "text/csv");
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
