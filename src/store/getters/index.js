/*
 * @Author: hidari
 * @Date: 2022-05-06 16:22:56
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-12 16:44:18
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
  },
  userAvatar: state => {
    // 默认的头像地址
    let imgSrc = 'https://img.yzcdn.cn/vant/cat.jpeg'
    // 如果用户信息对象中包含 photo 属性的值，则为 imgSrc 重新赋值
    if (state.user.userInfo.photo) {
      imgSrc = state.user.userInfo.photo
    }
    return imgSrc
  }
}
export default getters
