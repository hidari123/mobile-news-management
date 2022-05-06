// @ts-nocheck
/*
 * @Author: hidari
 * @Date: 2022-05-06 09:28:28
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 12:27:01
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
