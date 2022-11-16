import axios from '@/utils/request'

export class CodeApi {
  code(data) {
    return axios({
      url: '/users/getCode',
      method: 'POST',
      data
    })
  }
}