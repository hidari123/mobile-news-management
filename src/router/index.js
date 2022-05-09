/*
 * @Author: hidari
 * @Date: 2022-05-05 14:40:49
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 13:53:09
 * @FilePath: \mobile-news-management\src\router\index.js
 * @Description: router 主入口文件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { login as Login } from './route/login.route'
import { tabBar as TabBar } from './route/tab-bar.route'
import { search as Search } from './route/search.route'

Vue.use(VueRouter)

const routes = [
  ...Login,
  ...TabBar,
  ...Search
]

const router = new VueRouter({
  routes
})

export default router
