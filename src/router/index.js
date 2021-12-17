import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login/Login'
import Home from '@/pages/Home/Home'
import Artical from '@/pages/Artical/Artical'
import UserInfo from '@/pages/UserInfo/UserInfo'
import WriteArtical from '@/pages/writeArtical/WriteArtical'
// import Upload from '@/components/upload/Upload'
 
const arr = ['master']

Vue.use(Router)

// 解决那啥的报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

console.log('array')


export default new Router({
  mode: 'history',
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
    },
    { 
      path: '/*', 
      redirect: '/'
    }
  ],
  scrollBehavior: (to, from, savePosition) => {
    // 如果savePosition存在，则直接滚动到相应位置
    if (savePosition) {
      return savePosition 
    }
    // 否则直接回到顶部
    return {x: 0, y: 0}
   },
})
