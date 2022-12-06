<template>
  <div class="layout">
    <div class="sidebar" :class="sidebarIndent ? 'sideReduce' : 'sidebar'"><sidebar></sidebar></div>
    <div class="pageContent" :class="sidebarIndent ? 'pageContentReduce' : 'pageContent'">
      <navbar></navbar>
      <crumbs></crumbs>
      <router-view />
    </div>
  </div>
</template>

<script>
  import sidebar from '../SideBar'
  import navbar from "@/components/Navbar"
  import crumbs from "@/components/Crumbs"

  export default {
    components: {
      sidebar,
      navbar,
      crumbs
    },
    computed: {
      sidebarIndent() {
        return this.$store.state.page.SideBarIndent
      }
    }
 }
</script>

<style lang="less" scoped>
  .layout {
    width: 100%;
    height: 100vh;
    display: flex;
    .sidebar {
      width: 210px;
      transition: all .3s;
    }
    .pageContent {
      width: calc(100vw - 210px);
      transition: all .3s;
    }
    .sideReduce {
      width: 50px;
      transition: all .3s;
    }
    .pageContentReduce {
      width: calc(100vw - 50px);
    }
  }
</style>