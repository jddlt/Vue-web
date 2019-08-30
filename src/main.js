// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
// import { get } from 'http';
import { get, post } from './request/api'


Vue.config.productionTip = false

Vue.use(iView)

Vue.prototype.$get = get
Vue.prototype.$post = post
// Vue.use(get)
// Vue.use(post)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
