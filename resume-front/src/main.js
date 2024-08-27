import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueHtml2pdf from "vue3-html2pdf";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Define your options as a plain object
const options = {
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true,
};

const pinia = createPinia();
const app = createApp(App);
app.provide("router", router);
app.use(Toast, options);
app.use(VueHtml2pdf);
app.use(router);
app.use(pinia);
app.mount("#app");
app.config.globalProperties.$toast =
  app.config.globalProperties.$toast || app.$toast;
