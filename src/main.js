// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// import fullscreen from 'vue-fullscreen';
// Vue.use(fullscreen)
import VueSession from 'vue-session';
Vue.use(VueSession, {
    persist: true
});

import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, {rABS: false})

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);


Vue.mixin({
  data: function() {
      return {
          get resourceLocation() {
              //return "https://test.examsdaily.in:8088/uploads/images/";
               return "http://localhost:9088/uploads/images/";
          },
       
      }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
