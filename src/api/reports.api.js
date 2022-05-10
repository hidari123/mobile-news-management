/*
 * @Author: hidari
 * @Date: 2022-05-10 09:37:45
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 09:37:54
 * @FilePath: \mobile-news-management\src\api\reports.api.js
 * @Description: 二级反馈面板的数据
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
/**
 * 以模块的方式导出"举报文章"时，后端接口约定的举报类型
 */
const reports = [
  {
    type: 0,
    label: '其它问题'
  },
  {
    type: 1,
    label: '标题夸张'
  },
  {
    type: 2,
    label: '低俗色情'
  },
  {
    type: 3,
    label: '错别字多'
  },
  {
    type: 4,
    label: '旧闻重复'
  },
  {
    type: 6,
    label: '内容不实'
  },
  {
    type: 8,
    label: '侵权'
  },
  {
    type: 5,
    label: '广告软文'
  },
  {
    type: 7,
    label: '涉嫌违法犯罪'
  }
]
export default reports
