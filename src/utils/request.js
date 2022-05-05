/*
 * @Author: hidari
 * @Date: 2022-05-05 17:46:24
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-05 19:08:13
 * @FilePath: \mobile-news-management\src\utils\request.js
 * @Description: 请求模块二次封装
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
  timeout: 5000
})

/**
 * 请求拦截器
 */

/**
 * 响应拦截器
 */
export default instance
