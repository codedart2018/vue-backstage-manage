let Util = {
  logSwitch: true
};
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
export default Util;
