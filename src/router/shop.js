/**
 * Created by truncate on 2018/1/8.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import Layout from '@/pages/layout/index.vue';

export const ShopRouter = {
  path: '/shop/default',
  name: 'Shop',
  icon: 'bag',
  meta: {
    title: '商铺管理',
    routeAuth: true
  },
  component: Layout,
  children: [
    {
      path: '/service_tag/index',
      name: 'serviceTagIndex',
      icon: 'pricetag',
      meta: {
        title: '服务标签',
        routeAuth: true
      },
      component: resolve => require(['../pages/service-tag/index'], resolve),
      children: []
    },
    {
      path: '/area/index',
      name: 'AreaIndex',
      icon: 'map',
      meta: {
        title: '地区管理',
        routeAuth: true
      },
      component: resolve => require(['../pages/area/index'], resolve),
      children: []
    },
    {
      path: '/shop/category',
      name: 'ShopCategory',
      icon: 'social-buffer-outline',
      meta: {
        title: '商铺分类',
        routeAuth: true
      },
      component: resolve => require(['../pages/shop/category'], resolve),
      children: []
    },
    {
      path: '/shop/index',
      name: 'ShopIndex',
      icon: 'grid',
      meta: {
        title: '商铺列表',
        routeAuth: true
      },
      component: resolve => require(['../pages/shop/index'], resolve),
      children: []
    },
    {
      path: '/shop/detail/:id?',
      name: 'ShopDetail',
      icon: 'grid',
      meta: {
        title: '商铺详情',
        routeAuth: true
      },
      component: resolve => require(['../pages/shop/detail'], resolve),
      children: []
    }
  ]
};
