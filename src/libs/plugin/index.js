/**
 * Created by truncate on 2017/7/26.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
class Plugin {
}

Plugin.install = function (Vue, options) {
  /** 日期过滤插件 **/
  Vue.prototype.$formatDate = function (value, format = 'yyyy-MM-dd h:m:s') {
    if (!value) return;
    //防止PHP后台输出为10位的时间戳
    if (value.length === 10) {
      value = value * 1000;
    }
    let newFormat = '';
    if (format) {
      newFormat = format;
    } else {
      newFormat = 'yyyy-MM-dd h:m:s';
    }
    let time = new Date(parseInt(value));
    let date = {
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds(),
      'q+': Math.floor((time.getMonth() + 3) / 3),
      'S+': time.getMilliseconds()
    };
    if (/(y+)/i.test(newFormat)) {
      newFormat = newFormat.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in date) {
      if (new RegExp('(' + k + ')').test(newFormat)) {
        newFormat = newFormat.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
      }
    }
    return newFormat;
  };
  /** 金钱格式化 **/
  Vue.prototype.$formatMoney = (money, num = 2) => {
    num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat((money + '').replace(/[^\d\\.-]/g, '')).toFixed(num) + '';
    let l = money.split('.')[0].split('').reverse();
    let r = money.split('.')[1];
    let t = '';
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
  };
  /**
   * 判断获取字符串长度
   * @param str
   * @returns {number}
   */
  Vue.prototype.$strLen = (str) => {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        len += 1;
      } else {
        len++;
      }
    }
    return len;
  };
  /**
   * 除法计算
   * @param arg1
   * @param arg2
   * @returns {number}
   */
  Vue.prototype.$accDiv = (arg1, arg2) => {
    let t1 = 0;
    let t2 = 0;
    let r1;
    let r2;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  };
  /**
   * 乘法计算
   * @param arg1
   * @param arg2
   * @returns {number}
   */
  Vue.prototype.$accMul = (arg1, arg2) => {
    let m = 0;
    let s1 = arg1.toString();
    let s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {
    }
    try {
      m += s2.split('.')[1].length;
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  };
  /**
   * 减法计算
   * @param arg1
   * @param arg2
   * @returns {number}
   */
  Vue.prototype.$accSub = (arg1, arg2) => {
    let r1, r2, m, n;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
  };
  /**
   * 加法计算
   * @param arg1
   * @param arg2
   * @returns {number}
   */
  Vue.prototype.$accAdd = (arg1, arg2) => {
    let r1, r2, m;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return Number((arg1 * m + arg2 * m) / m);
  };
};
export default Plugin;
