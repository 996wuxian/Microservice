import {UserManagementApi} from '@/api/userManagement'
const userManagementApi = new UserManagementApi()
export default {
  namespaced:true,
  state: {
  },
  mutations: {
  },
  actions: {
    async getAllUserInfo() {
      const res = await userManagementApi.getAllUserInfo()
      return res
    },
    async updateAdmin({commit},updateInfo) {
      const res = await userManagementApi.updateAdmin(updateInfo)
      return res
    },
    async deleteUser({commit},deleteInfo) {
      const res = await userManagementApi.deleteUser(deleteInfo)
      return res
    },
  },
  getters: {
  }
}