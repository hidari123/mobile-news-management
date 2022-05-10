<!--
 * @Author: hidari
 * @Date: 2022-05-10 20:46:56
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 21:07:27
 * @FilePath: \mobile-news-management\src\components\like-article\index.vue
 * @Description: 文章点赞组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
    <van-button
    :class="{liked: isLiked === 1}"
    :icon="isLiked === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
    :loading="loading"
    />
</template>

<script>
import { reqAddLike, reqDeleteLike } from '@/api/article.api.js'
export default {
  name: 'LikeArticle',
  props: {
    isLiked: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  model: {
    prop: 'isLiked',
    event: 'is-like'
  },
  data () {
    return {
      loading: false,
      status: -1
    }
  },
  methods: {
    async onLike () {
      this.loading = true
      this.status = -1
      try {
        if (this.isLiked === 1) {
          // 已点赞 取消点赞
          await reqDeleteLike(this.articleId)
        } else {
          // 未点赞，点赞
          await reqAddLike(this.articleId)
          this.status = 1
        }
        this.$emit('is-like', this.status)
        this.$nextTick(() => {
          this.$toast.success(this.status === 1 ? '点赞成功' : '取消点赞')
        })
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
    .van-icon {
        color: #e5645f;
    }
}
</style>
