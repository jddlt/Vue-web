import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login/Login'
import Home from '@/pages/Home/Home'
import Artical from '@/pages/Artical/Artical'
import UserInfo from '@/pages/UserInfo/UserInfo'
import WriteArtical from '@/pages/writeArtical/WriteArtical'
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
    },
    { 
      path: '/artical', 
      name: 'Artical',
      component: Artical
    },
    { 
      path: '/userInfo',
      name: 'UserInfo',  
      component: UserInfo
    },
    { 
      path: '/writeArtical', 
      name: 'WriteArtical',
      component: WriteArtical
    }
  ]
})
