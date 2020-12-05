import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "common/stylus/index.styl";
import fastclick from "fastclick"
import { Lazyload } from "vant";

Vue.config.productionTip = false;
Vue.use(Lazyload, {
    preLoad: 1.3,
})
fastclick.attach(document.body);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");