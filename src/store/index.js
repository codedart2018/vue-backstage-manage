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
import * as actions from './actions';
import * as getters from './getters';
import createLogger from 'vuex/dist/logger';
import NavigationTags from './modules/navigation-tags';
import SideMenu from './modules/side-menu';
import ManageUser from './modules/manage-user';
import SiteConfig from './modules/site-config';
if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex);
}
const debug = process.env.NODE_ENV !== 'production';
// store可以理解为一个容器，包含着应用中的state等
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    NavigationTags,
    SideMenu,
    ManageUser,
    SiteConfig
  },
  strict: debug,
  plugins: [createLogger()]
});
