import {OtherApi} from '@/api/other'
const otherApi = new OtherApi()
export default {
  namespaced:true,
  state: {
  },
  mutations: {
  },
  actions: {
    async addInfo({commit}, data) {
      const res = await otherApi.addInfo(data)
      return res
    },
    async getInfo() {
      const res = await otherApi.getInfo()
      return res
    },
    async updateInfo({commit}, data) {
      const res = await otherApi.updateInfo(data)
      return res
    },
    async deleteInfo({commit},data) {
      const res = await otherApi.deleteInfo(data)
      return res
    },
  },
  getters: {
  }
}