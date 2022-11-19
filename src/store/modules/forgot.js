import {ForgotApi} from '@/api/forgot'
const forgotApi = new ForgotApi()
export default {
  namespaced:true,
  state: {
     // 输入密码框显示隐藏
     pwdInputShow: false,
     // 邮箱验证码框显示隐藏
     ecInputShow: true
  },
  mutations: {
    pwdInputShow(state) {
      state.pwdInputShow = !state.pwdInputShow
    },
    ecInputShow(state) {
      state.ecInputShow = !state.ecInputShow
    },
    // 显示最初
    changeRegisterPage(state) {
      state.pwdInputShow = false
      state.ecInputShow = true
    }
  },
  actions: {
    // 发送验证码
    async forgotCode({commit}, data) {
      const res =  await forgotApi.forgotCode(data)
      return res
    },
    // 确认验证码
    async confirmChange({commit}, data) {
      const res =  await forgotApi.confirmChange(data)
      return res
    },
    // 修改密码
    async handForgot({commit}, data) {
      const res = await forgotApi.forgot(data)
      return res
    },
  },
  getters: {
  }
}