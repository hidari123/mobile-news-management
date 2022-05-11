<template>
  <div class="comment-reply">
    <!-- 评论回复 -->
    <van-nav-bar class="nav-bar" :title="comments.length > 0 ? `${comments.length}条回复` : '暂无回复'">
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>

    <comment-item :comment="comment" :reply="false" />

    <van-cell :title="comment.reply_count > 0 ? '全部评论' : '快来发布第一条评论吧~'" :border="false" />

    <!-- 回复列表 -->
    <comment-list
      :source="comment.com_id"
      is-comment
      type="c"
      :list="comments"
      :total-count.sync="comment.reply_count"
      @click-reply="onClickReply"
      :reply="false"
    />
    <!-- /回复列表 -->

    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="onWriteClick"
      >写评论</van-button>
    </div>
    <!-- /评论回复 -->

    <!-- 发布评论回复 -->
    <van-popup
      class="post-comment-popup"
      v-model="isPostShow"
      position="bottom"
    >
        <post-comment
        :target="target"
        :article-id="articleId"
        @post-success="onPostSuccess"
        :reply-to="replyTo"
      />
    </van-popup>
    <!-- /发布评论回复 -->
  </div>
</template>

<script>
import CommentItem from '@/components/comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      comments: [],
      isPostShow: false,
      target: this.comment.com_id,
      replyTo: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onPostSuccess (comment) {
      // 将新添加的评论展示到顶部
      this.comments.unshift(comment.new_obj)
      // 更新当前评论中的总数量
      this.comment.reply_count++

      this.$emit('total-count')

      // 关闭发布弹窗
      this.isPostShow = false
    },

    onClickReply (comment) {
      this.target = comment.com_id
      this.replyTo = comment
      console.log(this.replyTo)
      this.isPostShow = true
    },

    onWriteClick () {
      this.target = this.comment.com_id
      this.replyTo = null
      this.isPostShow = true
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 10%;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .write-btn {
    width: 60%;
  }
  .van-icon {
    font-size: 20px;
  }
  .comment-icon {
    bottom: -2px;
  }
  .share-icon {
    bottom: -2px;
  }
}
</style>
