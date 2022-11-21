import router from './index'
import { getToken } from '@/utils/auth'

const whiteRouter = ['/login']  //用indexOf方法，判断数组中是否存在指定的某个对象

router.beforeEach((to, from, next) => {
    if (getToken()) {
      // console.log('token存在');
      if (to.path === '/login') {
        next({ path: '/layout' })
      }
      next()
    } else {
      // console.log('token不存在');
      // 这样会造成死循环
      // next('/')
      // 即用whiteRouter来存/login页面，当下一个页面等于/login时，就进行下一个路由。如果不是/login页面，这样就跳转到/login页面
      if (whiteRouter.indexOf(to.path) !== -1) {
        // console.log('在login页面');
        next()
      }else {
        alert('请先登录')
        next({ path:'/login' })
      }
    }
})