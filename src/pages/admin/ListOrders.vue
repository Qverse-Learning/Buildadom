<template>
  <div class="q-ma-lg">
    <q-table
      title="All orders"
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
      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <span> {{ message }} </span>
        </div>
      </template>
    </q-table>
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
    name: "tracking_number",
    required: true,
    label: "Tracking number",
    align: "left",
    field: "tracking_number",
    sortable: true,
  },

  {
    name: "amount",
    required: true,
    label: "Amount",
    align: "left",
    field: (row) => `NGN ${row.amount}`,
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
      title: "Orders",
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
      const url = `admin/order/list`;
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
      const status = exportFile(`Orders`, content, "text/csv");
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
