import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mainLayout',
      meta: {
        title: '管理中心',
        routeAuth: false
      },
      component: resolve => require(['../pages/common/layout'], resolve),
      children: []
    }
  ]
});
