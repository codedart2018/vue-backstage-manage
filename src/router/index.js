import Vue from 'vue';
import VueRouter from 'vue-router';
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
Router.beforeEach(({routeAuth, title, path}, from, next) => {
  Util.title(title);
  let auth;
  if (routeAuth === false) {
    auth = false;
  } else {
    auth = true;
  }
  //获取用户是否登陆;
  let info = window.localStorage.getItem('merchantInfo');
  let token = window.localStorage.getItem('merchantToken');
  if (auth && !token && !info && path !== '/passport/login') {
    next({path: '/passport/login'});
  } else if (path === '/passport/login' && token) {
    next({path: '/'});
  };
  next();
});
//路由后置处理
Router.afterEach(route => {
});
