import { reqAddUserChannels, reqDeleteUserChannels, reqGetChannel, reqGetUserChannel } from '@/api/home.api'
import { channels, recommendChannels } from '@/constants'
import { setItem } from '@/utils/storage'
import { Toast } from 'vant'

/*
 * @Author: hidari
 * @Date: 2022-05-07 10:48:53
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 13:22:35
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
      channels: [],
      // 推荐频道列表
      recommendChannels: []
    }
  },
  mutations: {
    /**
       * 用户频道列表
       * @param {*} state
       * @param {*} channels 用户频道列表
       */
    getLoadChannels (state, channels) {
      state.channels = channels
    },

    /**
     * 推荐频道列表
     * @param {*} state
     * @param {*} channels 推荐频道列表
     */
    getRecommendChannels (state, channels) {
      state.recommendChannels = channels.filter(channel => !state.channels.find(myChannel => myChannel.id === channel.id))
    },

    /**
     * 添加频道(本地)
     * @param {*} state
     * @param {*} channel 需要添加的频道
     */
    changeChannels (state, channel) {
      // 替换旧对象的方式触发 mutations
      state.channels.push(channel)
      state.recommendChannels = state.recommendChannels.filter(recommendChannel => recommendChannel.id !== channel.id)
      // 本地持久化
      setItem(channels, state.channels)
      setItem(recommendChannels, state.recommendChannels)
    },

    /**
     * 添加频道(登录)
     * @param {*} state
     * @param {*} channel id => 频道的id, seq => 频道的位置(在数组最后添加)
     */
    changeOnlineChannels (state, channel) {
      const name = state.recommendChannels.find(recommendChannel => recommendChannel.id === channel[0].id)
      state.channels.push(name)
      state.recommendChannels = state.recommendChannels.filter(recommendChannel => recommendChannel.id !== channel[0].id)
    },

    /**
     * 删除频道(本地)
     * @param {*} state
     * @param {*} param1 需要删除的频道
     */
    deleteChannels (state, { channel, index }) {
      state.channels.splice(index, 1)
      console.log(11)
      state.recommendChannels.push(channel)
      // 本地持久化
      setItem(channels, state.channels)
      setItem(recommendChannels, state.recommendChannels)
    },

    deleteOnlineChannels (state, target) {
      state.recommendChannels.push(state.channels.find(channel => channel.id === target))
      state.channels = state.channels.filter(channel => channel.id !== target)
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
    },

    /**
     * 推荐频道列表
     * @param {*} param0
     * @returns
     */
    async getRecommendChannels ({ commit }) {
      const res = await reqGetChannel()
      if (res.message === 'OK') {
        commit('getRecommendChannels', res.data.channels)
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },

    /**
     * 登录状态下添加频道
     * @param {*} param0
     * @param {*} param1 id => 频道的id, seq => 频道的位置(在数组最后添加)
     */
    async addUserChannels ({ commit }, { id, seq }) {
      const res = await reqAddUserChannels({ id, seq })
      if (res.message === '更新用户频道成功') {
        commit('changeOnlineChannels', res.data.channels)
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },

    /**
     * 登录状态下删除频道
     * @param {*} param0
     * @param {*} target 要删除的频道id
     */
    deleteUserChannels ({ commit }, target) {
      reqDeleteUserChannels(target).then(
        commit('deleteOnlineChannels', target)
      ).catch(
        Toast('删除失败, 请稍后重试')
      )
    }
  }
}
