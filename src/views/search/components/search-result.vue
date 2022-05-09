<!--
 * @Author: hidari
 * @Date: 2022-05-09 14:05:23
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 15:57:57
 * @FilePath: \mobile-news-management\src\views\search\components\search-result.vue
 * @Description: 搜索结果组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="search-result">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        >
        <van-cell v-for="article in list" :key="article.id" :title="article.title" />
      </van-list>
  </div>
</template>

<script>
import { reqGetSearchResult } from '@/api/search.api.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await reqGetSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText // 关键词
        })
        // 2. 将数据添加到数组列表中
        const { results } = data
        this.list.push(...results)

        // 3. 将本次加载的 loading 关闭
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          //    有 => 更新获取下一个数据的页码
          this.page++
        } else {
          //    没有 => finished = true
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
