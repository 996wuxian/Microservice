import {PackApi} from '@/api/package'
const packApi = new PackApi()
export default {
  namespaced:true,
  state: {
  },
  mutations: {
  },
  actions: {
    async addPack({commit}, data) {
      const res = await packApi.addPack(data)
      return res
    },
    async getPack() {
      const res = await packApi.getPack()
      return res
    },
    async updatePack({commit}, data) {
      const res = await packApi.updatePack(data)
      return res
    },
    async deletePack({commit},data) {
      const res = await packApi.deletePack(data)
      return res
    },
  },
  getters: {
  }
}