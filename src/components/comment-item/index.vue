<!--
 * @Author: hidari
 * @Date: 2022-05-11 10:15:27
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-11 18:36:10
 * @FilePath: \mobile-news-management\src\components\comment-item\index.vue
 * @Description: 文章评论项组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :class="{liked: comment.is_liking}"
        @click="onCommentLike"
        :loading="commentLoading"
      >{{ comment.like_count || '赞' }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comment.pubdate | relativeTime }}</span>
        <van-button
          v-if="reply"
          class="reply-btn"
          round
          @click="$emit('click-reply', comment)"
        >回复 {{ comment.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { reqAddCommentLike, reqDeleteCommentLike } from '@/api/comment.api.js'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    // 数组 可以改值 不能覆盖
    comment: {
      type: Object,
      required: true
    },
    // 是否显示“回复”
    reply: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      commentLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    async onCommentLike () {
      this.commentLoading = true
      const { comment } = this
      try {
        if (comment.is_liking) {
          // 已经点赞 取消
          await reqDeleteCommentLike(comment.com_id)
        } else {
          // 没有点赞 点赞
          await reqAddCommentLike(comment.com_id)
        }
        // 更新视图状态
        comment.is_liking = !comment.is_liking
        comment.like_count += comment.is_liking ? 1 : -1
        this.$toast.success(comment.is_liking ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
        color: #e5645f;
    }
  }
}
</style>
