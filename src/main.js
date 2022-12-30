import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

// 获取token
import './router/permit'

// 初始化css
import '@/assets/css/reset.css'

//添加事件管理者'passive'，来阻止'touchstart'事件，让页面更加流畅。 解决chrome下的warning问题
import "default-passive-events"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 在线接单瀑布流插件
import { VueMasonryPlugin } from 'vue-masonry'
Vue.use(VueMasonryPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
