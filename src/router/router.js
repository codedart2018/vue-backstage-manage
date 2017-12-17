/**
 * Created by truncate on 2017/12/8.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import Layout from '@/pages/layout/index.vue';
//菜单路由
export const MenuRouters = [
  {
    path: '/demo/demo',
    name: 'Demo',
    icon: 'ios-home',
    title: '测试demo',
    meta: {
      title: '测试demo',
      routeAuth: false
    },
    component: resolve => require(['../pages/demo/demo'], resolve),
    children: [] //一级没有子菜单 也必须加上
  },
  {
    path: '/manage_role',
    name: 'manageRole',
    icon: 'locked',
    title: '角色权限',
    meta: {
      title: '角色权限',
      routeAuth: false
    },
    component: Layout,
    children: [
      {
        path: '/role',
        name: 'Role',
        icon: 'person-stalker',
        title: '角色管理',
        meta: {
          title: '角色权限',
          routeAuth: false
        },
        component: resolve => require(['../pages/manage-role/role'], resolve),
        children: []
      },
      {
        path: '/rule',
        name: 'Rule',
        icon: 'fork-repo',
        title: '节点管理',
        meta: {
          title: '节点管理',
          routeAuth: false
        },
        component: resolve => require(['../pages/manage-role/rule'], resolve),
        children: []
      },
      {
        path: '/administrator',
        name: 'Administrator',
        icon: 'person',
        title: '管理员管理',
        meta: {
          title: '后台用户管理',
          routeAuth: false
        },
        component: resolve => require(['../pages/manage-role/administrator'], resolve),
        children: []
      }
    ]
  }
];
//404未找到路由
export const NotFound = {
  path: '*', //其他页面，强制跳转到登录页面
  name: '通配路由',
  icon: '',
  meta: {
    title: '抱歉未找到该页面',
    routeAuth: false
  },
  //redirect: '/login'
  component: resolve => require(['../pages/common/404'], resolve)
};
//主路由
export const MainRouter = {
  path: '/',
  name: 'mainLayout',
  icon: 'home',
  title: '首页',
  meta: {
    title: '首页',
    routeAuth: false
  },
  component: Layout,
  children: [
    ...MenuRouters
  ]
};
//导出所有路由
export const Routers = [
  MainRouter,
  NotFound
];
