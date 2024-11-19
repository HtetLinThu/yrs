import "./../node_modules/vant/lib/index.css";
import "./../node_modules/viewerjs/dist/viewer.css";
import "./assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  Tabbar,
  TabbarItem,
  NavBar,
  List,
  PullRefresh,
  Cell,
  CellGroup,
  Search,
  Button,
  TextEllipsis,
  Tab,
  Tabs,
  Empty,
  Grid,
  GridItem,
  Icon,
  Step,
  Steps,
  Dialog,
  Popup,
  Field,
  Picker,
  Form,
  PasswordInput,
  NumberKeyboard,
  Divider,
  Tag,
  Uploader,
  RadioGroup,
  Radio,
} from "vant";

import App from "./App.vue";
import router from "./router";
import SecureLS from "secure-ls";
import VueViewer from "v-viewer";
import VueQrcode from "@chenfengyuan/vue-qrcode";

window.ls = new SecureLS({
  encodingType: import.meta.env.VITE_LS_ENCODING_TYPE,
  encryptionSecret: import.meta.env.VITE_LS_ENCRYPTION_SECRET,
  metaKey: import.meta.env.VITE_LS_META_KEY,
});

const app = createApp(App);

app.use(createPinia());

app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(List);
app.use(PullRefresh);
app.use(Cell);
app.use(CellGroup);
app.use(Search);
app.use(Button);
app.use(TextEllipsis);
app.use(Tab);
app.use(Tabs);
app.use(Empty);
app.use(Grid);
app.use(GridItem);
app.use(Icon);
app.use(Step);
app.use(Steps);
app.use(Dialog);
app.use(Popup);
app.use(Field);
app.use(Picker);
app.use(Form);
app.use(PasswordInput);
app.use(NumberKeyboard);
app.use(Divider);
app.use(Tag);
app.use(Uploader);
app.use(Radio);
app.use(RadioGroup);
app.use(VueViewer);
app.use(router);
app.component(VueQrcode.name, VueQrcode);

app.mount("#app");
