<!--
 * @Author: hidari
 * @Date: 2022-05-09 14:05:12
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 15:06:42
 * @FilePath: \mobile-news-management\src\views\search\components\search-suggestion.vue
 * @Description: 联想建议组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="search-suggestion" v-if="suggestion">
      <van-cell
      v-for="(text,index) in suggestion"
      :key="index"
      @click="$emit('search', text)"
      icon="search">
      <!-- v-html 按照html格式显示文本 -->
      <div slot="title" v-html="highlight(text)"></div>
      </van-cell>
  </div>
</template>

<script>
import { reqGetSearchSuggestions } from '@/api/search.api.js'
// 防抖
// import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      suggestion: [],
      // 延时器
      timer: null
    }
  },
  watch: {
    /**
     * 监听 searchText 文本变化发送请求
     */
    searchText: {
      // searchText 发生改变的时候调用 handler 函数
      // handler函数写法固定
      // 防抖
    //   handler: debounce(function (value) {
    //     // 节流会不断的触发,而防抖仅在最后一次触发
    //     // 防抖适用于,如搜索输入框提示,仅在输入停止后进行一次提示更新,以减少后台压力。
    //     // 节流适用于,如窗体以拖动的方式调整大小,在每次特定的时间片结束后触发一次
    //     this.loadSearchSuggestions(value)
    //   }, 200),
      // 不要写箭头函数
      handler (value) {
        // 清除延时器
        if (this.timer) clearTimeout(this.timer)
        // 如果输入的内容为空，则 return 出去，不开启延时器
        if (this.searchText.trim().length === 0) return

        // 开启延时器
        this.timer = setTimeout(() => {
          this.loadSearchSuggestions(value)
        }, 1000)
      },
      immediate: true
    }
  },
  methods: {
    /**
       * 发送请求方法
       */
    async loadSearchSuggestions (searchText) {
      try {
        const { data } = await reqGetSearchSuggestions(searchText)
        this.suggestion = data.options
      } catch (error) {
        this.$toast('获取联想输入失败')
      }
    },
    /**
     * 关键字高亮显示
     */
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 需要根据数据变量动态创建正则表达式 new RegExp
      /**
       * RegExp 正则表达式构造函数
       * params1 => 匹配模式字符串 根据这个字符串创建正则对象
       * params2 => 匹配模式 要写到字符串中
       */
      const reg = new RegExp(this.searchText, 'gi')
      return text && text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
    /deep/ span.active {
        color: #3296fa !important;
    }
}
</style>
