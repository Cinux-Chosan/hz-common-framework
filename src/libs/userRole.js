/**
 * 根据用户登陆信息获取对应能访问的菜单
 */
import request from '../libs/request';
import API_MAP from '../consts/apiMap';

/** 菜单获取 */
const getPrivilegeMenus = () => request(API_MAP.getPrivilegeMenus);

/** 获取权限菜单，结果已树形菜单返回 */ 
const getPrivilegeMenusTree = () => request(API_MAP.getPrivilegeMenusTree);

export { getPrivilegeMenus, getPrivilegeMenusTree };
