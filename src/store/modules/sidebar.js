export default {
  namespaced: true,
  state: {
    NavItem: [
      {
        title: "首页",
        name: "home",
        icon: "el-icon-menu",
      },
      {
        title: "用户管理",
        name: "userManagement",
        icon: "el-icon-user",
      },
      {
        title: "内容管理",
        name: "contentManagement",
        icon: "el-icon-edit-outline",
        children: [
          {
            name: "pack",
            title: "打包",
          },
          {
            name: "express",
            title: "快递",
          },
          {
            name: "secondHand",
            title: "二手物品",
          },
          {
            name: "other",
            title: "其他",
          }
        ],
      },
    ],
    // 二级菜单开关
    SubmenuOpen: false,
    // 当点击缩进按钮字体的显示与隐藏
    SubmenuTextHide: false
  },
  mutations: {
    // 点击开关按钮打开二级菜单
    SubmenuOpen(state) {
      state.SubmenuOpen = !state.SubmenuOpen
    },
    // 点击缩进按钮关闭二级菜单
    SubmenuClose(state) {
      state.SubmenuOpen = false
    }
  }
}