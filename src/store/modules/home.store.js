import { reqGetUserChannel } from '@/api/home.api'

/*
 * @Author: hidari
 * @Date: 2022-05-07 10:48:53
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-07 13:57:39
 * @FilePath: \mobile-news-management\src\store\modules\home.store.js
 * @Description: home相关仓库
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
export default {
  namespaced: true,
  state: () => {
    return {
      // 用户频道列表
      channels: []
    }
  },
  mutations: {
    getLoadChannels (state, channels) {
      state.channels = channels
    }
  },
  actions: {
    /**
     * 获取用户频道列表
     * @param {*} params
     * @returns
     */
    async getLoadChannels ({ commit }) {
      const res = await reqGetUserChannel()
      if (res.message === 'OK') {
        commit('getLoadChannels', res.data.channels)
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    }
  }
}
