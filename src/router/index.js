import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import {Routers} from './router';
import Util from '../libs/util';
Vue.use(VueRouter);
//路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};
export const Router = new VueRouter(RouterConfig);
//路由前置处理
Router.beforeEach(({meta, path}, from, next) => {
  iView.LoadingBar.start();
  //判断是否刷新
  if (path === '/refresh') {
    next({path: from.path});
    next();
  }
  Util.title(meta.title);
  next();
});
//路由后置处理
Router.afterEach(route => {
  iView.LoadingBar.finish();
});
