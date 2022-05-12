// @ts-nocheck
/*
 * @Author: hidari
 * @Date: 2022-05-06 09:28:28
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-12 15:12:45
 * @FilePath: \mobile-news-management\src\api\user.api.js
 * @Description: 封装user的 API 接口
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 登录的 API 接口
 * @param {*} data
 * @returns
 */
export const reqLogin = data => request.post('/authorizations', data)

/**
 * 发送验证码 一分钟只能发送一次
 * @param {*} mobile
 * @returns
 */
export const reqSendSms = mobile => request.get(`/sms/codes/${mobile}`)

/**
 * 获取用户个人信息
 * @returns
 */
export const reqGetUserInfo = () => request.get('/user')

/**
 * 获取个人资料信息
 * @returns
 */
export const reqGetUserProfile = () => request.get('/user/profile')

/**
 * 修改个人资料
 * @param {*} data
 * @returns
 */
export const reqUpdateUserProfile = (data) => request.patch('/user/profile', data)

/**
 * 修改用户头像
 * @param {*} data
 * @returns
 */
export const reqUpdateUserAvatar = data => request.patch('/user/photo', data)
