let Util = {};
/**
 * 修改页面标题
 * @param title
 */
Util.title = (title) => {
  let newTitle = '';
  if (title) {
    newTitle = title;
  } else {
    newTitle = '首页';
  }
  window.document.title = newTitle;
};
/**
 * 检查数组下标是否存在(不是检查值)
 * @param arr
 * @param need
 * @returns {boolean}
 */
Util.indexArray = (arr, need) => {
  let i = arr.length;
  while (i--) {
    if (i === need) {
      return true;
    }
  }
  return false;
};
/**
 * 检查数据值是否存在
 * @param arr
 * @param value
 * @returns {boolean}
 */
Util.inArray = (arr, value) => {
  let i = arr.length;
  while (i--) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
};
/**
 * 移除数组里某个值
 * @param arr
 * @param val
 */
Util.removeArrayValue = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
};
/**
 * 获得文件名
 * @param str
 * @returns {string}
 */
Util.baseName = (str) => {
  // \ 杠转 /
  let path = str.replace(/\\/g, '/');
  // 2.截取文件名
  return path.substring(path.lastIndexOf('/') + 1, path.length);
};
/**
 * 对象/数组克隆用的 数组可直接用 array.concat();来克隆,但是concat克隆出来会影响到数据
 * @param obj
 * @returns {*}
 */
Util.cloneObj = (obj) => {
  let str = obj.constructor === Array ? [] : {};
  let newObj = obj.constructor === Array ? [] : {};
  //判断是否是对象
  if (typeof obj !== 'object') {
    return newObj;
  } else if (window.JSON) {
    str = JSON.stringify(obj); //序列化对象
    newObj = JSON.parse(str); //还原
  } else {
    for (let i in obj) {
      newObj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i];
    }
  }
  return newObj;
};
/**
 * 处理路由params参数
 * @param path
 * @param params
 * @returns {*}
 */
Util.routerParams = (path, params) => {
  //参数处理 之前理解错了 地址栏参数获取是query
  if (params) {
    let lastStr = path.charAt(path.length - 1);
    let tmpStr = '';
    for (let p of params.split(',')) {
      tmpStr += '/:' + p + '?';
    }
    if (lastStr === '/') {
      path = path + tmpStr.substr(1);
    } else {
      path = path + tmpStr;
    }
  }
  return path;
};
/**
 * 获得屏幕大小
 * @returns {{width: Number, height: Number}}
 */
Util.screenSize = () => {
  let width = window.screen.width;
  let height = window.screen.height;
  return {width: width, height: height};
};
/**
 * 返回当前日期
 * @returns {string}
 */
Util.currentDate = () => {
  let myDate = new Date();
  let year = parseInt(myDate.getFullYear());    //获取完整的年份(4位,1970-????)
  let month = parseInt(myDate.getMonth()) + 1;  //获取当前月份(0-11,0代表1月)
  let day = parseInt(myDate.getDate());         //获取当前日(1-31)
  //小于10的时候
  if (month < 10) {
    month = 0 + month.toString();
  }
  if (day < 10) {
    day = 0 + day.toString();
  }
  return year + '-' + month + '-' + day;
};
/**
 * 给一个日期返回时间戳
 * @param date
 * @returns {number}
 */
Util.getTimestamp = (date) => {
  let stringTime = date;
  return Date.parse(new Date(stringTime));
};
export default Util;
