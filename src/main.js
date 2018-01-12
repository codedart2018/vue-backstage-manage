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
import Plugin from './libs/plugin/index';
if (process.env.NODE_ENV === 'development') {
  require('iview/dist/styles/iview.css');
  require('iview/src/styles/index.less');
}
require('./assets/styles/common/customize.less');
require('./assets/styles/common/index.less');
Vue.use(iView);
Vue.use(Toast);
Vue.use(Http);
Vue.use(Plugin);
window.Util = Util;
Vue.config.productionTip = false;
//高德地图
window.DMap = {
  resizeEnable: true,
  zoom: 13,
  center: [105.926828, 29.356573],
  key: 'f582bf3f0ed6a17340eae1c54b475833'
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  template: '<App/>',
  components: { App }
});
