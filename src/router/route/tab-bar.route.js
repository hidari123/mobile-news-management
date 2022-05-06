/*
 * @Author: hidari
 * @Date: 2022-05-06 14:19:00
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 14:32:04
 * @FilePath: \mobile-news-management\src\router\route\tab-bar.route.js
 * @Description: 底部标签栏
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
export const tabBar = [
  {
    path: '/',
    component: () => import('@/components/tab-bar'),
    children: [
      { // 首页
        path: '', // 默认子路由
        name: 'Home',
        component: () => import('@/views/home')
      },
      { // 我的
        path: '/my',
        name: 'My',
        component: () => import('@/views/my')
      },
      { // 问答
        path: '/qa',
        name: 'Qa',
        component: () => import('@/views/qa')
      },
      { // 视频
        path: '/video',
        name: 'Video',
        component: () => import('@/views/video')
      }
    ]
  }
]
