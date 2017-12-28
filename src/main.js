// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'; // 解决恶心的IE6
import Vue from 'vue';
import App from './App';
import {Router} from './router';
import Store from './store/index';
import iView from 'iview';
import Toast from './libs/toast/';
import Http from './libs/http';
import Util from './libs/util';
if (process.env.NODE_ENV === 'development') {
  require('iview/dist/styles/iview.css');
  require('iview/src/styles/index.less');
}
require('./assets/styles/common/customize.less');
require('./assets/styles/common/index.less');
Vue.use(iView);
Vue.use(Toast);
Vue.use(Http);
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
