// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueTap from 'v-tap'
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(vueTap);
/* eslint-disable no-new */
if(typeof (padApp) != 'undefined'){
  Vue.prototype.fromApp = JSON.parse(padApp.gettAuthToken());
}else{
  Vue.prototype.fromApp = {
    "auth_token":"4abc226efa6e362bfa1b77d2f8adf2504691",
    "bindid":"AAAAAAAA",
    "device_id":"00:ec:0a:7a:63:4a",
    "storeid":"17",
    "i":"15"
  };
}
/*alert(document.documentElement.getBoundingClientRect().width);
alert(document.documentElement.style.fontSize);*/
Vue.prototype.paramsFromApp = `&i=${Vue.prototype.fromApp.i}&auth_token=${Vue.prototype.fromApp.auth_token}&bindid=${Vue.prototype.fromApp.bindid}&storeid=${Vue.prototype.fromApp.storeid}&device_id=${Vue.prototype.fromApp.device_id}`;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
