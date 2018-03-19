/**
 * Created by truncate on 2018/3/18.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import Layout from '@/pages/layout/index.vue';

export const UserRouter = {
  path: '/user/default',
  name: 'UserDefault',
  icon: 'icon-user',
  meta: {
    title: '用户管理',
    routeAuth: true
  },
  component: Layout,
  children: [
    {
      path: '/user/index',
      name: 'UserIndex',
      icon: '',
      meta: {
        title: '用户列表',
        routeAuth: true
      },
      component: resolve => require(['../pages/user/index'], resolve),
      children: []
    },
    {
      path: '/user/detail/:id',
      name: 'UserDetail',
      icon: '',
      meta: {
        title: '用户详情',
        routeAuth: true
      },
      component: resolve => require(['../pages/user/detail'], resolve),
      children: []
    }
  ]
};
