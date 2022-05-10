/*
 * @Author: hidari
 * @Date: 2022-05-10 16:30:31
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 20:36:20
 * @FilePath: \mobile-news-management\src\api\article.api.js
 * @Description: 请求文章的api
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request.js'

/**
 * 获取文章详情的 API
 * @param {*} id 文章的 id
 * @returns
 */
export const reqGetArticleDetail = id => request.get(`/articles/${id}`)

/**
 * 关注用户的 API
 * @param {*} userId 文字作者的 id
 * @returns
 */
export const reqFollowUser = userId => request.post('/user/followings', {
  target: userId
})

/**
 * 取消关注用户的 API
 * @param {*} userId 文字作者的 id
 * @returns
 */
export const reqUnfollowUser = userId => request.delete(`/user/followings/${userId}`)

/**
 * 收藏文章
 * @param {*} target 收藏文章的 id
 * @returns
 */
export const reqAddCollect = target => request({
  method: 'POST',
  url: '/article/collections',
  data: {
    target
  }
})

/**
 * 取消收藏文章
 * @param {*} target 取消收藏文章的 id
 * @returns
 */
export const reqDeleteCollect = target => request({
  method: 'DELETE',
  url: `/article/collections/${target}`
})

/**
 * 点赞文章
 * @param {*} target 点赞文章的 id
 * @returns
 */
export const reqAddLike = target => request({
  method: 'POST',
  url: '/article/likings',
  data: {
    target
  }
})

/**
 * 取消点赞文章
 * @param {*} target 取消点赞文章的 id
 * @returns
 */
export const reqDeleteLike = target => request({
  method: 'DELETE',
  url: `/article/likings/${target}`
})
