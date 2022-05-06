/*
 * @Author: hidari
 * @Date: 2022-05-06 12:33:14
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 18:33:05
 * @FilePath: \mobile-news-management\src\store\modules\user.store.js
 * @Description: user仓库
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import { reqGetUserInfo, reqLogin } from '@/api/user.api.js'
import { getItem, setItem } from '@/utils/storage'
import { token } from '@/constants'
export default {
  namespaced: true,
  state: () => {
    // 一个对象，存储当前用户信息( token等 )
    return {
      user: getItem(token),
      userInfo: null
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 本地持久化
      setItem(token, state.user)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
       * 请求登录
       * @param {*} param0 修改state数据
       * @param {Object} user 用户名和验证码
       * @returns
       */
    async login ({ commit }, user) {
      const res = await reqLogin(user)
      if (res.message === 'OK') {
        commit('setUser', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    //   console.log(res.message)
    },
    /**
     * 请求用户信息
     * @param {*} param0 修改state数据
     */
    async getUserInfo ({ commit }) {
      const res = await reqGetUserInfo()
      if (res.message === 'OK') {
        commit('setUserInfo', res.data)
      } else {
        return Promise.reject(new Error('faild'))
      }
    }
  }
}
