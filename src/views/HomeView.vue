<template>
  <Menu mode="horizontal" @on-select="menuOnSelect" :theme="theme" active-name="1">
      <MenuItem name="1">
          <Icon type="ios-paper" />
          首页
      </MenuItem>
      <MenuItem name="2">
          <Icon type="ios-people" />
          背景
      </MenuItem>
      <MenuItem name="3">
          <Icon type="ios-people" />
          作品
      </MenuItem>
      <div style="float:right;margin-right: 20px;">
        {{ getNick() }} &nbsp;&nbsp;&nbsp; <a @click="logout" href="">退出登录</a>
      </div>
  </Menu>
  <RouterView />
</template>
<script>
  export default {
      data () {
          return {
              theme: 'light'
          }
      },
      methods: {
        menuOnSelect(name) {
          if (name == '1') {
            this.$router.push('/')
          } else if (name == '2') {
            this.$router.push('/home/bg')
          } else if (name == '3') {
            this.$router.push('/home/rhizome')
          }
        },
        getNick(){
          return sessionStorage.getItem('nick')
        },
        logout(){
          sessionStorage.setItem('token', '');
          sessionStorage.setItem('nick', '');
          this.$router.push('/login')
        }
      }
  }
</script>
