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
      url: 'packaged/getPack',
      method: 'get',
    })
  }
  // deleteUser(data) {
  //   return axios({
  //     url: 'user/deleteUser',
  //     method: 'post',
  //     data
  //   })
  // }
}