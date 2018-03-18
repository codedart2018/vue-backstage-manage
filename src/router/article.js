/**
 * Created by truncate on 2018/1/30.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import Layout from '@/pages/layout/index.vue';

export const ArticleRouter = {
  path: '/article/default',
  name: 'ArticleDefault',
  icon: 'icon-file',
  meta: {
    title: '文章管理',
    routeAuth: true
  },
  component: Layout,
  children: [
    {
      path: '/article/index',
      name: 'ArticleIndex',
      icon: '',
      meta: {
        title: '文章列表',
        routeAuth: true
      },
      component: resolve => require(['../pages/article/index'], resolve),
      children: []
    },
    {
      path: '/article/add',
      name: 'ArticleAdd',
      icon: '',
      meta: {
        title: '添加文章',
        routeAuth: true
      },
      component: resolve => require(['../pages/article/add'], resolve),
      children: []
    },
    {
      path: '/article/edit/:id',
      name: 'ArticleEdit',
      icon: '',
      meta: {
        title: '编辑文章',
        routeAuth: true
      },
      component: resolve => require(['../pages/article/edit'], resolve),
      children: []
    },
    {
      path: '/article_category/index',
      name: 'ArticleCategory',
      icon: '',
      meta: {
        title: '文章分类',
        routeAuth: true
      },
      component: resolve => require(['../pages/article/category'], resolve),
      children: []
    },
    {
      path: '/article/comment/:id',
      name: 'ArticleComment',
      icon: '',
      meta: {
        title: '文章评论',
        routeAuth: true
      },
      component: resolve => require(['../pages/article/comment'], resolve),
      children: []
    }
  ]
};
