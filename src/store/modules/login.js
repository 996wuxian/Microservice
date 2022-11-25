import {LoginApi} from '@/api/login'
const loginApi = new LoginApi()
export default {
  namespaced:true,
  state: {
    registerShow:false,
    forgotPasswordShow: false
  },
  mutations: {
    // 注册页面显示
    registerShow(state) {
      state.registerShow = !state.registerShow
    },
    // 修改页面显示
    forgotPasswordShow(state) {
      state.forgotPasswordShow = !state.forgotPasswordShow
    },
    // 注册页面隐藏
    registerHide(state) {
      state.registerShow = false
    },
    // 修改页面隐藏
    forgotPasswordHide(state) {
      state.forgotPasswordShow = false
    },
  },
  actions: {
    async handLogin({commit}, data) {
      const res = await loginApi.login(data)
      return res
    },
  },
  getters: {
  }
}