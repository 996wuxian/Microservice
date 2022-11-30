import {SecondHandApi} from '@/api/secondHand'
const secondHandApi = new SecondHandApi()
export default {
  namespaced:true,
  state: {
  },
  mutations: {
  },
  actions: {
    async addSecond({commit}, data) {
      const res = await secondHandApi.addSecond(data)
      return res
    },
    async getSecond() {
      const res = await secondHandApi.getSecond()
      return res
    },
    async updateSecond({commit}, data) {
      const res = await secondHandApi.updateSecond(data)
      return res
    },
    async deleteSecond({commit},data) {
      const res = await secondHandApi.deleteSecond(data)
      return res
    },
  },
  getters: {
  }
}