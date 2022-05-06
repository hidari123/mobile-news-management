/*
 * @Author: hidari
 * @Date: 2022-05-05 19:44:42
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 14:23:00
 * @FilePath: \mobile-news-management\vue.config.js
 * @Description: vue配置文件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  devServer: {
    proxy: {
      '/v1_0': { // 监听拦截以/api开头的请求接口，并替换成target
        target: 'http://www.liulongbin.top:8000', // 后端接口
        changeOrigin: true, // 开启代理
        // secure: false,// 如果使用https，会有安全校验，设置secure为false
        pathRewrite: { // 重写接口路径
          '^/v1_0': '/v1_0'
        }
      }
    },
    disableHostCheck: true
  },
  publicPath: './',
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  }
}
