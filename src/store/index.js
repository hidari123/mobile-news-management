/*
 * @Author: hidari
 * @Date: 2022-05-05 14:40:49
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-07 10:53:15
 * @FilePath: \mobile-news-management\src\store\index.js
 * @Description: vuex主文件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// 模块
import user from './modules/user.store'
import home from './modules/home.store'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    home
  }
})
