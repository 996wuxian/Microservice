import {ExpressApi} from '@/api/express'
const expressApi = new ExpressApi()
export default {
  namespaced:true,
  state: {
  },
  mutations: {
  },
  actions: {
    async addExpress({commit}, data) {
      const res = await expressApi.addExpress(data)
      return res
    },
    async getExpress() {
      const res = await expressApi.getExpress()
      return res
    },
    async updateExpress({commit}, data) {
      const res = await expressApi.updateExpress(data)
      return res
    },
    async deleteExpress({commit},data) {
      const res = await expressApi.deleteExpress(data)
      return res
    },
  },
  getters: {
  }
}