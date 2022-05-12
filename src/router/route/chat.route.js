/*
 * @Author: hidari
 * @Date: 2022-05-12 15:49:31
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-12 15:55:50
 * @FilePath: \mobile-news-management\src\router\route\chat.route.js
 * @Description: hi tari 通信路由
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
export const chat = [
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/chat')
  }
]
