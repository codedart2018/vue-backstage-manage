// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'; // 解决恶心的IE6
import Vue from 'vue';
import App from './App';
import {Router} from './router';
import Store from './vuex/store/index';
import Util from './libs/util';
import 'iview/dist/styles/iview.css'; // 使用 IVIEW CSS
import './assets/styles/common/customize.less';
import './assets/styles/common/index.less';

window.Util = Util;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  template: '<App/>',
  components: { App }
});
