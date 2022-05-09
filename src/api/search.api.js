/*
 * @Author: hidari
 * @Date: 2022-05-09 14:30:45
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 15:31:09
 * @FilePath: \mobile-news-management\src\api\search.api.js
 * @Description: search 模块 api
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 获取联想建议（自动补全）
 * @param {*} q 请求的前缀词句
 * @returns
 */
export const reqGetSearchSuggestions = q => request({
  method: 'GET',
  url: '/suggestion',
  params: {
    q
  }
})

/**
 * 获取搜索结果
 * @param {*} params
 * @returns
 */
export const reqGetSearchResult = params => request({
  method: 'GET',
  url: 'search',
  params
})
