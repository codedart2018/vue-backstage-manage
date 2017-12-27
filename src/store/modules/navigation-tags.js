/**
 * Created by truncate on 2017/12/17.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import * as types from '../mutation-types';
const state = {
  listData: JSON.parse(window.localStorage.getItem('tagMenuList')) || []
};
const mutations = {
  //路由添加标签
  [types.ADD_NAVIGATION_TAGS] (state, params) {
    if (state.listData.some(v => v.path === params.path)) return false;
    let data = {
      params: [],
      name: params.name,
      path: params.path,
      query: [],
      title: params.title
    };
    state.listData.push(data);
    window.localStorage.setItem('tagMenuList', JSON.stringify(state.listData));
  },
  //关闭当前标签
  removeCurrentTag (state, name) {
    state.listData.map((item, index) => {
      if (item.name === name) {
        state.listData.splice(index, 1);
      }
    });
  },
  //关闭所有
  removeAllTag (state) {
    state.listData.splice(0);
  },
  removeOtherTag (state, vm) {
    let currentName = vm.$route.name;
    let tmp = {};
    state.listData.forEach((item) => {
      if (item.name === currentName) {
        tmp = item;
      }
    });
    state.listData.splice(0);
    state.listData.push(tmp);
  }
};
export default {
  state,
  mutations
};
