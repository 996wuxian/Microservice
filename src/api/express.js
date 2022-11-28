import axios from '@/utils/request'

export class ExpressApi {
  addExpress(data) {
    return axios({
      url: '/express/addExpress',
      method: 'post',
      data
    })
  }
  getExpress() {
    return axios({
      url: '/express/getExpress',
      method: 'get',
    })
  }
  updateExpress(data) {
    return axios({
      url: '/express/updateExpress',
      method: 'post',
      data
    })
  }
  deleteExpress(data) {
    return axios({
      url: '/express/deleteExpress',
      method: 'post',
      data
    })
  }
}