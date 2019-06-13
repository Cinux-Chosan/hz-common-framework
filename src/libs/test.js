const local1 = [
    {
        path: '/user',
        name: 'home1',
        redirect: '/user/login',
        component: '../test',
    },
    {
        path: '/11111',
        default_url: '/11111',
        routes: [
            {
                path: '/22222',
                default_url: '/22222',
                routes: [
                    {
                        path: '/33333',
                        default_url: '/33333',
                        routes: [
                            {
                                path: '/asdfasdfasdf',
                            }
                        ]
                    }
                ]
            }
        ]
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


const remote1 = [
    {
        path: '/11111',
        default_url: '/11111',
        child: [
            {
                path: '/22222',
                default_url: '/22222',
                child: [
                    {
                        path: '/33333',
                        default_url: '/33333',
                        child: [
                            {
                                default_url: '/44444'
                            }
                        ]
                    }
                ]
            }
        ],
    },
    {
        "menu_id": 62,
        "menu_name": "系统管理",
        "menu_code": "APP0005",
        "icon": " ",
        "is_outreach": null,
        "is_menu": null,
        "default_url": "",
        "parent_menu_id": 0,
        "display_order": 1.0,
        "child": [{
            "menu_id": 245,
            "menu_name": "再加一个行不行",
            "menu_code": "BBBBBBBB",
            "icon": null,
            "is_outreach": null,
            "is_menu": null,
            "default_url": null,
            "parent_menu_id": 62,
            "display_order": 12.0,
            "child": null
        }, {
            "menu_id": 76,
            "menu_name": "系统设置",
            "menu_code": "MENU000007",
            "icon": " icon-quanxianguanli",
            "is_outreach": null,
            "is_menu": null,
            "default_url": "http://192.168.108.54:11110",
            "parent_menu_id": 62,
            "display_order": 8.0,
            "child": [{
                "menu_id": 77,
                "menu_name": "功能权限",
                "menu_code": "MENU000018",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 76,
                "display_order": 0.0,
                "child": null
            }, {
                "menu_id": 196,
                "menu_name": "埋点配置",
                "menu_code": "MENU000019",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 76,
                "display_order": 1.0,
                "child": null
            }, {
                "menu_id": 197,
                "menu_name": "数据库配置",
                "menu_code": "MENU000020",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 76,
                "display_order": 2.0,
                "child": null
            }, {
                "menu_id": 198,
                "menu_name": "资源配置",
                "menu_code": "MENU000021",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 76,
                "display_order": 3.0,
                "child": null
            }, {
                "menu_id": 200,
                "menu_name": "头部配置",
                "menu_code": "MENU000033",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 76,
                "display_order": 5.0,
                "child": null
            }, {
                "menu_id": 201,
                "menu_name": "密码配置",
                "menu_code": "MENU000034",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 76,
                "display_order": 6.0,
                "child": null
            }, {
                "menu_id": 199,
                "menu_name": "LDAP配置",
                "menu_code": "MENU000032",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 76,
                "display_order": 4.0,
                "child": null
            }, {
                "menu_id": 233,
                "menu_name": "主题配置",
                "menu_code": "MENU000040",
                "icon": null,
                "is_outreach": null,
                "is_menu": null,
                "default_url": null,
                "parent_menu_id": 76,
                "display_order": 8.0,
                "child": null
            }]
        }, {
            "menu_id": 73,
            "menu_name": "角色管理",
            "menu_code": "MENU000008",
            "icon": " icon-jiaoseguanli",
            "is_outreach": null,
            "is_menu": null,
            "default_url": "http://192.168.108.54:11109/roles/manager",
            "parent_menu_id": 62,
            "display_order": 6.0625,
            "child": [{
                "menu_id": 74,
                "menu_name": "删除",
                "menu_code": "MENU000022",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 73,
                "display_order": 0.0,
                "child": null
            }, {
                "menu_id": 75,
                "menu_name": "新建",
                "menu_code": "MENU000023",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 73,
                "display_order": 1.0,
                "child": null
            }]
        }, {
            "menu_id": 216,
            "menu_name": "设备管理",
            "menu_code": "MENU000004",
            "icon": null,
            "is_outreach": null,
            "is_menu": null,
            "default_url": "http://192.168.108.54:11121",
            "parent_menu_id": 62,
            "display_order": 11.0,
            "child": null
        }, {
            "menu_id": 213,
            "menu_name": "组织管理",
            "menu_code": "MENU000005",
            "icon": null,
            "is_outreach": null,
            "is_menu": null,
            "default_url": "http://192.168.108.54:11109/organizationManagement",
            "parent_menu_id": 62,
            "display_order": 10.125,
            "child": null
        }, {
            "menu_id": 63,
            "menu_name": "用户管理",
            "menu_code": "MENU000009",
            "icon": " icon-yonghuguanli",
            "is_outreach": null,
            "is_menu": null,
            "default_url": "http://192.168.108.54:11109/users/lists",
            "parent_menu_id": 62,
            "display_order": 5.63281,
            "child": [{
                "menu_id": 64,
                "menu_name": "添加",
                "menu_code": "MENU000014",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 0.0,
                "child": null
            }, {
                "menu_id": 65,
                "menu_name": "导入用户",
                "menu_code": "MENU000011",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 1.0,
                "child": null
            }, {
                "menu_id": 66,
                "menu_name": "编辑",
                "menu_code": "MENU000027",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 2.0,
                "child": null
            }, {
                "menu_id": 67,
                "menu_name": "禁用",
                "menu_code": "MENU000028",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 3.0,
                "child": null
            }, {
                "menu_id": 68,
                "menu_name": "导入组织",
                "menu_code": "MENU000010",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 4.0,
                "child": null
            }, {
                "menu_id": 69,
                "menu_name": "删除",
                "menu_code": "MENU000013",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 5.0,
                "child": null
            }, {
                "menu_id": 70,
                "menu_name": "新增组织",
                "menu_code": "MENU000029",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 6.5,
                "child": null
            }, {
                "menu_id": 71,
                "menu_name": "删除组织",
                "menu_code": "MENU000030",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 7.5,
                "child": null
            }, {
                "menu_id": 72,
                "menu_name": "修改组织",
                "menu_code": "MENU000031",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 8.0,
                "child": null
            }, {
                "menu_id": 203,
                "menu_name": "导出用户",
                "menu_code": "MENU000035",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 63,
                "display_order": 9.0,
                "child": null
            }]
        }, {
            "menu_id": 81,
            "menu_name": "日志管理",
            "menu_code": "MENU000006",
            "icon": " icon-rizhiguanli",
            "is_outreach": null,
            "is_menu": null,
            "default_url": "http://192.168.108.54:11109/log/operations",
            "parent_menu_id": 62,
            "display_order": 5.84766,
            "child": [{
                "menu_id": 82,
                "menu_name": "日志归档",
                "menu_code": "MENU000017",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 81,
                "display_order": 0.0,
                "child": null
            }, {
                "menu_id": 83,
                "menu_name": "操作日志",
                "menu_code": "MENU000015",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 81,
                "display_order": 1.0,
                "child": null
            }, {
                "menu_id": 84,
                "menu_name": "用户行为分析",
                "menu_code": "MENU000016",
                "icon": " ",
                "is_outreach": null,
                "is_menu": null,
                "default_url": "",
                "parent_menu_id": 81,
                "display_order": 2.0,
                "child": null
            }]
        }]
    }, {
        "menu_id": 247,
        "menu_name": "123",
        "menu_code": "APP0001",
        "icon": null,
        "is_outreach": 1,
        "is_menu": 1,
        "default_url": null,
        "parent_menu_id": 0,
        "display_order": 2.0,
        "child": null
    }, {
        "menu_id": 254,
        "menu_name": "用户管理测试",
        "menu_code": "APP0006",
        "icon": "user",
        "is_outreach": 0,
        "is_menu": 0,
        "default_url": "/user",
        "parent_menu_id": 0,
        "display_order": 3.0,
        "child": [{
            "menu_id": 255,
            "menu_name": "3333",
            "menu_code": "MENU000041",
            "icon": "3333",
            "is_outreach": 0,
            "is_menu": 0,
            "default_url": "/3333",
            "parent_menu_id": 254,
            "display_order": 0.0,
            "child": null
        }, {
            "menu_id": 256,
            "menu_name": "操作日志线上",
            "menu_code": "MENU000042",
            "icon": "log",
            "is_outreach": 0,
            "is_menu": 0,
            "default_url": "/log",
            "parent_menu_id": 254,
            "display_order": 1.0,
            "child": null
        }, {
            "menu_id": 257,
            "menu_name": "1111线上",
            "menu_code": "MENU000043",
            "icon": "1111",
            "is_outreach": 0,
            "is_menu": 0,
            "default_url": "/1111",
            "parent_menu_id": 254,
            "display_order": 2.0,
            "child": [{
                "menu_id": 258,
                "menu_name": "1111中划线1线上",
                "menu_code": "MENU000044",
                "icon": "1111-1",
                "is_outreach": 0,
                "is_menu": 0,
                "default_url": "/1111-1",
                "parent_menu_id": 257,
                "display_order": 0.0,
                "child": null
            }, {
                "menu_id": 259,
                "menu_name": "1111中划线3线上",
                "menu_code": "MENU000045",
                "icon": "1111-3",
                "is_outreach": 0,
                "is_menu": 0,
                "default_url": "/1111-3",
                "parent_menu_id": 257,
                "display_order": 1.0,
                "child": null
            }, {
                "menu_id": 260,
                "menu_name": "1111中划线4线上",
                "menu_code": "MENU000046",
                "icon": null,
                "is_outreach": 0,
                "is_menu": 0,
                "default_url": "/1111-4",
                "parent_menu_id": 257,
                "display_order": 2.0,
                "child": null
            }]
        }]
    }]


function zjjMerge(local = [], remote = []) {
    remote.forEach(r => {
        let inLocal = local.find(l => l.path === r.default_url)
        if (inLocal) {
            Object.assign(inLocal, r)
            inLocal.routes = inLocal.routes || []
            r.child = r.child || []
            zjjMerge(inLocal.routes, r.child)
        } else {
            local.push(r)
        }
    })
}

zjjMerge(local1, remote1)

console.log(local1)



export {
    local1 as local,
    remote1 as remote
}
