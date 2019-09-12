import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login/Login'
import Home from '@/pages/Home/Home'
// import Upload from '@/components/upload/Upload'
 
Vue.use(Router)

// 解决那啥的报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home 
    },
    { 
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
