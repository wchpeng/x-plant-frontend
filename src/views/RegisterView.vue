<template>
  <div class="demo-register">
      <Login ref="form" @on-submit="handleSubmit">
          <UserName name="username" value="" />
          <Poptip trigger="focus" placement="right" width="240">
              <Password name="password" :rules="passwordRule" placeholder="至少6位密码，区分大小写" @on-change="handleChangePassword" />
              <template #content>
                <div class="demo-register-tip">
                    <div class="demo-register-tip-title" :class="passwordTip.class">
                        强度：{{ passwordTip.strong }}
                    </div>
                    <Progress :percent="passwordTip.percent" hide-info :stroke-width="6" :stroke-color="passwordTip.color" />
                    <div class="demo-register-tip-desc">
                        请至少输入 6 个字符。请不要使用容易被猜到的密码。
                    </div>
                </div>
              </template>
          </Poptip>
          <Password name="passwordConfirm" :rules="passwordConfirmRule" placeholder="确认密码" />
          <div class="demo-login">
            <router-link to="/login">已有帐号？直接登录</router-link>
          </div>
          <!-- <router-link to="/login">登录</router-link> -->
          <Submit>注册</Submit>
      </Login>
  </div>
</template>
<script>
import {login, register} from '@/api/index.js'
  export default {
      data () {
          const validatePassCheck = (rule, value, callback) => {
              if (value !== this.$refs.form.formValidate.password) {
                  callback(new Error('两次输入的密码不匹配！'));
              } else {
                  callback();
              }
          };

          return {
              passwordRule: [
                  {
                      required: true, message: '密码不能为空！', trigger: 'change'
                  },
                  {
                      min: 6, message: '密码不能少于6位！', trigger: 'change'
                  }
              ],
              passwordConfirmRule: [
                  {
                      required: true, message: '确认密码不能为空！', trigger: 'change'
                  },
                  { validator: validatePassCheck, trigger: 'change' }
              ],
              // 密码长度，在密码强度提示时作为判断依据
              passwordLen: 0
          }
      },
      computed: {
          // 密码强度提示文案等
          passwordTip () {
              let strong = '强';
              let className = 'strong';
              let percent = this.passwordLen > 10 ? 10 : this.passwordLen;
              let color = '#19be6b';

              if (this.passwordLen < 6) {
                  strong = '太短';
                  className = 'low';
                  color = '#ed4014';
              } else if (this.passwordLen < 10) {
                  strong = '中';
                  className = 'medium';
                  color = '#ff9900';
              }

              return {
                  strong,
                  class: 'demo-register-tip-' + this.passwordLen < 6 ? 'low' : (this.passwordLen < 10 ? 'medium' : 'strong'),
                  percent: percent * 10,
                  color
              }
          }
      },
      methods: {
          handleChangePassword (val) {
              this.passwordLen = val.length;
          },
          async handleSubmit (valid, { username, password }) {
              if (valid) {
                  let response = await register(username, password)
                  if (response.data.code == 0){
                    // 注册成功
                    this.$router.push('/login')
                  } else {
                    this.$Message.error(response.data.msg)
                  }
              }
          }
      }
  }
</script>
<style>
  .demo-register{
      width: 400px;
      margin: 100px auto 0 !important;
  }
  .demo-register .ivu-poptip, .demo-register .ivu-poptip-rel {
      display: block;
  }
  .demo-register-tip{
      text-align: left;
  }
  .demo-register-tip-low{
      color: #ed4014;
  }
  .demo-register-tip-medium{
      color: #ff9900;
  }
  .demo-register-tip-strong{
      color: #19be6b;
  }
  .demo-register-tip-title{
      font-size: 14px;
  }
  .demo-register-tip-desc{
      white-space: initial;
      font-size: 14px;
      margin-top: 6px;
  }
  .demo-login{
    padding-bottom: 24px;
    text-align: right;
  }
</style>
