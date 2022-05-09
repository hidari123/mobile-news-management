<!--
 * @Author: hidari
 * @Date: 2022-05-09 13:50:00
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 16:54:41
 * @FilePath: \mobile-news-management\src\views\search\index.vue
 * @Description: 搜索组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
    <div class="search-container">
        <!-- 搜索栏 -->
        <form action="/" class="search-form">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
                background="#3296fa"
                @focus="isResultShow = false"
            />
        </form>
        <!-- 搜索结果 -->
        <search-result v-if="isResultShow"
          :search-text="searchText"
        />
        <!-- 联想建议 -->
        <search-suggestion
        v-else-if="searchText.trim()"
        :search-text="searchText"
        @search="onSearch"
        />
        <!-- 搜索历史纪录 -->
        <search-history v-else
        :search-histories="searchHistories"
        @search="onSearch"
        />
    </div>
</template>

<script>
import searchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { mapState } from 'vuex'
export default {
  components: { searchHistory, SearchSuggestion, SearchResult },
  name: 'Search',
  data () {
    return {
      searchText: '',
      isResultShow: false // 处理搜索结果的展示
    }
  },
  computed: {
    ...mapState('search', {
      searchHistories: state => state.searchHistories
    })
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史纪录
      this.$store.commit('search/setSearchHistories', val)
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
    padding-top: 100px;
    /deep/ .van-search__action {
        color: #fff;
    }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
