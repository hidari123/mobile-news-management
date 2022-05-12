/*
 * @Author: hidari
 * @Date: 2022-05-05 14:40:49
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-12 14:47:01
 * @FilePath: \mobile-news-management\src\main.js
 * @Description: 主入口js文件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant包 和其相关样式
import Vant from 'vant'
import 'vant/lib/index.less'
// 引入样式 把全局样式文件 写在加载vant组件库样式后面
// 层叠样式表后者会覆盖前者
import '@/styles/index.less'
// 加载动态设置 REM 基准值
import 'amfe-flexible'
// 加载 dayjs 初始化配置
import dayjs from '@/utils/dayjs'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(dayjs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
