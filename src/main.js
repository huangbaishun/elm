import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import FastClick from "fastclick";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import "@/utils/rem";
Vue.use(MintUI);
import { Rate } from "vant";

Vue.use(Rate);

Vue.config.productionTip = false;

if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

let gobalComponents = require.context('./components', true, /\.g\.vue$/)

gobalComponents.keys().forEach(path => {
  let component = gobalComponents(path).default
  Vue.component(component.name || path.replace(/.+[/\\]/, '').replace('.g.vue', ''), component)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
