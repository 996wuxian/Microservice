import axios from '@/utils/request'

export class SecondHandApi {
  addSecond(data) {
    return axios({
      url: '/secondHand/addSecond',
      method: 'post',
      data
    })
  }
  getSecond() {
    return axios({
      url: '/secondHand/getSecond',
      method: 'get',
    })
  }
  updateSecond(data) {
    return axios({
      url: '/secondHand/updateSecond',
      method: 'post',
      data
    })
  }
  deleteSecond(data) {
    return axios({
      url: '/secondHand/deleteSecond',
      method: 'post',
      data
    })
  }
}