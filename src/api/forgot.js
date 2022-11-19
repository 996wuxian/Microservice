import axios from '@/utils/request'

export class ForgotApi {
  forgot(data) {
    return axios({
      url:'/users/forgotPassword',
      method:'post',
      data
    })
  }
  forgotCode(data) {
    return axios({
      url: '/users/getChgCode',
      method: 'post',
      data
    })
  }
  confirmChange(data) {
    return axios({
      url: '/users/confirmChange',
      method: 'post',
      data
    })
  }
}