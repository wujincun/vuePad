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
  let fromApp = JSON.parse(padApp.gettAuthToken());
  Vue.prototype.paramsFromApp = `&i=${fromApp.i}&auth_token=${fromApp.auth_token}&bindid=${fromApp.bindid}&storeid=${fromApp.storeid}&device_id=${fromApp.device_id}`;
}else{
  Vue.prototype.paramsFromApp = '&i=8&auth_token=1c9c659acc098961cca0e23ebc2eebb68377&bindid=AAAAAAAA&storeid=13&device_id=00:ec:0a:7a:63:4a';//;
}
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
