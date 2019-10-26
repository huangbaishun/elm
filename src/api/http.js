import axios from "axios";

class http {
  constructor() {
    // this.URL = "//elm.cangdu.org";
    this._http = axios.create({
      timeout: 100000,
      baseURL: "//elm.cangdu.org",
      withCredentials: true
    });
    this.interceptors();
  }
  // get接口
  getHttp(url, Params) {
    return this._http.get(url, {
      params: {
        ...Params
      }
    });
  }
  // post接口
  postHttp(url, Params) {
    return this._http.post(url, { ...Params });
  }
  interceptors() {
    this._http.interceptors.request.use(
      function(config) {
        return config;
      },
      function(err) {
        return Promise.reject(err);
      }
    );
    this._http.interceptors.response.use(
      function(response) {
        return response;
      },
      function(err) {
        return Promise.reject(err);
      }
    );
  }
}
export default new http();






// import axios from 'axios'
// import qs from 'qs'
// import vue from 'vue'

// import {
//   getToken
// } from '@/utils/auth.js'
// import {
//   Message,
//   MessageBox,
//   Loading
// } from 'hikui'
// let LoadingInstance = null // 保存loading实例
// // let baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASEURL + ':8086/' : '';
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASEURL + ':8086/',
// //   baseURL: 'http://10.64.152.38:8086/',
//   timeout: 300000, // 请求超时时间
//   transformRequest: [
//     (data) => {
//       return qs.stringify(data)
//     }
//   ],
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// })

// service.defaults.withCredentials = true
// // 请求拦截器
// service.interceptors.request.use((config) => {
//   LoadingInstance = Loading.service({
//     lock: true,
//     text: 'Loading...',
//     spinner: 'el-icon-loading'
//   })

//   //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//   //   if (config.methods === 'post') {
//   //     config.data = qs.stringify({
//   //       ...config.data
//   //     })
//   //   }
//   const tk = getToken();
//   if (tk) {
//     config.headers.Authorization = tk
//   }

//   return config
// }, (error) => {
//   LoadingInstance.close()
//   return Promise.reject(error)
// })

// // 响应拦截器
// service.interceptors.response.use(
//   response => {
//     LoadingInstance.close()
//     if (!response.data) {
//       response.data = {
//         code: '-1',
//         message: 'System exception, please contact the administrator'
//       }
//     }
//     const msg = response.data.message
//     if (response.status !== 200) {
//       Message({
//         message: msg,
//         type: 'error',
//         duration: 5 * 1000,
//         showClose: true
//       })
//     } else {
//       if (response.data.code === '-1') {
//         Message({
//           message: msg,
//           type: 'error',
//           duration: 3 * 1000,
//           showClose: true
//         })
//       }
//       return response.data
//     }
//   },
//   error => {
//     console.log(error)
//     LoadingInstance.close()
//     if (error && error.response) {
//       switch (error.response.status) {
//         case 400:
//           error.message = '错误请求'
//           break
//         case 401:
//           error.message = '未授权，请重新登录'
//           MessageBox.alert('你已被登出，请重新登录', '确定登出', {
//             confirmButtonText: '重新登录'
//           }).then(() => {
//             // store.dispatch('LoginOut').then(() => {
//             //   window.location.href = '/api/logout'
//             // })
//           })
//           return Promise.reject(new Error('error'))
//         case 403:
//           error.message = '拒绝访问'
//           break
//         case 404:
//           error.message = '请求错误,未找到该资源'
//           break
//         case 405:
//           error.message = '请求方法未允许'
//           break
//         case 408:
//           error.message = '请求超时'
//           break
//         case 500:
//           error.message = '服务器端出错'
//           break
//         case 501:
//           error.message = '网络未实现'
//           break
//         case 502:
//           error.message = '网络错误'
//           break
//         case 503:
//           error.message = '服务不可用'
//           break
//         case 504:
//           error.message = '网络超时'
//           break
//         case 505:
//           error.message = 'http版本不支持该请求'
//           break
//         default:
//           error.message = `连接错误${error.response.status}`
//       }
//     } else {
//       error.message = '连接到服务器失败'
//     }

//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000,
//       showClose: true
//     })
//     return Promise.reject(error)
//   }
// )
// vue.prototype.request = service
// export const request = service
