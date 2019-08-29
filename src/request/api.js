import axios from 'axios';
import router from './../router/index';
import Cookie from 'js-cookie'
import qs from 'qs'; //传给后台的数据为form格式
import { Message } from 'iview'
import 'iview/dist/styles/iview.css';



const baseURL = 'http://127.0.0.1:3000'

// 设置默认的axios的设置
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000; // 请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // post请求请求头

// 请求拦截
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);//这一步就是通过qs将传给后台的数据格式设置为form格式
  }
  // // 当通过登录接口后，会返回一个请求头数据，以后每个接口前面都要加这个请求头，用来判断是否登录
  // if (window.sessionStorage.getItem('tooken')) {
  //   config.headers['x-auth-token'] = window.sessionStorage.getItem('tooken');
  // }
  return config;
}, (error) => {
    console.log('未登录');
    router.push('/login');
});

// 响应拦截
axios.interceptors.response.use((response) => {
  // 通过登录接口以后会返回一个请求头参数，存储到session里面（浏览器关闭清空），用于后面的接口
  if (response.headers['x-auth-token']) {
    window.sessionStorage.setItem('tooken', response.headers['x-auth-token']);
  }
  return response;
}, (error) => {
  Message.error(error.response.data.error)
  return error.response;
});


export function get(url, params){    
  return new Promise((resolve, reject) =>{        
      axios.get(url, {            
          params: params        
      }).then(res => {
          resolve(res.data);
      }).catch(err =>{
          reject(err.data)        
  })    
});}

export function post(url, params) {
  return new Promise((resolve, reject) => {
       axios.post(url, params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}