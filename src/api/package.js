import axios from '@/utils/request'

export class PackApi {
  addPack(data) {
    return axios({
      url: '/packaged/addPack',
      method: 'post',
      data
    })
  }
  getPack() {
    return axios({
      url: '/packaged/getPack',
      method: 'get',
    })
  }
  updatePack(data) {
    return axios({
      url: '/packaged/updatePack',
      method: 'post',
      data
    })
  }
  deletePack(data) {
    return axios({
      url: '/packaged/deletePack',
      method: 'post',
      data
    })
  }
}