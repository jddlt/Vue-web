import axios from 'axios';
import router from './../router/index';
import Cookie from 'js-cookie'
import qs from 'qs'; //传给后台的数据为form格式
import { Message } from 'iview'
import 'iview/dist/styles/iview.css';


const baseURL = 'http://127.0.0.1:3000'
// const unLoginUrl = ['/login', '/addUser', '/userInfo']

// 设置默认的axios的设置
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000; // 请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // post请求请求头

// 请求拦截
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);//这一步就是通过qs将传给后台的数据格式设置为form格式
  }
  // if(unLoginUrl.includes(config.url)) {
  //   config.data && delete config.data.token
  // }
  return config;
}, (error) => {
    console.log('我是怎么进来的??????????');
    throw error
});

// 响应拦截
axios.interceptors.response.use((response) => {
  // 通过登录接口以后会返回一个token参数，存储到cookie里面,用于后面的接口
  if(response.data.code == 200) {
    if (response.data.data.token) {
      Cookie.set('token', response.data.data.token, {expires: 7})
    }
    return Promise.resolve(response);
  } else if (response.data.code == 401){
    Message.error(response.data.msg)
    Cookie.remove('token')
    setTimeout(() => {
      router.push('/login')
    },1000)
    return Promise.resolve(response);
  } else {
    Message.error(response.data.msg)
    return Promise.resolve(response);
  }
}, (error) => {
  Message.error(error.response.data.msg)
  return Promise.reject(error);
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