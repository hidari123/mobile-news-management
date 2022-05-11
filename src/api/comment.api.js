/*
 * @Author: hidari
 * @Date: 2022-05-11 09:47:23
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-11 15:37:57
 * @FilePath: \mobile-news-management\src\api\comment.api.js
 * @Description: 评论请求模块
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 获取文章评论列表
 * @param {*} params
 * type 是 a或c评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * source 是 源id，文章id或评论id
 * offset 否 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * limit 否 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
export const reqGetComments = (params) => request({
  method: 'GET',
  url: '/comments',
  // get 参数 使用 params 进行传递
  // 写的时候是对象 => 最终返回后端的数据是
  // axios 会把 params 对象 转为 key=value?key=value 的格式放到 url中做请求
  params
})

/**
 * 对评论或评论回复点赞
 * @param {*} commentId 点赞的评论id
 * @returns
 */
export const reqAddCommentLike = (commentId) => request({
  method: 'POST',
  url: '/comment/likings',
  data: {
    target: commentId
  }
})

/**
 * 取消对评论或评论回复点赞
 * @param {*} commentId 点赞的评论id
 * @returns
 */
export const reqDeleteCommentLike = (commentId) => request({
  method: 'DELETE',
  url: `/comment/likings/${commentId}`

})

/**
 * 发布文章评论或评论回复
 * @param {*} data
 * target string 必须 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * content string 必须 评论内容
 * art_id string 必须 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns
 */
export const reqAddComment = data => request.post('/comments', data)
