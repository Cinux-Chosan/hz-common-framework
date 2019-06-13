/**
 * 根据用户登陆信息获取对应能访问的菜单
 */
import request from "../libs/request";
import API_MAP from "../consts/apiMap";
import routes from "../components/common.layout/router.config";
import { local, remote } from './test'


// 全局暂存已经匹配过的路由
const aHandleRoutes = [];

/** 根据本地路由配置规则重组接口获取后的数据 */
const reCombineRouter = (oRuter = {}) => {
  const { default_url = '', menu_name = '', icon = '', is_menu = '', is_outreach = '', component = '', child = [] } = oRuter;

  // 组合第一层级
  const oResult = {
    path: default_url || '',
    name: menu_name,
    icon: icon || '',
    is_menu,
    is_outreach,
    component,
  };

  // 组合子路由信息
  if (Array.isArray(child) && child.length) {
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

/** 组合本地与远程的数据 */
const localCombineRemote = (oLocal = {}, oRemote = {}) => {
  const { routes = [] } = oLocal;
  const { child = [], is_menu = '', is_outreach = '', menu_name = '', icon = '' } = oRemote;
  // 追加是否外链，是否菜单
  Object.assign(oLocal, {
    is_menu,
    is_outreach,
    name: menu_name || '',
    icon: icon || '',
  });

  if (routes && child && routes.length && child.length) {
    const aNewTmep = [];
    const aNewRoutes = routes.map(item => {
      child.forEach(oc => {
        if (item.path && oc.default_url && item.path === oc.default_url) {
          if (!aHandleRoutes.includes(item.path)) {
            aHandleRoutes.push(item.path);
          }
          localCombineRemote(item, oc);
        } else {
          if (!aHandleRoutes.includes(oc.default_url)) {
            aNewTmep.push(reCombineRouter(oc));
          }
        }
      });

      return item;
    });

    Object.assign(oLocal, {
      routes: aNewTmep.length ? aNewRoutes.concat(aNewTmep) : aNewRoutes,
    });
  }
};

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

      // 存放新增的权限菜单信息
      const oNewTmep = [];
      const data = local.map(item => {
        remote.forEach(op => {
          // 顶层路由相等
          if (item.path && op.default_url && item.path === op.default_url) {
            if (!aHandleRoutes.includes(item.path)) {
              aHandleRoutes.push(item.path);
            }
            // 本机与远程组合
            localCombineRemote(item, op);
          } else {
            if (!aHandleRoutes.includes(op.default_url)) {
              // 没有相同的路由，直接将权限菜单追加
              oNewTmep.push(reCombineRouter(op));
            }
          }
        })

        return item;
      });

      Object.assign(oResult, {
        data: oNewTmep.length ? data.concat(oNewTmep) : data,
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



function zjjMerge(local, remote) {
  local = local || []
  remote = remote || []
  remote.forEach(r => {
    let inLocal = local.find(l => l.path === r.default_url)
    if (inLocal) {
      Object.assign(inLocal, r)
      zjjMerge(inLocal.routes, r.child)
    } else {
      local.push(r)
    }
  })
}

