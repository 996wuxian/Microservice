import axios from '@/utils/request'

export class LoginApi {
  login(data) {
    return axios({
      url: '/users/login',
      method: 'post',
      data
    })
  }
}