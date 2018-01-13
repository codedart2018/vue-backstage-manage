/**
 * Created by truncate on 2018/1/12.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
/**
 * 删除script标签节点
 * @param id
 * @param position
 */
export const removeScript = (id = 'customizeDom', position = 'body') => {
  let findDom = document.getElementById(id);
  if (findDom) {
    if (position === 'head') {
      document.head.removeChild(findDom);
    } else if (position === 'body') {
      document.body.removeChild(findDom);
    }
  }
};
/**
 * 创建script标签节点
 * @param url
 * @param id
 * @param position
 * @returns {Promise}
 */
export const createScript = (url, id = 'customizeDom', position = 'body') => {
  //let findDom = document.getElementById('mapDom');
  //findDom.appendChild(script);
  const promise = new Promise(function (resolve, reject) {
    let scriptElement = document.createElement('script');
    scriptElement.src = url;
    scriptElement.type = 'text/javascript';
    scriptElement.charset = 'utf-8';
    scriptElement.id = id;
    if (position === 'head') {
      document.head.appendChild(scriptElement);
    } else if (position === 'body') {
      document.body.appendChild(scriptElement);
    }
    if (scriptElement.nodeName === 'SCRIPT') {
      resolve();
    } else {
      reject(new Error('Could not script image at ' + scriptElement.src));
    }
  });
  return promise;
};
