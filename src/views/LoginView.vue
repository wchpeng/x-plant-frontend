<template>
  <div class="demo-login">
      <Login @on-submit="handleSubmit">
          <UserName name="username" value="" />
          <Password name="password" value="" />
          <div class="demo-auto-login">
              <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
              <router-link to="/register">注册</router-link>
          </div>
          <Submit />
      </Login>
  </div>
</template>
<script>
import {login, register} from '@/api/index.js'
  export default {
      data () {
          return {
              autoLogin: true
          }
      },
      methods: {
          async handleSubmit (valid, { username, password }) {
              if (valid) {
                  let response = await login(username, password)
                  if (response.data.code == 0){
                    sessionStorage.setItem('token', response.data.data.token)
                    sessionStorage.setItem('nick', response.data.data.nickname)
                    this.$router.push('/')
                  } else {
                    this.$Message.error({'content': response.data.msg})
                  }
              }
          }
      }
  }
</script>
<style scoped>
  .demo-login{
      width: 400px;
      margin: 100px auto 0 !important;
  }
  .demo-auto-login{
      margin-bottom: 24px;
      text-align: left;
  }
  .demo-auto-login a{
      float: right;
  }
</style>
