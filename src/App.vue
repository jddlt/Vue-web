<template>
  <div id="app">
    <router-view class="router"/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
}
</style>
