// 请求结果
import axios from 'axios'
// 引入错误类型
import { Message } from 'element-ui';
// 导入Token工具
import { getToken, setToken } from '@/utils/auth'

const server = axios.create({
  baseURL: 'http://localhost:8123',
  timeout: 5000
})

// 请求拦截
server.interceptors.request.use((config) => {
    config.headers.Authorization = getToken() || ''
    return config
	},
	(error) => {
		Promise.reject(error);
	}
)

// 响应拦截
server.interceptors.response.use(
  response => {
    const res = response.data
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
      // 如果请求的结果里有token才生成token
      if (res.result) {
        const {token = ''} = res.result
        if (token) setToken(token)
      }
      return res
    }
  },
  err => {
    console.log(err);
    Message({
      type: 'error',
      message: err
    })
  }
)

export default server