import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: resolve => require(['../pages/common/manage'], resolve),
      children: []
    }
  ]
})
