import {LoginApi} from '@/api/login'
const loginApi = new LoginApi()
export default {
  namespaced:true,
  state: {
    registerShow:false
  },
  mutations: {
    isShow(state) {
      state.registerShow = !state.registerShow
    }
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