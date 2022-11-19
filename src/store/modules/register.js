import {RegisterApi} from '@/api/register'
const registerApi = new RegisterApi()
export default {
  namespaced:true,
  state: {
  },
  mutations: {
  },
  actions: {
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