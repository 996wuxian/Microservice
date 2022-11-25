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
      if (res) {
        console.log('发送成功');
      }
      return res
    },
    async getPack() {
      const res = await packApi.getPack()
      return res
    },
    // async deleteUser({commit},deleteInfo) {
    //   const res = await userManagementApi.deleteUser(deleteInfo)
    //   return res
    // },
  },
  getters: {
  }
}