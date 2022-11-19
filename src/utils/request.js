// 请求结果
import axios from 'axios'
// 引入错误类型
import { Message } from 'element-ui';

const server = axios.create({
  baseURL: 'http://localhost:8123',
  timeout: 5000
})

// 请求拦截
// server.interceptors.request.use(
//   config => {
//   }
// )

// 响应拦截
server.interceptors.response.use(
  response => {
    const res = response.data
    // console.log(response);
    if (res.code !== 200) {
      if (res.code === 10006) {
        Message({
          type: 'error',
          message: `用户密码错误`
        })
        return
      }

      Message({
        type: 'error',
        message: `错误码：${res.code}, ${res.message}`
      })
      return
    } else {
      return res
    }
  },
  err => {
    console.log(err);
    Message({
      type: 'error',
      message: err
    })
    // console.log(err);
  }
)

export default server