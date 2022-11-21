import {RegisterApi} from '@/api/register'
const registerApi = new RegisterApi()
export default {
  namespaced:true,
  state: {
  },
  mutations: {
  },
  actions: {
    // 一定要有commit才能看到传过来的参数
    async handRegister({commit}, data) {
      const res = await registerApi.register(data)
      return res
    },
    async registerCode({commit}, data) {
      const res =  await registerApi.registerCode(data)
      return res
    }
  },
  getters: {
  }
}