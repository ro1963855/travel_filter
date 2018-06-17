// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLodash from 'vue-lodash';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import fas from '@fortawesome/fontawesome-free-solid';
import far from '@fortawesome/fontawesome-free-regular';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/stylesheet/build/all.min.css';
import App from './App';
import router from './router';

fontawesome.library.add(fas, far);

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueLodash);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.prototype.$eventHub = new Vue();
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
