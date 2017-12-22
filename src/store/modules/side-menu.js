/**
 * Created by truncate on 2017/12/19.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 * 右侧导航菜单
 */
import * as types from '../mutation-types';
import Util from '../../libs/util';
import {SubRouter} from '../../router/router';
const state = {
  sideMenuList: JSON.parse(window.localStorage.getItem('sideMenuList')) || {}
};
const mutations = {
  //一次性添加菜单
  [types.ADD_SIDE_MENU] (state, menu) {
    //克隆一个路由数据出来操作
    let cloneRouter = Util.cloneObj(SubRouter);
    cloneRouter.forEach((item, index) => {
      if (typeof (item.children) !== 'undefined' && item.children.length === 0) {
        menu.forEach(storageItem => {
          if (storageItem.name === item.name) {
            cloneRouter[index].title = storageItem.title;
            cloneRouter[index].icon = storageItem.icon;
          }
        });
      } else {
        menu.forEach(storageItem => {
          if (storageItem.name === item.name) {
            cloneRouter[index].title = storageItem.title;
            cloneRouter[index].icon = storageItem.icon;
          }
        });
        //再循环子菜单
        item.children.forEach((childItem, childIndex) => {
          menu.forEach(storageItem => {
            if (storageItem.name === childItem.name) {
              cloneRouter[index].children[childIndex].title = storageItem.title;
              cloneRouter[index].children[childIndex].icon = storageItem.icon;
            }
          });
        });
      }
    });
    window.localStorage.setItem('sideMenuList', JSON.stringify(cloneRouter));
    state.mainMenu = cloneRouter;
  },
  //删除所有菜单
  [types.DEL_SIDE_MENU] (state, menu) {
    window.localStorage.removeItem('sideMenuList');
    state.mainMenu = menu;
    state.auth = {};
  }
};
export default {
  state,
  mutations
};
