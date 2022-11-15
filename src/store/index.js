import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 获取modules里面的模块，就不用import导入了
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  modules
  // state这些要删掉，不然会和modules里面的冲突导致找不到
})
