import axios from '@/utils/request'

export class OtherApi {
  addInfo(data) {
    return axios({
      url: '/other/addInfo',
      method: 'post',
      data
    })
  }
  getInfo() {
    return axios({
      url: 'other/getInfo',
      method: 'get',
    })
  }
  updateInfo(data) {
    return axios({
      url: 'other/updateInfo',
      method: 'post',
      data
    })
  }
  deleteInfo(data) {
    return axios({
      url: 'other/deleteInfo',
      method: 'post',
      data
    })
  }
}