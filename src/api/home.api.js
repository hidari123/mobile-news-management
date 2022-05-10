/*
 * @Author: hidari
 * @Date: 2022-05-07 10:47:12
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 09:56:56
 * @FilePath: \mobile-news-management\src\api\home.api.js
 * @Description: 主页相关api
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 请求用户频道列表
 * @returns
 */
export const reqGetUserChannel = () => request.get('/user/channels')

/**
 * 请求全部频道列表
 * @returns
 */
export const reqGetChannel = () => request.get('/channels')

/**
 * 根据频道 Id 请求频道下的文章列表数据
 * @param {*} id 频道的 Id
 * @param {*} time 时间戳
 * @returns
 */
export const reqGetArtList = (params) => request.get('/articles', {
  params
})

/**
 * 设置用户频道
 * @returns
 */
export const reqAddUserChannels = (channel) => request.patch('/user/channels', {
  channels: [channel]
})

/**
 * 删除指定用户频道
 * @param {*} target 频道id
 * @returns
 */
export const reqDeleteUserChannels = target => request.delete(`/user/channels/${target}`)

/**
 * 将文章设置为不感兴趣
 * @param {*} id 文章的 id
 * @returns
 */
export const reqDislikeArticle = id => request.post('/article/dislikes', {
  target: id
})

/**
 * 举报文章
 * @param {*} target 举报的文章id
 * @param {*} type 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
 * @returns
 */
export const reqReportArticle = (target, type) => request.post('/article/reports', {
  target, // 文章的 Id
  type // 举报的类型
})
