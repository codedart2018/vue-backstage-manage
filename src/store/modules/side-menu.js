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
  //add menu
  [types.ADD_SIDE_MENU] (state, menu) {
    //clone router
    let cloneRouter = Util.cloneObj(SubRouter);
    let newMenu = eachMenu(cloneRouter, menu);
    window.localStorage.setItem('sideMenuList', JSON.stringify(newMenu));
    state.sideMenuList = newMenu;
  },
  //delete all menu
  [types.DEL_SIDE_MENU] (state) {
    window.localStorage.removeItem('sideMenuList');
    state.sideMenuList = [];
  },
  [types.GET_SIDE_MENU] (state) {
  }
};
function eachMenu(menu = [], compare = [], routes = []) {
  if (menu.length <= 0 || compare.length <= 0) return routes;
  for (let item of menu) {
    compare.forEach(inItem => {
      if (inItem.name === item.name) {
        let arr = {
          path: item.path,
          name: item.name,
          icon: item.icon,
          title: item.title
        };
        //recursion menu
        if (item.children && item.children.length !== 0) {
          arr.children = eachMenu(item.children, compare);
        }
        routes.push(arr);
      }
    });
  }
  return routes;
}
export default {
  state,
  mutations
};
