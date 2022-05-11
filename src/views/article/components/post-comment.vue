<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { reqAddComment } from '@/api/comment.api.js'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 自动聚焦
    document.querySelector('.post-field .van-cell__value .van-field__body textarea').focus()
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        // forbidClick 属性可以禁用背景点击
        forbidClick: true,
        deration: 0 // 如果为 0 则持续显示，新的toast调用会把旧的清除
      })
      try {
        const res = await reqAddComment({
          target: this.target,
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null
        })

        // 关闭弹出层
        // 将发布内容展示到列表顶部
        this.$emit('post-success', res.data)
        this.$toast.success('发布成功')
        // 清空文本框
        this.message = ''
      } catch (error) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
