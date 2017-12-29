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
export const SubRouter = [
  {
    path: '/permission/index',
    name: 'Permission',
    icon: 'locked',
    meta: {
      title: '角色权限',
      routeAuth: true
    },
    component: Layout,
    children: [
      {
        path: '/permission/role',
        name: 'Role',
        icon: 'person-stalker',
        meta: {
          title: '角色管理',
          routeAuth: true
        },
        component: resolve => require(['../pages/permission/role'], resolve),
        children: [] //一级二级没有子菜单 也必须加上
      },
      {
        path: '/permission/rule',
        name: 'Rule',
        icon: 'fork-repo',
        meta: {
          title: '权限节点',
          routeAuth: true
        },
        component: resolve => require(['../pages/permission/rule'], resolve),
        children: []
      },
      {
        path: '/permission/administrator',
        name: 'Administrator',
        icon: 'person',
        meta: {
          title: '后台用户',
          routeAuth: true
        },
        component: resolve => require(['../pages/permission/administrator'], resolve),
        children: []
      },
      {
        path: '/permission/authorize/:id?',
        name: 'Authorize',
        icon: 'person',
        meta: {
          title: '后台用户',
          routeAuth: true,
          display: 0
        },
        component: resolve => require(['../pages/permission/authorize'], resolve),
        children: []
      }
    ]
  }
];
//demo
const Demo = {
  path: '/demo', //其他页面，强制跳转到登录页面
  name: '测试',
  icon: '',
  meta: {
    title: '测试',
    routeAuth: false
  },
  component: resolve => require(['../pages/demo/demo'], resolve)
};
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
    routeAuth: true
  },
  component: Layout,
  children: [
    ...SubRouter
  ]
};
//登陆路由
const Login = {
  path: '/passport/login',
  name: 'passportLogin',
  icon: 'home',
  meta: {
    title: '欢迎登陆',
    routeAuth: false
  },
  component: resolve => require(['../pages/passport/login'], resolve),
  children: []
};
//锁屏路由
const Lock = {
  path: '/passport/lock',
  name: 'passportLock',
  icon: 'locked',
  meta: {
    title: '登陆认证',
    routeAuth: false
  },
  component: resolve => require(['../pages/passport/lock'], resolve),
  children: []
};
//导出所有路由
export const Routers = [
  MainRouter,
  Login,
  Lock,
  Demo,
  NotFound
];
