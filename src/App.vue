<template>
  <div id="app">
    <router-view class="router"/>
    <Footer></Footer>
    <BackTop :bottom="100"></BackTop>
  </div>
</template>

<script>
import Footer from '@/components/footer/Footer'
export default {
  name: 'App',
  components: {
    Footer
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
</style>
