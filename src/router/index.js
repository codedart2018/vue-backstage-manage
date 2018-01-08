import Vue from 'vue';
import VueRouter from 'vue-router';
import {Routers} from './router';
import Util from '../libs/util';
if (process.env.NODE_ENV === 'development') {
  Vue.use(VueRouter);
}
//路由配置
const RouterConfig = {
  //mode: 'history',
  routes: Routers
};
export const Router = new VueRouter(RouterConfig);
//路由前置处理
Router.beforeEach(({meta, path}, from, next) => {
  Util.title(meta.title);
  let auth;
  if (meta.routeAuth === false) {
    auth = false;
  } else {
    auth = true;
  }
  //获取用户是否登陆;
  let token = window.localStorage.getItem('loginToken');
  if (auth && !token && path !== '/passport/login' && path !== '/passport/lock') {
    next({path: '/passport/login'});
  } else if (path === '/passport/login' && token) {
    next({path: '/'});
  }
  next();
});
//路由后置处理
Router.afterEach(route => {
});
