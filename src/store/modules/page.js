export default {
  namespaced: true,
  state: {
    SideBarIndent: false
  },
  mutations: {
    changeSideBar(state) {
      state.SideBarIndent = !state.SideBarIndent
    }
  }
}