/**
 * 根据用户登陆信息获取对应能访问的菜单
 */
import request from '../libs/request';
import API_MAP from '../consts/apiMap';
import routes from '../components/common.layout/router.config';

/** 菜单获取 */
const getPrivilegeMenus = () => request(API_MAP.getPrivilegeMenus);

/** 获取权限菜单，结果已树形菜单返回
 *  根据本地路由配置和接口返回配置组装路由信息
 */ 
const getPrivilegeMenusTree = function() {
  
  const res = request(API_MAP.getPrivilegeMenusTree);

  return new Promise((resolve) => {
    resolve(routes);
  })
};

export { getPrivilegeMenus, getPrivilegeMenusTree };
