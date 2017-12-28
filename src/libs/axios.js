/**
 * Created by truncate on 2017/12/18.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
import Axios from 'axios';
import Qs from 'qs';
import {Router} from '../router';
const config = {
  //baseURL: '',
  timeout: 2000, //超过两秒的请求请用微服务来处理
  withCredentials: true, //是否允许跨域
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', 'X-Requested-With': 'XMLHttpRequest'},
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    data = Qs.stringify(data);
    return data;
  }],
  //返回数据类型
  responseType: 'json'
};
//那年乱世如麻，愿你们来世拥有锦绣年华.此生无悔入华夏，来世还在种花家
const AsInst = Axios.create(config);
//请求拦截器
AsInst.interceptors.request.use((config) => {
  //若是有做鉴权token , 就给头部带上token
  if (window.localStorage.getItem('loginToken')) {
    config.headers.Authorization = `${window.localStorage.getItem('loginToken')}`;
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});
//响应拦截器
AsInst.interceptors.response.use(response => {
  //检查数据是否返回NULL
  if (response.data === null) {
    return Promise.reject(response);
  }
  //检查是否有权限
  if (response.data.code === 2000 && response.data.status === false) {
    return Promise.reject(response);
  }
  //检查登陆信息是否还存在
  if (response.data.code === 2001 && response.data.status === false) {
    window.localStorage.removeItem('userInfo');
    window.localStorage.removeItem('loginToken');
    Router.push({
      path: '/passport/login'
    });
    return Promise.reject(response);
  }
  return response;
}, (error) => {
  // 下面是接口回调的status ,因为我做了一些错误页面,所以都会指向对应的报错页面
  if (error.response.status === 404) {
    Router.push({
      path: '/error/404'
    });
  }
  //请求错误时做些事
  return Promise.reject(error);
});
export default AsInst;
