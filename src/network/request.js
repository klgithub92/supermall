// 这里封装各种请求
import axios from "axios";

//方法1利用回调函数
// export function request(config, success, failure) {
//   //1.创建axios实例
//   //第一个服务器
//   const instance = axios.create({
//     baseURL: 'http://152.136.185.210:7878/api/m5',
//     timeout: 5000
//   })
//   //2.封装发送真正的网络请求
//   instance(config)
//     .then(res => {
//       success(res)
//     })
//     .catch(err => {
//       failure(err)
//     })
// }

//方法二 给config对象添加属性和方法
// export function request(config) {
//   //1.创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://152.136.185.210:7878/api/m5',
//     timeout: 5000
//   })
//   //2.发送真正的网络请求
//   instance(config.baseConfig)
//     .then(res => {
//       config.success(res)
//     })
//     .catch(err => {
//       config.failure(err)
//     })
// }

//方法3 利用promise封装
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     //1.创建axios实例
//     const instance = axios.create({
//       baseURL: 'http://152.136.185.210:7878/api/m5',
//       timeout: 5000
//     })
//     //2.发送真正的网络请求
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

//方法4 instance本身就是promise对象
export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2.axios的拦截器
  //2.1请求拦截器的作用
  instance.interceptors.request.use(config => {
    // console.log(config)
    //请求拦截器作用：
    //2.1.1比如config中的一些信息不符合服务器的要求，可以在这里重新修改
    //2.1.2比如每次在发送请求时，都希望在界面中显示一个请求的图标
    //2.1.3某些网络请求（比如登录(token)）,必须携带一些特殊的信息
    //释放拦截器
    return config
  }, err => {
    //一般不会经过这里 比如请求之前断网了
    // console.log('来到了request拦截failure中');
    return err
  })

  //2.2响应拦截器
  instance.interceptors.response.use(response => {
    // console.log('来到了response拦截success中');
    return response.data
  }, err => {
    //比如请求的地址不存在 访问失败就不会有响应 这里就起作用了
    // console.log('来到了response拦截failure中');
    // console.log(err);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权的访问'
          break
      }
    }
    return err
  })

  //3.发送真正的网络请求 instance就是一个promise对象
  return instance(config)
}