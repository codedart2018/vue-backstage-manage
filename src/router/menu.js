/**
 * Created by truncate on 2017/11/26.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
const menu = [
  {
    path: '/index',
    name: 'index',
    icon: 'home',
    children: []
  },
  {
    path: '/',
    name: '权限角色',
    icon: 'cloud',
    children: [
      {
        path: '/chart',
        name: '角色管理',
        icon: 'ionic',
        children: []
      },
      {
        path: '/list',
        name: '权限管理',
        icon: 'ionic',
        children: []
      },
      {
        path: '/userInfo',
        name: '节点管理',
        icon: 'ionic',
        children: []
      },
      {
        path: '/userList',
        name: '管理员',
        icon: 'ionic',
        children: []
      }
    ]
  },
  {
    path: '/index',
    name: 'haha',
    icon: 'star',
    children: []
  },
  {
    path: '/index',
    name: 'gogogo to',
    icon: 'heart',
    children: []
  }
];
export default menu;
