/**
 * Created by truncate on 2018/4/10.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import Layout from '@/pages/layout/index.vue';

export const MessageServicesRouter = {
  path: '/message_services/default',
  name: 'MessageServicesDefault',
  icon: 'icon-huodong',
  meta: {
    title: '消息服务',
    routeAuth: true
  },
  component: Layout,
  children: [
    {
      path: '/message_services/index',
      name: 'MessageServicesIndex',
      icon: '',
      meta: {
        title: '服务列表',
        routeAuth: true
      },
      component: resolve => require(['../pages/messageServices/index'], resolve),
      children: []
    },
    {
      path: '/message_services/template',
      name: 'MessageServicesTemplate',
      icon: '',
      meta: {
        title: '模板管理',
        routeAuth: true
      },
      component: resolve => require(['../pages/messageServices/template'], resolve),
      children: []
    },
    {
      path: '/message_services/log',
      name: 'MessageServicesLog',
      icon: '',
      meta: {
        title: '服务日志',
        routeAuth: true
      },
      component: resolve => require(['../pages/messageServices/log'], resolve),
      children: []
    }
  ]
};
