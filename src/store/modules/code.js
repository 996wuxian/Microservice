import {CodeApi} from '@/api/code'
const codeApi = new CodeApi()
export default {
  namespaced:true,
  actions: {
    async handCode({commit}, data) {
      const res =  await codeApi.code(data)
      return res
    }
  }
}