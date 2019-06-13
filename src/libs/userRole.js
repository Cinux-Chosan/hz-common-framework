/**
 * 根据用户登陆信息获取对应能访问的菜单
 */
import request from "../libs/request";
import API_MAP from "../consts/apiMap";
import routes from "../components/common.layout/router.config";

/** 根据本地路由配置规则重组接口获取后的数据 */
const reCombineRouter = (oRuter = {}) => {
  const { default_url = '', menu_name = '', icon = '', is_menu = '', is_outreach = '', child = [] } = oRuter;

  const oResult = {
    path: default_url || '',
    name: menu_name,
    icon: icon || '',
    is_menu,
    is_outreach,
  };

  if (child && child.length) {
   const routes = [];
   child.forEach(item => {
    routes.push(reCombineRouter(item));
   });

   Object.assign(oResult, {
     routes,
   });
  }

  return oResult;
};

function zjjMerge(local = [], remote = []) {
  remote.forEach(r => {
    let inLocal = local.find(l => l.path === r.default_url);
    if (inLocal) {
      Object.assign(inLocal, reCombineRouter(r));
      zjjMerge(inLocal.routes || [], r.child || []);
    } else {
      local.push(reCombineRouter(r));
    }
  });
}

/** 菜单获取 */
const getPrivilegeMenus = () => request(API_MAP.getPrivilegeMenus);

/** 获取权限菜单，结果已树形菜单返回
 *  根据本地路由配置和接口返回配置组装路由信息
 */
const getPrivilegeMenusTree = () =>
  request(API_MAP.getPrivilegeMenusTree).then(res => {
    // 返回数据基本结构
    const oResult = {
      code: -1,
      success: false,
      message: "获取权限菜单失败！",
      data: []
    };
    // 是否成功
    let bSuccess = false;

    if (Array.isArray(res) && res.length > 0 && Array.isArray(routes) && routes.length) {
      bSuccess = true;
      zjjMerge(routes, res)

      Object.assign(oResult, {
        data: routes,
        code: 0,
        message: '获取权限菜单成功',
        success: true,
      });
    }

    // 返回菜单组装结果
    return new Promise((resolve, reject) => {
      if (bSuccess) {
        resolve(oResult);
      } else {
        reject(oResult);
      }
    });
  });

export { getPrivilegeMenus, getPrivilegeMenusTree };
