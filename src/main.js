/*
 * @Author: hidari
 * @Date: 2022-05-05 14:40:49
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-05 17:12:27
 * @FilePath: \mobile-news-management\src\main.js
 * @Description: 主入口js文件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
// @ts-nocheck
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入样式
// 导入vant包 和其相关样式
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载动态设置 REM 基准值
import 'amfe-flexible'

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
