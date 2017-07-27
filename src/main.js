// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueTap from 'v-tap'

Vue.config.productionTip = false;
Vue.use(vueTap);
/* eslint-disable no-new */
if(typeof (padApp) != 'undefined'){
  Vue.prototype.fromApp = JSON.parse(padApp.gettAuthToken());
}else{
  Vue.prototype.fromApp = {
    "auth_token":"1c9c659acc098961cca0e23ebc2eebb68377",
    "bindid":"AAAAAAAA",
    "device_id":"00:ec:0a:7a:63:4a",
    "storeid":"10",
    "i":"8"
  };
}
Vue.prototype.paramsFromApp = `&i=${Vue.prototype.fromApp.i}&auth_token=${Vue.prototype.fromApp.auth_token}&bindid=${Vue.prototype.fromApp.bindid}&storeid=${Vue.prototype.fromApp.storeid}&device_id=${Vue.prototype.fromApp.device_id}`;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
