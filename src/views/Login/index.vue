<template>
  <div class="userLogin">
    <div class="login-form">
      <div class="loginPage"><userLogin></userLogin></div>
      <div class="registerPage" :class="isShow ? 'registerPageShow' : ''"><createUser></createUser></div>
    </div>
    <div class="footer">
      <img src="@/assets/img/备案图标.png" alt="">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45010702001953">桂公网安备 45010702001953号</a>
      <span>|</span>
      <a href="javascript:;">桂ICP备2022010066号</a>
    </div>
  </div>
</template>

<script>

import userLogin from '@/components/User/userLogin.vue'
import createUser from '@/components/User/createUser.vue'

  export default {
    data() {
      return {
        email:'',
        password: '',
        registerShow: false
      }
    },
    computed: {
      isShow() {
        return this.$store.state.login.registerShow
      }  
    },
    components: {
      userLogin,
      createUser
    },
    methods: {
    },
    
 }
</script>

<style scoped lang="less">
  .userLogin {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to right, #6fd99bed, #62cdc1, #56c5f0);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login-form {
      position: relative;
      width: 300px;
      height: 500px;
      .loginPage {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .registerPage {
        position: absolute;
      }
    }
    .footer {
      position: absolute;
      bottom: 10px;
      color: #666666;
      img {
        vertical-align: bottom;
      }
      span {
        padding: 0 10px;
      }
      a {
        color: #666666;
      }
    }
  }
</style>