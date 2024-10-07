import 'vant/lib/index.css';
import "./assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tabbar, TabbarItem } from 'vant';

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(Tabbar);
app.use(TabbarItem);
app.use(router);

app.mount("#app");
