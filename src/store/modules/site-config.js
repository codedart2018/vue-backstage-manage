/**
 * Created by truncate on 2018/1/19.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import * as types from '../mutation-types';
const state = {
  data: JSON.parse(window.localStorage.getItem('siteConfig')) || []
};
const mutations = {
  [types.SITE_CONFIG] (state, data) {
    window.localStorage.setItem('siteConfig', JSON.stringify(data));
    state.data = data;
  }
};
export default {
  state,
  mutations
};
