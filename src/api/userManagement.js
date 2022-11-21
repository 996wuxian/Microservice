import axios from '@/utils/request'

export class UserManagementApi {
  getAllUserInfo() {
    return axios({
      url: '/userAdmin/getUserInfo',
      method: 'get',
    })
  }
  updateAdmin(data) {
    return axios({
      url: 'userAdmin/updateAdmin',
      method: 'post',
      data
    })
  }
  deleteUser(data) {
    return axios({
      url: 'userAdmin/deleteUser',
      method: 'post',
      data
    })
  }
}