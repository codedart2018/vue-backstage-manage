/**
 * Created by truncate on 2017/12/17.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from '../actions';
import * as getters from '../getters';
import NavigationTags from '../modules/navigation-tags';
Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules: {
    NavigationTags
  }
});
