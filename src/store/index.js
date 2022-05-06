/*
 * @Author: hidari
 * @Date: 2022-05-05 14:40:49
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 12:35:14
 * @FilePath: \mobile-news-management\src\store\index.js
 * @Description: vuex主文件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// 模块
import user from './module/user.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
