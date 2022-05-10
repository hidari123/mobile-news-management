<!--
 * @Author: hidari
 * @Date: 2022-05-10 19:03:18
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 20:28:22
 * @FilePath: \mobile-news-management\src\components\follow-user\index.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
    <van-button
        class="follow-btn"
        :type="isFollowed ? 'default' : 'info'"
        round
        size="small"
        :icon="isFollowed ? '' : `plus`"
        :loading="loading"
        @click.stop="onFollow"
        >
        <slot>{{ isFollowed ? '已关注' : '关注' }}</slot>
        </van-button>
</template>

<script>
import { reqFollowUser, reqUnfollowUser } from '@/api/article.api.js'
export default {
  name: 'FollowUser',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  model: {
    prop: 'isFollowed', // 默认 value
    event: 'is-followed' // 默认 input
  },
  data () {
    return {
      // 关注按钮 loading
      loading: false
    }
  },
  methods: {
    /**
     * 关注 / 取消关注
     */
    async onFollow () {
      // 开启 loading
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注 取消关注
          await reqUnfollowUser(this.userId)
        } else {
          // 未关注 添加关注
          await reqFollowUser(this.userId)
        }
        // 更新视图状态
        this.$emit('is-followed', !this.isFollowed)
      } catch (error) {
        // 提示错误消息
        if (error.response.data.message) {
          this.$toast(error.response.data.message)
        } else {
          this.$toast('操作失败，请重试')
        }
      }
      // 关闭 loading
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
