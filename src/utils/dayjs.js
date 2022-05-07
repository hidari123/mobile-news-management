/*
 * @Author: hidari
 * @Date: 2022-05-07 15:58:18
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-07 18:06:14
 * @FilePath: \mobile-news-management\src\utils\dayjs.js
 * @Description: dayjs 插件使用
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 导入得到相对时间插件
import rTime from 'dayjs/plugin/relativeTime'
dayjs.extend(rTime)

// 配置语音包为全局使用
dayjs.locale('zh-cn')

// 定义一个全局过滤器 可以在任何组件的模板中使用
// 相当于全局方法 只能供模板使用

export const relativeTime = value => dayjs().to(dayjs(value))

// 全局注册，多文件调用
export default {
  /**
   * vue提供install可供我们开发新的插件及全局注册组件等
   * @param1 {*} Vue vue的构造器，
   * @param2 是可选的选项对象
   */
  install (Vue) {
    /**
     * 相对时间全局过滤器
     *
     * params1: 过滤器名称
     * params2: 过滤器函数
     * 使用方式 {{ 表达式 | 过滤器名称 }}
     * 管道符前面的表达式结果会作为参数传递到过滤器函数中
     * 过滤器的返回值会渲染到使用过滤器的模板位置
     */
    Vue.filter('relativeTime', relativeTime)
  }
}
