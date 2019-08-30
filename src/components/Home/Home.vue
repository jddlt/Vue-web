<template>
  <div class='home'>
    Home!!!!!
    <div v-if="userInfo">
      <p>{{userInfo.name}}</p>
      <p>{{userInfo.emil}}</p>
    </div>
    <p v-if="userInfo"><a @click="loginOut">退出登陆</a></p>
    <p v-else><router-link to="/login">去登陆</router-link></p>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  components: {},
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    getUserInfo() {
      this.$get('/userInfo', {}).then(msg => {
        if(msg.data.code == 200) {
          this.userInfo = msg.data
        }
      })
    },
    loginOut() {
      Cookie.remove('token')
      this.$router.push('/login')
    }
  },
  mounted() {
    this.getUserInfo()
  },
  beforeDestroy() {}
};
</script>


<style scoped lang='less'>
</style>