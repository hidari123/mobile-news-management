/*
 * @Author: hidari
 * @Date: 2022-05-06 12:33:14
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 13:48:35
 * @FilePath: \mobile-news-management\src\store\module\user.store.js
 * @Description: user仓库
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import { reqLogin } from '@/api/user.api.js'
import { getItem, setItem } from '@/utils/storage'
import { token } from '@/constants'
export default {
  namespaced: true,
  state: () => {
    // 一个对象，存储当前用户信息( token等 )
    return {
      user: getItem(token)
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 本地持久化
      setItem(token, state.user)
    }
  },
  actions: {
    async login ({ commit }, user) {
      const res = await reqLogin(user)
      if (res.status === 201) {
        commit('setUser', res.data.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    }
  }
}
