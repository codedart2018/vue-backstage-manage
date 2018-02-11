/**
 * Created by truncate on 2017/12/18.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import methodMap from './methodMap';
import AsInst from './axios';
import {Message} from 'iview';
class Http {
}
Http.install = function (Vue) {
  /**
   * 全局请求接口
   * @param method 方法
   * @param opts 参数
   * @param toast 是否提示
   * @returns {string}
   */
  Vue.prototype.request = function (method, opts, toast) {
    let m = methodMap[method];
    if (m) {
      let optsType = typeof (opts);
      if (optsType === null || optsType !== 'object') {
        opts = {};
      }
      if (typeof m.method === 'undefined') {
        console.log('method 错误', '缺少请求 method 方法', '\n');
        return false;
      }
      //如果有给 toast 参数则显示 loading 加载数据
      if (toast && typeof (toast) === 'boolean') {
        Vue.prototype.$loading('加载中...');
      } else if (toast && typeof (toast) === 'string') {
        Vue.prototype.$loading(toast);
      }
      if (m.method === 'get') {
        return Vue.prototype.apiGet(m.url, opts);
      } else if (m.method === 'post') {
        return Vue.prototype.apiPost(m.url, opts);
      } else {
        return false;
      }
    } else {
      closeLoading();
      console.log('url 错误', '返回结果：err = ', '无法请求，无效的请求！', '\n');
    }
  };
  /**
   * POST 请求 无提示
   * @param url 请求URL
   * @param data 请求数据
   * @param toast 是否显示 modal
   * @returns {Promise}
   */
  Vue.prototype.apiPost = function (url, data, toast = false) {
    if (toast && typeof (toast) === 'boolean') {
      Vue.prototype.$loading('加载中...');
    } else if (toast && typeof (toast) === 'string') {
      Vue.prototype.$loading(toast);
    }
    return new Promise((resolve, reject) => {
      AsInst.post(url, data).then((response) => {
        setTimeout(() => closeLoading(), 800);
        resolve(response.data);
      }).catch((error) => {
        if (error.status === 200) {
          if (!error.data) {
            Message.error('接口输出异常...');
            console.log('Customize Notice', error);
          } else if (error.data && error.data.code === 2000) {
            Message.error(error.data.msg);
            console.log('Customize Notice', error);
          }
        } else if (error.status === 500) {
          Message.error('后端服务请求500错误,如一直出现错误,请联系我们');
          console.log('Customize Notice', error);
        } else {
          Message.error('服务请求出错');
          console.log('Customize Notice', error);
        }
        closeLoading();
        reject(error);
      });
    });
  };
  /**
   * GET 请求 无提示
   * @param url 请求URL
   * @param data 请求数据
   * @returns {Promise}
   */
  Vue.prototype.apiGet = function (url, data, toast = false) {
    if (toast && typeof (toast) === 'boolean') {
      Vue.prototype.$loading('加载中...');
    } else if (toast && typeof (toast) === 'string') {
      Vue.prototype.$loading(toast);
    }
    return new Promise((resolve, reject) => {
      AsInst.get(url, {
        params: data
      }).then((response) => {
        setTimeout(() => closeLoading(), 800);
        resolve(response.data);
      }).catch((error) => {
        if (error.status === 200) {
          if (!error.data) {
            Message.error('接口输出异常...');
            console.log('Customize Notice', error);
          } else if (error.data && error.data.code === 2000) {
            this.$Message.error(error.data.msg);
            console.log('Customize Notice', error);
          }
        } else if (error.status === 500) {
          Message.error('后端服务请求500错误,如一直出现错误,请联系我们');
          console.log('Customize Notice', error);
        } else {
          Message.error('服务请求出错');
          console.log('Customize Notice', error);
        }
        closeLoading();
        reject(error);
      });
    });
  };
  /**
   * 关闭方法
   */
  function closeLoading() {
    Vue.prototype.$loading.close();
  }
};
export default Http;
