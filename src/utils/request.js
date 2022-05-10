/*
 * @Author: hidari
 * @Date: 2022-05-05 17:46:24
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 16:52:32
 * @FilePath: \mobile-news-management\src\utils\request.js
 * @Description: 请求模块二次封装
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import jsonBig from 'json-bigint'
import router from '@/router'

const instance = axios.create({
//   baseURL: 'http://api-toutiao-web.itheima.net/',
  baseURL: '/v1_0',
  //   baseURL: 'http://www.liulongbin.top:8000/v1_0',
  timeout: 5000,
  /**
   * 配置处理后端返回数据中超出 js 安全整数范围问题
   * transformResponse 允许自定义后端返回的原始的响应数据（字符串）
   */
  transformResponse: function (data) {
    try {
      /**
       * JSONBig => 可以处理数据中超出 js 安全整数范围的问题
       * JSONBig.parse()
       * JSONBig.stringify()
       * JSONBig.parse(JSONBig.strinfify(jsonStr))
       */
      return jsonBig.parse(data)
    } catch (err) {
      // 后端返回数据不是标准json字符串
      return data
    }
  }
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  config => {
    const user = store.state.user.user
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    Toast.loading({
      message: '加载中...', // 文本内容
      duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
    })
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  // 响应成功进入第1个函数
  // 该函数的参数是响应对象
  res => {
    // 隐藏 loading 效果
    Toast.clear()
    // 直接返回data
    return res.data
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  err => {
    // 如果响应码是 401 ，则请求获取新的 token
    // 响应拦截器中的 error 就是那个响应的错误对象
    if (err.response && err.response.status === 401) {
      // 校验是否有 refresh_token
      const user = store.state.user.user
      // 如果没有user
      if (!user || !user.refresh_token) {
        router.push('/login')
        return
      }
      // 如果有refresh_token，则请求获取新的 token
      axios({
        method: 'PUT',
        url: 'http://www.liulongbin.top:8000/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      }).then((res) => {
        // 如果获取成功，则把新的 token 更新到容器中
        console.log('刷新 token  成功', res)
        store.commit('user/setUser', {
          token: res.data.data.token, // 最新获取的可用 token
          refresh_token: user.refresh_token // 还是原来的 refresh_token
        })
        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return instance(err.config)
      }).catch(err => {
        // 如果获取失败，直接跳转 登录页
        console.log('请求刷新 token 失败', err)
        router.push('/login')
      })
    }
    return Promise.reject(err)
  }
)
export default instance
