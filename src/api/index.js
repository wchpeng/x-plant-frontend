import axios from "axios";

// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080'
});

// 设置超时时间
instance.defaults.timeout = 2500;

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前请求头里放入token
  let token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error); 
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.code == 400) {  // code==400的要跳转到登录页
    sessionStorage.setItem('token', '')
    if (response.request.responseURL.indexOf('/account/login/v1') < 0){
      window.location.href = '/'
    }
    
  }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


export async function login(username, password){
  // 登录
  return await instance.post('/account/login/v1', {
    username: username,
    password: password
  })
}


export async function register(username, password){
  // 注册
  return await instance.post('/account/register/v1', {
    username: username,
    password: password
  })
}
