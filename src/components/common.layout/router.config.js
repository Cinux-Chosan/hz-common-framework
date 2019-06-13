const routes = [
  {
    path: '/user',
    name: 'home1',
    redirect: '/user/login',
    component: '../test',
  },
  {
    path: '/',
    name: '',
    component: '../test',
    routes: [
      {
        path: '/dashbord',
        name: '首页',
        icon: 'setting',
        component: '../test',
      },
      {
        path: '/usermanage',
        name: '用户管理',
        icon: 'setting',
      },
      {
        path: '/systemConfig',
        name: '系统配置',
        icon: 'setting',
        routes: [
          {
            path: '/systemConfig/t1',
            name: '组织管理',
            component: '../test',
          },
          {
            path: '/systemConfig/t2',
            name: '角色管理',
            component: '../test',
          },
          {
            path: '/systemConfig/t3',
            name: '用户管理',
            component: '../test',
          },
        ],
      },
      {
        path: '/deviceManage',
        name: '设备管理',
        icon: 'setting',
        routes: [
          {
            path: '/deviceManage/t1',
            name: '视图库',
            component: '../test',
          },
          {
            path: '/deviceManage/t2',
            name: '应用平台',
            component: '../test',
          },
          {
            path: '/deviceManage/t3',
            name: '分析系统',
            component: '../test',
          },
          {
            path: '/deviceManage/t4',
            name: '采集设备',
            component: '../test',
          },
          {
            path: '/deviceManage/t5',
            name: '采集系统',
            component: '../test',
          },
          {
            path: '/deviceManage/t6',
            name: '视频卡口',
            component: '../test',
          },
        ],
      },
      {
        path: '/oms',
        name: '运维管理',
        icon: 'setting',
        routes: [
          {
            path: '/oms/manage',
            name: '数据统计',
            component: '../test',
          },
        ],
      },
      {
        path: '/logManage',
        name: '日志管理',
        icon: 'setting',
        routes: [
          {
            path: '/logManage/operateLog',
            name: '操作日志',
            component: '../test',
          },
        ],
      },
      {
        redirect: '/dashbord',
      },
    ],
  },
]

export default routes
