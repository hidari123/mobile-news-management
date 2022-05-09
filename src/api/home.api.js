/*
 * @Author: hidari
 * @Date: 2022-05-07 10:47:12
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 13:03:46
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
