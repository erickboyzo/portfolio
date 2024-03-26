import filters from "@/filters/filters";
import vuetify from "@/plugins/vuetify";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.config.globalProperties.$filters = filters;

app.mount("#app");
