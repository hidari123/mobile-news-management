<!--
 * @Author: hidari
 * @Date: 2022-05-09 14:04:56
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 16:59:07
 * @FilePath: \mobile-news-management\src\views\search\components\search-history.vue
 * @Description: 搜索历史纪录组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="search-history">
      <van-cell title="历史记录">
          <van-icon name="delete"
          v-if="!isDeleteShow"
          @click="isDeleteShow=true"
          />
          <div v-else>
            <span @click="$store.commit('search/deleteAllSearchHistories')">全部删除</span>
            &nbsp;
            <span @click="isDeleteShow=false">完成</span>
          </div>
      </van-cell>
      <van-cell
      v-for="(item,index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchItem(item,index)"
      >
          <van-icon v-if="isDeleteShow" name="close" />
      </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    /**
     * props 数据
     * 普通数据类型 => 不可修改 => 即使修改也不会影响父组件
     * 引用数据类型 => 可以修改 eg：[].push
     *                不可以重新赋值 eg：xxx = []
     */
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 控制删除显示状态
      isDeleteShow: false
    }
  },
  methods: {
    /**
     * 点击历史记录 删除 / 搜索
     */
    onSearchItem (item, index) {
      if (this.isDeleteShow) {
        // 删除状态 => 删除历史记录数据
        this.$store.commit('search/deleteSearchHistories', index)
      } else {
        // 非删除状态 => 直接进入搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>

</style>
