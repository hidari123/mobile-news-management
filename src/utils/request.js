/*
 * @Author: hidari
 * @Date: 2022-05-05 17:46:24
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 18:37:00
 * @FilePath: \mobile-news-management\src\utils\request.js
 * @Description: 请求模块二次封装
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import axios from 'axios'
import store from '@/store'

const instance = axios.create({
//   baseURL: 'http://api-toutiao-web.itheima.net/',
  baseURL: '/v1_0',
  //   baseURL: 'http://www.liulongbin.top:8000/v1_0',
  timeout: 5000
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
  // 直接返回data
  res => res.data,
  err => {
    return Promise.reject(err)
  }
)
export default instance
