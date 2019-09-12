// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css';
// import { get } from 'http';
import { get, post } from './request/api'
import { crop } from '@/util/util'


Vue.config.productionTip = false

Vue.use(iView)

Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$crop = crop



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
