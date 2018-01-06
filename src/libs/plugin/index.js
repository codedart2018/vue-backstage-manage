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
};

export default Plugin;
