import { useCartStore } from "stores/cart";
import { useMyAuthStore } from "stores/auth";

export default {
  buildadomcart: useCartStore(),
  buildadomauth: useMyAuthStore(),
};
