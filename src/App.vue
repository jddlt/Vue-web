<template>
  <div id="app">
    <router-view class="router"/>
    <Footer v-if="isShow"></Footer>
    <BackTop :bottom="75" class="op"></BackTop>
  </div>
</template>

<script>
import Footer from '@/components/footer/Footer'
export default {
  name: 'App',
  data() {
    return {
      isShow: true
    }
  },
  components: {
    Footer
  },
  watch: {
    $route: function() {
      if(this.$route.path === '/login') {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  }
}
</script>

<style>
@import url("./app.less");
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.router{
  background: url("../static/img/bgc.jpg") repeat fixed left top;
  min-height: calc(100vh - 54px);
}
.op{
  opacity: 0.3;
}
</style>
