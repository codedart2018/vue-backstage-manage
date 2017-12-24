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
//import Util from '../libs/util';
//菜单路由
export const SubRouter = [
  {
    path: '/permission/index',
    name: 'Permission',
    icon: 'locked',
    title: '角色权限',
    routeAuth: true,
    component: Layout,
    children: [
      {
        path: '/permission/role',
        name: 'Role',
        icon: 'person-stalker',
        title: '角色管理',
        routeAuth: true,
        component: resolve => require(['../pages/permission/role'], resolve),
        children: [] //一级二级没有子菜单 也必须加上
      },
      {
        path: '/permission/rule',
        name: 'Rule',
        icon: 'fork-repo',
        title: '权限节点',
        routeAuth: true,
        component: resolve => require(['../pages/permission/rule'], resolve),
        children: []
      },
      {
        path: '/permission/administrator',
        name: 'Administrator',
        icon: 'person',
        title: '后台用户',
        routeAuth: true,
        component: resolve => require(['../pages/permission/administrator'], resolve),
        children: []
      }
    ]
  }
];
// //取出后台菜单
// //取出菜单
// let sideMenuList = window.localStorage.getItem('sideMenuList');
// let storageMenu = JSON.parse(sideMenuList);
// //克隆一个路由数据出来操作
// let cloneRouter = Util.cloneObj(SubRouter);
// console.log(SubRouter, 90);
// console.log(eachMenu(cloneRouter));
// //循环处理菜单
// function eachMenu(menu = [], routes = []) {
//   if (menu.length <= 0) return routes;
//   for (let item of menu) {
//     storageMenu.forEach(storageItem => {
//       if (storageItem.name === item.name) {
//         let arr = {
//           path: item.path,
//           name: item.name,
//           icon: item.icon,
//           title: item.title
//         };
//         //递归子菜单
//         if (item.children && item.children.length !== 0) {
//           arr.children = eachMenu(item.children);
//         }
//         routes.push(arr);
//       }
//     });
//   }
//   return routes;
// }
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
  routeAuth: true,
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
  title: '首页',
  routeAuth: false,
  component: resolve => require(['../pages/passport/login'], resolve),
  children: []
};
//导出所有路由
export const Routers = [
  MainRouter,
  Login,
  NotFound
];
