import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createRulesPlugin } from "vuetify/labs/rules";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import validatePlugin from "./plugin/validatePlugin.js";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#004D40",
          secondary: "#6D4C41",
          danger: "#B2DFDB",
        },
      },
    },
  },
});



app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(Toast)
app.use(createRulesPlugin({}, vuetify.locale))
app.use(validatePlugin)

app.mount("#app");
