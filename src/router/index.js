import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 防止重复点击当前路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path:'/layout',
    name:'layout',
    redirect:'layout/home',
    component: () => import('@/components/Layout'),
    children: [
      {
        path:'home',
        name:'home',
        component: () => import('@/views/Home'),
        meta: {
          title: '首页'
        }
      },
      // 用户管理
      {
        path:'userManagement',
        name:'userManagement',
        component: () => import('@/views/UserManagement'),
        meta: {
          title: '用户管理'
        }
      },
      // 内容管理
      {
        path:'contentManagement',
        name:'contentManagement',
        component: () => import('@/views/ContentManagement'),
        meta: {
          title: '内容管理'
        },
        children: [
          {
            path:'pack',
            name:'pack',
            component: () => import('@/views/ContentManagement/Pack'),
            meta: {
              title: '打包'
            },
          },
          {
            path:'express',
            name:'express',
            component: () => import('@/views/ContentManagement/Express'),
            meta: {
              title: '快递'
            },
          },
          {
            path:'secondHand',
            name:'secondHand',
            component: () => import('@/views/ContentManagement/SecondHand'),
            meta: {
              title: '二手物品'
            },
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
