/*
 * @Author: hidari
 * @Date: 2022-05-06 13:30:06
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 13:46:26
 * @FilePath: \mobile-news-management\src\utils\storage.js
 * @Description: 封装本地存储模块
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

/**
 * 存储数据
 * @param {*} key 存储字段
 * @param {*} value 字段值
 */
export const setItem = (key, value) => {
  // 持久化存储 token
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * 获取数据
 * @param {*} key 存储字段
 * @returns
 */
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    // 如果是有效的JSON格式字符串
    return JSON.parse(value)
  } catch (error) {
    // 否则
    return value
  }
}

export const removeItem = (key) => {
  return localStorage.removeItem(key)
}
