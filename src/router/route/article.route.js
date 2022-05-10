/*
 * @Author: hidari
 * @Date: 2022-05-10 16:14:48
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 16:23:18
 * @FilePath: \mobile-news-management\src\router\route\article.route.js
 * @Description: 文章详情组件路由
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import Article from '@/views/article'
export const article = [
  {
    path: '/article/:articleId',
    name: 'Article',
    component: Article,
    props: true // 开启 props 传参 把路由参数映射到组件中
  }
]
