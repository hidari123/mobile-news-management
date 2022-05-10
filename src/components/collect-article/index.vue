<!--
 * @Author: hidari
 * @Date: 2022-05-10 19:52:34
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 20:45:06
 * @FilePath: \mobile-news-management\src\components\collect-article\index.vue
 * @Description: 文章收藏组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
    <van-button
    :class="{collected: isCollected}"
    :icon="isCollected ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
    />
</template>

<script>
import { reqAddCollect, reqDeleteCollect } from '@/api/article.api.js'
export default {
  name: 'CollectArticle',
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  model: {
    prop: 'isCollected',
    event: 'is-collected'
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      try {
        this.loading = true
        if (this.isCollected) {
          // 已收藏 取消收藏
          await reqDeleteCollect(this.articleId)
        } else {
          // 未收藏 点击收藏
          await reqAddCollect(this.articleId)
        }
        // 更新视图
        this.$emit('is-collected', !this.isCollected)
        // 父组件修改状态需要时间
        this.$nextTick(() => {
          this.$toast.success(this.isCollected ? '收藏成功' : '取消收藏')
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
.collected {
    .van-icon {
        color: #ffa500;
    }
}
</style>
