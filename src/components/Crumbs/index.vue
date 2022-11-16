<template>
  <div class="crumbs">
    <div 
      class="crumbsItem" 
      v-for="(item,index) in crumbsTitle" :key="index" 
      :class="item.changeBg ? 'addBg' : 'crumbsItem'"
      @click="crumbsClick(item)"
    >
      <div v-if="item.changeBg" class="circle"></div>
      {{item.title}}
      <!-- 动态添加crumbsItem时,同时添加一个deleteIcon,这样前两个就没有 -->
      <!-- 阻止冒泡 -->
      <div @click.stop="deleteCrumbs(item, index)" v-show="item.deleteIcon" class="del"><i class="el-icon-close"></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'crumbs',
    data() {
      return {
        crumbsTitle:[]
      }
    },
    mounted() {
      this.crumbsTitle = this.$store.state.crumbs.crumbsArray
    },
    methods: {
      crumbsClick(item) {
        this.$store.commit('crumbs/initCrumbsTitle',item)
        this.$router.push({
          name:item.name
        })
      },
      deleteCrumbs(item, index) {
        this.$store.commit('crumbs/deleteCrumbsItem', index)
        const toPath = this.$store.state.crumbs.crumbsArray
        this.$router.push({
          name: toPath[toPath.length - 1].name || 'home'
        })
      }
    }
 }
</script>

<style scoped lang="less">
  .crumbs {
    width: 100%;
    height: 30px;
    box-shadow: 0 1px 4px rgb(151, 168, 190, .6);
    .crumbsItem {
      display: flex;
      padding: 0 6px;
      height: 24px;
      float: left;
      border: 1px solid #d8dce5;
      line-height: 24px;
      font-size: 12px;
      margin: 2px 0 0px 5px;
      .circle {
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-radius: 50%;
        margin: 8px 5px;
      }
      .del {
        margin: 0 4px;
      }
      .del:hover i {
        background-color: brown;
        border-radius: 2px;
        color: #fff;
      }
    }
    .addBg {
      background-color: #42b983;
      border: 1px solid #42b983;
      padding: 0 6px;
      color: #fff;
    }
  }
  .crumbs div:nth-of-type(1) {
    margin-left: 17px;
  }
</style>