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
const state = {
  sideMenuList: JSON.parse(window.localStorage.getItem('sideMenuList')) || {}
};
const mutations = {
  //一次性添加菜单
  [types.ADD_SIDE_MENU] (state, menu) {
    window.localStorage.setItem('mainMenu', JSON.stringify(menu));
    state.mainMenu = menu;
  },
  //删除所有菜单
  [types.DEL_SIDE_MENU] (state, menu) {
    window.localStorage.removeItem('mainMenu');
    state.mainMenu = menu;
    state.auth = {};
  }
};
export default {
  state,
  mutations
};
