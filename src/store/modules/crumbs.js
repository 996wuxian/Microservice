export default {
  namespaced: true,
  state: {
    crumbsArray: [
      {
        name: 'home',
        title:'首页',
        changeBg: true,
      },
    ]
  },
  mutations: {
    // 添加crumbsItem
    addCrumbsItem(state,data) {
      let title = ''
      let bool = false
      // 如果传过来的内容info不为空且info里面有title
      if (data && data.title) {
        title = data.title
      } else {
        return
      }
      for (let i = 0; i < state.crumbsArray.length; i++) {
        if (state.crumbsArray[i].title !== title) {
          bool = true
        } else {
          return
        }
      }
      if (bool) {
        for (let i = 0; i < state.crumbsArray.length; i++) {
          if (state.crumbsArray[i].title !== title) {
            state.crumbsArray[i].changeBg = false
          }
        }
        // 添加crumbsItem
        state.crumbsArray.push(data)
      } else {
        return
      }
    },
    // 初始化
    initCrumbsTitle(state, info) {
      let title = info.title
      // console.log(title); // 当前点击的nav的title
      for (let i = 0; i < state.crumbsArray.length; i++) {
        // 如果点击了引导页,title=引导页,其他不为引导页的changeBg都为false,引导页的为true，就可以实现添加样式的效果了
        if (title !== state.crumbsArray[i].title) {
          state.crumbsArray[i].changeBg = false
        } else {
          state.crumbsArray[i].changeBg = true
        }
      }
    },
    // 删除CrumbsItem
    deleteCrumbsItem(state, info) {
      state.crumbsArray.splice(info, 1)
      // 让其他changeBg为false
      for (let i = 0; i < state.crumbsArray.length; i++) {
        state.crumbsArray[i].changeBg = false
      }
      // 删除后让下一个继承changeBg样式
      state.crumbsArray[state.crumbsArray.length - 1].changeBg = true
    },
  }
}