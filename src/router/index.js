/*
 * @Author: hidari
 * @Date: 2022-05-05 14:40:49
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-12 18:45:31
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
import { article as Article } from './route/article.route'
import { userProfile as UserProfile } from './route/user.route'
import { chat as Chat } from './route/chat.route'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  ...Login,
  ...TabBar,
  ...Search,
  ...Article,
  ...UserProfile,
  ...Chat
]

const router = new VueRouter({
  routes
})

// 所有有权限页面的路径，都在这个数组之中
const pagePathArr = ['/user', '/user/edit', '/article']

// 为路由的实例对象挂载全局前置守卫
router.beforeEach((to, from, next) => {
  // 访问的是有权限的页面，需要判断用户是否登录
  if (pagePathArr.indexOf(to.path) !== -1) {
    // 1. 从 store 中获取 token 的值
    //    注意：store.state.user.user 要么是 {} 空对象，要么是包含 {token, refresh_token} 的对象
    const tokenStr = store.state.user.user.token
    if (tokenStr) {
      // 1.1 token 有值，已登录过（操作：直接放行）
      console.log(111)
      next()
    } else {
      // 没有登录，强制跳转到登录页，并携带路由的 "query 查询参数"
      next(`/login?pre=${to.fullPath}`)
      console.log('111' + to.fullPath)
    }
    console.log(111)
  } else {
    // 访问的是没有权限的页面
    next()
  }
})

// 解决 vue-router 内部的报错的问题：
// 1. 将 VueRouter 本身提供的 $router.push 方法转存到常量中
const originalPush = VueRouter.prototype.push
// 2. 自定义 $router.push 方法，在内部调用原生的 originalPush 方法进行路由跳转；并通过 .catch 捕获错误
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  // 通过 .catch 捕获错误
  return originalPush.call(this, location).catch(err => err)
}

export default router
