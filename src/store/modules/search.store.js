import { searchHistories } from '@/constants'
import { getItem, setItem } from '@/utils/storage'

/*
 * @Author: hidari
 * @Date: 2022-05-09 16:01:41
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 17:06:23
 * @FilePath: \mobile-news-management\src\store\modules\search.store.js
 * @Description: search模块仓库
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
export default {
  namespaced: true,
  state () {
    return {
      // 搜索历史纪录
      searchHistories: getItem(searchHistories) || []
    }
  },
  mutations: {
    /**
       * 存储搜索历史纪录
       * @param {*} state
       * @param {*} val 历史记录
       * 要求：不要有重复历史记录，最新的排在前面
       */
    setSearchHistories (state, val) {
      const index = state.searchHistories.indexOf(val)
      if (index !== -1) {
        // 如果已经存在 先移除
        state.searchHistories.splice(index, 1)
      }
      // 插入数组最顶部
      state.searchHistories.unshift(val)
      // 数据持久化
      setItem(searchHistories, state.searchHistories)
    },

    /**
     * 删除单条搜索历史纪录
     * @param {*} state
     * @param {*} index 要删除的历史纪录的下标
     */
    deleteSearchHistories (state, index) {
      state.searchHistories.splice(index, 1)
      // 数据持久化
      setItem(searchHistories, state.searchHistories)
    },

    /**
     * 删除全部搜索历史纪录
     * @param {*} state
     * @param {*} index
     */
    deleteAllSearchHistories (state) {
      state.searchHistories = []
    }
  }
}
