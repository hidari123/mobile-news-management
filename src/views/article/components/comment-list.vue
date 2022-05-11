<!--
 * @Author: hidari
 * @Date: 2022-05-11 09:43:53
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-11 18:15:53
 * @FilePath: \mobile-news-management\src\views\article\components\comment-list.vue
 * @Description: 文章评论列表
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <!-- :immediate-check="false" 关闭首次初始位置检查 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      :immediate-check="false"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
    <comment-item
    v-for="(item,index) in list"
    :key="index"
    :comment="item"
    @click-reply="$emit('click-reply', $event)"
    :reply="reply"
    />
    </van-list>
  </div>
</template>

<script>
import { reqGetComments } from '@/api/comment.api.js'
import CommentItem from '@/components/comment-item'
export default {
  name: 'CommentList',
  props: {
    // 查看文章评论：文章ID
    // 查看评论回复：评论ID
    source: {
      type: [Number, String, Object],
      required: true
    },
    // 评论总数
    totalCount: {
      type: Number
    },
    // 评论列表
    list: {
      type: Array,
      // 数组或对象默认值要写一个方法 return 出去
      default: () => []
    },
    // a或c评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
    type: {
      type: String,
      // 自定义 prop 数据验证
      validator (value) {
        // 传入的值要么是a要么是c 返回布尔值
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    },
    reply: {
      type: Boolean,
      default: true
    }
  },
  components: { CommentItem },
  data () {
    return {
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      limit: 10,
      error: false
    }
  },
  created () {
    // 手动开启 初始 loading
    this.loading = true
    // 开始就调用一次，拿到评论总数
    this.onLoad()
  },
  methods: {
    async onLoad () {
      // 请求数据
      try {
        const { data } = await reqGetComments({
          type: this.type, // a或c评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 传参时候 toString axios 不会自动拼接''
          offset: this.offset,
          limit: this.limit
        })
        const { results, total_count: totalCount } = data
        // 数据添加到列表中
        this.list.push(...results)
        // 文章评论内容双向绑定父组件
        // console.log(this.list)
        // this.$emit('update:list', this.list)
        // 文章评论数传递给父组件
        console.log(totalCount)
        this.$emit('update:total-count', totalCount)
        // loading 设为 false
        this.loading = false
        // 判断是否还有数据
        if (data.last_id !== null) {
          this.offset = data.last_id
        } else {
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

<style scoped lang="less">
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
</style>
