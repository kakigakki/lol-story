import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "common/stylus/index.styl";
import { Lazyload } from "vant";

Vue.config.productionTip = false;
Vue.use(Lazyload, {
  preLoad: 1.3,
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");