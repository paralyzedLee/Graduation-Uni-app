
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from "@/uni_modules/uview-ui";
import {goTo, goToWithItem} from 'utils/commonFunction.js';
Vue.use(uView);
Vue.config.productionTip = false
Vue.mixin({
	methods:{
		goTo:goTo,
		goToWithItem:goToWithItem,
	}
})
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif