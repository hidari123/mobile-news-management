/*
 * @Author: hidari
 * @Date: 2022-05-06 16:22:56
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 16:49:25
 * @FilePath: \mobile-news-management\src\store\getters\index.js
 * @Description: 简化数据
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

const getters = {
  /**
     * 判断用户是否登录
     * @param {*} state
     * @returns
     */
  getLogin: state => {
    return state.user.user !== null
  }
}
export default getters
