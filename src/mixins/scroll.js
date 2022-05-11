/*
 * @Author: hidari
 * @Date: 2022-05-11 19:03:15
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-11 19:03:18
 * @FilePath: \mobile-news-management\src\mixins\scroll.js
 * @Description: 滚动监听混入
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
export default {
  activated () {
    // 为 window 对象，绑定 scroll 事件的监听
    window.addEventListener('scroll', this.scrollHandler)
  },
  deactivated () {
    // 为 window 对象，移除 scroll 事件的监听
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    // 滚动的事件监听处理函数
    scrollHandler () {
      // console.log(window.scrollY)
      this.$route.meta.top = window.scrollY
    }
  }
}
