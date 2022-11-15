export default {
  namespaced: true,
  state: {
    NavItem: [
      {
        title: "首页",
        name: "home",
        icon: "el-icon-user-solid",
      },
      {
        title: "用户管理",
        name: "userManagement",
        icon: "el-icon-document",
      },
      {
        title: "内容管理",
        name: "contentManagement",
        icon: "el-icon-unlock",
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
        ],
      },
    ],
    SubmenuOpen: false
  },
  mutations: {
    SubmenuOpen(state) {
      state.SubmenuOpen = !state.SubmenuOpen
    }
  }
}