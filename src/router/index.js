import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store/index'

Vue.use(VueRouter)

// 防止重复点击当前路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login')
  },
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
            }
          },
          {
            path:'express',
            name:'express',
            component: () => import('@/views/ContentManagement/Express'),
            meta: {
              title: '快递'
            }
          },
          {
            path:'secondHand',
            name:'secondHand',
            component: () => import('@/views/ContentManagement/SecondHand'),
            meta: {
              title: '二手物品'
            }
          },
          {
            path:'other',
            name:'other',
            component: () => import('@/views/ContentManagement/Other'),
            meta: {
              title: '其他'
            }
          },
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
// 获取路径
router.beforeEach((to, from, next) => {
  // console.log(from.name)  //从哪个路由来
  // console.log(to.name)  //去到哪个路由
  const { matched } = to
  const path = []
  for (const item of matched) {
    if (item.meta.title) {
      path.push(item.meta)
    }
  }
  store.commit('sidebar/getPath', path)
  next()
})

export default router
