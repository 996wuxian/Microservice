import axios from '@/utils/request'

export class UserManagementApi {
  getAllUserInfo() {
    return axios({
      url: '/user/getUserInfo',
      method: 'get',
    })
  }
  updateAdmin(data) {
    return axios({
      url: 'user/updateAdmin',
      method: 'post',
      data
    })
  }
  deleteUser(data) {
    return axios({
      url: 'user/deleteUser',
      method: 'post',
      data
    })
  }
}