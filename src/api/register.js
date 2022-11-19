import axios from '@/utils/request'

export class RegisterApi {
  register(data) {
    return axios({
      url:'/users/register',
      method:'post',
      data
    })
  }
  registerCode(data) {
    return axios({
      url: '/users/getRegCode',
      method: 'post',
      data
    })
  }
}