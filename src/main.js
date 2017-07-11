// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueTap from 'v-tap'

Vue.config.productionTip = false;
Vue.use(vueTap);
/* eslint-disable no-new */
Vue.prototype.paramsFromApp = '&i=8&auth_token=9c31566454a0ced52cb236bfd2876cbf4415&bindid=b9b&storeid=13';//;  
//Vue.prototype.paramsFromApp = padApp.gettAuthToken();// '&i=8&auth_token=9c31566454a0ced52cb236bfd2876cbf4415&bindid=b9b&storeid=13';// '&' + navigator.userAgent;
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
