import axios from 'axios';
import router from './../router/index';
import Cookie from 'js-cookie'
import qs from 'qs'; //传给后台的数据为form格式
import { Message } from 'iview'
import 'iview/dist/styles/iview.css';



const baseURL = 'http://127.0.0.1:3000'
const unLoginUrl = ['/login', '/addUser']

// 设置默认的axios的设置
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000; // 请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // post请求请求头

// 请求拦截
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);//这一步就是通过qs将传给后台的数据格式设置为form格式
  }
  if(unLoginUrl.includes(config.url)) {
    delete config.data.token
  }
  return config;
}, (error) => {
    console.log('未登录');
    router.push('/login');
});

// 响应拦截
axios.interceptors.response.use((response) => {
  // 通过登录接口以后会返回一个请求头参数，存储到session里面（浏览器关闭清空），用于后面的接口
  if (response.data.token) {
    Cookie.set('token', response.data.token, {expires: 7})
  }
  return response;
}, (error) => {
  Message.error(error.response.data.error)
  if(error.response.status == 401) {
    Cookie.remove('token')
    setTimeout(() => {
      router.push('/login')
    },1000)
  }
  return error;
});


export function get(url, params){    
  return new Promise((resolve, reject) =>{        
      axios.get(url, {            
          params: {
            ...params,
            token: Cookie.get('token')
          }
      }).then(res => {
          resolve(res.data);
      }).catch(err =>{
          reject(err.data)        
  })    
});}

export function post(url, params) {
  return new Promise((resolve, reject) => {
       axios.post(url, {...params, token: Cookie.get('token')})
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}