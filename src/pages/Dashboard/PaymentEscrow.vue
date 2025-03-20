<template>
  <div>
    <div class="auth">
      <div class="q-mt-lg">
        <div class="row items-center justify-between">
          <h4 class="bigMediumText">Payment Information</h4>
          <div></div>
        </div>

        <q-separator />

        <div class="escrow_top_area">
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="img">
              <img src="../../assets/escrowtotalamt.svg" alt="" />
            </div>
            <div>
              <h6>Total Payment Received</h6>
              <h4 class="text1">{{ currencyCode }} {{ totalAmountPaid.toLocaleString() }}</h4>
            </div>
          </div>
          <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="img">
              <img src="../../assets/productreleased.svg" alt="" />
            </div>
            <div>
              <h6>Total Quantity</h6>
              <h4 class="text1">{{ totalQuantity.toLocaleString() }}</h4>
            </div>
          </div>

          <!-- <div style="gap: 1rem" class="row items-center no-wrap">
            <div class="img">
              <img src="../../assets/productpending.svg" alt="" />
            </div>
            <div>
              <h6>Total Direct Payment</h6>
              <h4 class="text1">15</h4>
            </div>
          </div> -->
        </div>

        <div style="gap: 1rem" class="sortbtns row items-center">
          <q-btn
            no-wrap
            no-caps
            @click="setView('Pending')"
            flat
            :class="view === 'Pending' ? 'text-weight-bold active' : ''"
            >Payment Details</q-btn
          >
          <!-- <q-btn
            no-wrap
            no-caps
            @click="setView('Released')"
            flat
            :class="view === 'Released' ? 'text-weight-bold active' : ''"
            >Released Funds</q-btn
          > -->
        </div>
        <q-table
          :rows="rows"
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="investor"
          :filter="filter"
          class="sort_tables"
          :loading="loading"
          v-model:pagination="pagination"
          @request="onRequest"
        >
          <template v-slot:body-cell-product="props">
            <q-td :props="props">
              <div style="gap: 1rem" class="row no-wrap items-center">
                <div>
                  <img
                    v-if = "props.row.image"
                    style="width: 120.957px; height: 107px"
                    :src="props.row.image"
                    alt="Product Image"
                  />
                </div>
                <div>
                  <h6 class="smallText">{{ props.row.product }}</h6>
                  <p class="smallerText q-mt-md">
                    {{ props.row.description }}
                  </p>
                </div>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">

              <p
                v-if="props.row.status === 'PROCESSED'"
                class="bg-green-2 text-center q-pa-sm text-green-10"
              >
                Processed
              </p>


              <!-- Button for Processed Payments -->
              <!-- <q-btn
                v-if="props.row.status === 'PROCESSED'"
                label="View Details"
                color="green"
                @click="viewDetails(props.row)"
              /> -->
            </q-td>
          </template>

          <template v-slot:no-data="{ message }">
            <div class="full-width row flex-center text-negative q-gutter-sm">
              <span> {{ message }} </span>
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authAxios } from "src/boot/axios";
import { onMounted, ref, computed } from "vue";

let loading = ref(false);
let view = ref("Pending");

const columns = [
  {
    name: "product",
    required: true,
    label: "Product Purchased",
    align: "left",
    field: "product",
    sortable: true,
  },
  {
    name: "amount",
    required: true,
    label: "Amount per qty",
    align: "left",
    field: "amount",
    sortable: true,
  },
  {
    name: "quantity",
    required: true,
    label: "Quantity",
    align: "left",
    field: "quantity",
    sortable: true,
  },
  {
    name: "total_amount",
    required: true,
    label: "Total Amount",
    align: "left",
    field: "total_amount",
    sortable: true,
  },
  {
    name: "date",
    required: true,
    label: "Date",
    align: "left",
    field: "date",
    sortable: true,
  },

  {
    name: "status",
    required: true,
    label: "Release Status",
    align: "left",
    field: "status",
    sortable: false,
  },
];

let pagination = ref({
  sortBy: "id",
  descending: false,
  page: 1,
  rowsPerPage: 10,
});
let filter = ref("");
let curl = ref("");
let separator = ref("");
let mode = ref("list");
let loaders = ref({
  delete: false,
  category: false,
  deleteBtn: [],
  save: [],
});
let currencyCode = ref("");
const formatDate = (datetimeString) => {
  const date = new Date(datetimeString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};
let rows = ref([]);
const setView = (viewArg) => {
  view.value = viewArg;
};

const totalAmountPaid = computed(() => {
  return rows.value.reduce((sum, item) => {
    // Extract only the numeric part using regex and parse it
    const totalAmount = parseFloat(item.total_amount.replace(/[^0-9.]/g, "")) || 0;
    return sum + totalAmount;
  }, 0);
});

const totalQuantity = computed(() => {
  return rows.value.reduce((sum, item) => {
    return sum + (parseInt(item.quantity) || 0);
  }, 0);
});

const onRequest = () => {
  loading.value = true;

  authAxios
    .get(`merchant/payment/list`)
    .then(({ data }) => {
      console.log("API Response:", data);

      // Ensure data exists before mapping
      if (data?.data?.data) {
        // Extract the currency code (assuming it's consistent for all items)
        if (data.data.data.length > 0) {
          currencyCode.value = data.data.data[0]?.currency?.code || "";
        }

        // Map the response to the rows

        rows.value = data.data.data.map(item => {
          if (!item.settlement) {
            return {
              product: "",
              image: null,
              description: "",
              amount: "",
              quantity: "",
              total_amount: "",
              date: "",
              status: "",
            };
          }

          const unitAmount = parseFloat(item.settlement.order?.amount || 0);
          const quantity = parseInt(item.settlement.order?.quantity || 0);
          const totalAmount = unitAmount * quantity; // Multiplication of amount and quantity

          return {
            product: item.settlement.order?.product?.name || "Unknown Product",
            image: item.settlement.order?.product?.images?.[0]?.url || "default-image.png",
            description: item.settlement.order?.product?.description || "",
            amount: item.currency?.symbol
              ? `${item.currency.symbol} ${unitAmount.toFixed(2)}`
              : "N/A",
            quantity: quantity,
            total_amount: item.currency?.symbol
              ? `${item.currency.symbol} ${totalAmount.toFixed(2)}`
              : "N/A", // Corrected total amount
            date: formatDate(item.settlement.created_at) || "N/A",
            status: item.settlement.status || "Pending",
          };
        });


      }

      loading.value = false;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      loading.value = false;
    });
};



onMounted(async () => {
  try {
    onRequest();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped></style>
