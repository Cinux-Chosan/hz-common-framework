const route = [
  {
    path: '/1',
    child: [
      {
        path: '/1/2',
        child: [
          {
            path: '/1/2/1'
          }
        ]
      },
      {
        path: '/1/3',
      },
      {
        path: '/1/4',
      },
      {
        path: '/1/5',
        child: [
          {
            path: '/1/5/1'
          }
        ]
      },
      {
        path: '/1/6',
      },
    ]
  },
  {
    path: 'http://192.168.100.34:8000/#/2',
    child: [
      {
        path: '/2/2',
      },
      {
        path: '/2/3',
      },
      {
        path: '/2/4',
      },
      {
        path: '/2/5',
      },
      {
        path: '/2/6',
      },
    ]
  },
]

export const getSubRoutes = (parent, routeTree = []) => {
  const route = routeTree.find(route => route.path === parent) || {}
  return route.child || []
}

export const getPathLevel = (path, level = 1) => {
  return path.split('/').slice(0, level).join('/')
}

export default route
