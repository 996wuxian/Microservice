<template>
  <div class="userLogin">
    <div class="login-form">
      <div class="loginPage"><userLogin></userLogin></div>
      <div class="registerPage"><createUser></createUser></div>
      <div class="forgotPasswordPage"><forgotPassword></forgotPassword></div>
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
import forgotPassword from '@/components/User/forgotPassword.vue'

  export default {
    components: {
      userLogin,
      createUser,
      forgotPassword
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
      }
      .registerPage {
        position: absolute;
        width: 100%;
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