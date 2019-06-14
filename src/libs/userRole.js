/**
 * 根据用户登陆信息获取对应能访问的菜单
 */
import request from "../libs/request";
import API_MAP from "../consts/apiMap";
import routes from "../components/common.layout/router.config";

const getAtt = item => {
  const oResult = {
    path: item.default_url || item.path,
    name: item.menu_name || item.name,
    icon: item.icon,
  }

  if('is_menu' in item) {
    Object.assign(oResult, {
      is_menu: item.is_menu,
    });
  }

  if('is_outreach' in item) {
    Object.assign(oResult, {
      is_outreach: item.is_outreach,
    });
  }

  if('component' in item) {
    Object.assign(oResult, {
      component: item.component,
    });
  }

  return oResult;
};


/** 根据本地路由配置规则重组接口获取后的数据 */
const filterData = (routes = []) => {
  routes.forEach(item => {
    // 删除额外信息
    delete item.default_url;
    delete item.child;
    delete item.display_order;
    // 删除routes为空的数据
    if (item.routes && item.routes.length === 0) {
      delete item.routes;
    }
    
    // 名称以线上配置为准
    item.name = item.menu_name || item.name;

    if (item.routes) {
      filterData(item.routes);
    }
  });
};

/** 菜单合并 */
function mergeMenu(local = [], remote = []) {
  remote.forEach(r => {
    let inLocal = local.find(l => l.path === r.default_url);
    if (inLocal) {
      Object.assign(inLocal, r);
      inLocal.routes = inLocal.routes || [];
      r.child = r.child || [];
      mergeMenu(inLocal.routes, r.child);
    } else {
      local.push(r);
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

      // 合并菜单
      mergeMenu(routes, res);
      // 过滤数据
      filterData(routes);

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
