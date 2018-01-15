/**
 * Created by truncate on 2018/1/15.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import Layout from '@/pages/layout/index.vue';

export const ActivityRouter = {
  path: '/activity/default',
  name: 'ActivityDefault',
  icon: 'icon-huodong',
  meta: {
    title: '商铺管理',
    routeAuth: true
  },
  component: Layout,
  children: [
    {
      path: '/activity/index',
      name: 'ActivityIndex',
      icon: '',
      meta: {
        title: '活动列表',
        routeAuth: true
      },
      component: resolve => require(['../pages/activity/index'], resolve),
      children: []
    }
  ]
};
