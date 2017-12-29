/**
 * Created by truncate on 2017/12/18.
 * Author: 带鞋拖地
 * QQ: 327056088
 *
 * 《江畔独步寻花》· 杜甫
 * 黄四娘家花满蹊，千朵万朵压枝低。
 * 留连戏蝶时时舞，自在娇莺恰恰啼。
 */
const methodMap = {
  /** 管理登陆接口 **/
  AdminLogin: {url: '/admin/passport/login', method: 'post'},
  /** 角色列表 **/
  AdminGetRole: {url: '/admin/permission/role', method: 'get'},
  /** 添加角色 **/
  AdminAddRole: {url: '/admin/permission/add_role', method: 'post'},
  /** 编辑角色 **/
  AdminEditRole: {url: '/admin/permission/edit_role', method: 'post'},
  /** 删除角色 **/
  AdminDelRole: {url: '/admin/permission/delete_role', method: 'post'},
  /** 角色授权列表 **/
  Authorize: {url: '/admin/permission/authorize', method: 'get'},
  /** 保存角色授权 **/
  SaveAuth: {url: '/admin/permission/save_authorize', method: 'post'},
  /** 后台用户列表 **/
  AdminUser: {url: '/admin/user/index', method: 'get'},
  /** 添加后台用户 **/
  AdminAddUser: {url: '/admin/user/add', method: 'post'},
  /** 编辑后台用户 **/
  AdminEditUser: {url: '/admin/user/edit', method: 'post'},
  /** 重置后台用户密码 **/
  RestPassword: {url: '/admin/user/rest_password', method: 'post'}
};
export default methodMap;
