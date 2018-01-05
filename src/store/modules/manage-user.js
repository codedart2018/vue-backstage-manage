/**
 * Created by truncate on 2018/1/5.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import * as types from '../mutation-types';

const state = {
  userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || [],
  loginToken: window.localStorage.getItem('loginToken') || ''
};

const mutations = {
  //登陆
  [types.USER_LOGIN] (state, {userInfo, token}) {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
    window.localStorage.setItem('loginToken', token);
    state.userInfo = userInfo;
    state.loginToken = token;
  },
  //退出
  [types.USER_OUT] (state) {
    //用户信息
    window.localStorage.removeItem('userInfo');
    //token信息
    window.localStorage.removeItem('loginToken');
    state.userInfo = {};
    state.loginToken = '';
  },
  //设置登陆token
  [types.SET_LOGIN_TOKEN] (state, token) {
    window.localStorage.setItem('loginToken', token);
    state.loginToken = token;
  }
};

export default {
  state,
  mutations
};
