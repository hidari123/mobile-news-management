<!--
 * @Author: hidari
 * @Date: 2022-05-10 16:13:29
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-12 11:14:19
 * @FilePath: \mobile-news-management\src\views\article\index.vue
 * @Description: 文章详情组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="article-container"  ref="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="文章详情"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
    <!-- 加载中：loading -->
    <loading-page v-if="loading" />
    <!-- /加载中：loading -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article && article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
            <!-- 头像 -->
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime }}</div>
          <!-- 关注 / 取消关注组件 -->
            <!--
            模板中的 $event 是事件参数
            当我们传递给子组件的数据既要使用还要修改。
              传递：props
                :is-followed="article.is_followed"
              修改：自定义事件
                @update-is_followed="article.is_followed = $event"
            简写方式：在组件上使用 v-model
              value="article.is_followed"
              @input="article.is_followed = $event"

            如果需要修改 v-model 的规则名称，可以通过子组件的 model 属性来配置修改

            一个组件上只能使用一次 v-model，
            如果有多个数据需要实现类似于 v-model 的效果，咋办？
            可以使用属性的 .sync 修饰符。
           -->
          <follow-user
          class="follow-btn"
          :user-id="article.aut_id"
          v-model="article.is_followed"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="article-content" class="article-content markdown-body" v-html="article.content" />
        <van-divider>正文结束</van-divider>

        <van-cell ref="comment-area-tip" title="全部评论" :border="false" id="show"/>

        <!-- 文章评论列表 -->
        <comment-list
        :source="article.art_id"
        @click-reply="onReplyShow"
        :total-count.sync="totalCommentCount"
        :list="articleComments"
        />
        <!-- / 文章评论列表 -->
        <!-- 底部区域 -->
        <article-footer
        :article="article"
        :comment-count="totalCommentCount"
        @click-write="isPostCommentShow = true"
        @click-comment="onCommentClick"
      />
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

    <!-- 加载失败：错误页面 -->
    <error-page v-else @btn-click="loadArticle" />
    <!-- /加载失败：错误页面 -->

    <!-- 发布文章评论 -->
    <van-popup
      v-model="isPostCommentShow"
      position="bottom"
      get-container="body"
    >
      <post-comment :target="articleId" @post-success="onPostSuccess" />
    </van-popup>
    <!-- /发布文章评论 -->

    <!-- 评论回复 -->
    <!-- 弹出层 => 懒渲染
        只有第一次展示才会渲染
        要用 v-if -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      get-container="body"
      :style="{ height: '90%' }"
    >
      <comment-reply
        v-if="isReplyShow"
        :article-id="articleId"
        :comment="currentReplyComment"
        @click-close="replyCloseCallback"
        @total-count="getTotalCount"
      />
    </van-popup>
    <!-- 评论回复 -->
    </div>
  </div>
</template>

<script>
import { reqGetArticleDetail } from '@/api/article.api.js'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import LoadingPage from '@/components/loading-page'
import ErrorPage from '@/components/error-page'
import ArticleFooter from './components/article-footer.vue'
import CommentList from './components/comment-list.vue'
import PostComment from './components/post-comment.vue'
import CommentReply from './components/comment-reply'
// 从 popmotion 中按需导入 animate 动画函数
// import { animate } from 'popmotion'
export default {
  name: 'ArticleIndex',
  components: { FollowUser, LoadingPage, ErrorPage, CommentList, CommentReply, PostComment, ArticleFooter },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  // 给所有后代组件提供数据
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  data () {
    return {
      // 文章的信息对象
      article: {},
      // 加载中
      loading: true,
      // 失败状态码
      errStatus: 0,
      // 关注按钮 loading
      followLoading: false,
      // 评论总数
      totalCommentCount: 0,
      // 控发布评论显示状态
      isReplyShow: false,
      // 当前评论的是哪一条
      currentReplyComment: {},
      // 评论列表
      articleComments: [],
      isPostCommentShow: false
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    this.loadArticle()
  },
  methods: {
    /**
     * 加载文章详情
     */
    async loadArticle () {
      this.loading = true
      try {
        const res = await reqGetArticleDetail(this.articleId)
        // 模拟加载失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('dscdjvcfdnjdkvcjfdlajvcl')
        // }
        // 数据驱动更新视图不是立即的
        this.article = res.data
        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImg()
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
          console.log(this.errStatus === 404)
        }
      }
      this.loading = false
    },

    /**
     * 点击图片预览
     */
    previewImg () {
      // 得到 img 节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.dataset.src)
        // 给每个 img 注册点击事件
        img.addEventListener('click', () => {
          // 图片预览
          ImagePreview({
            images,
            // 起始位置，从 0 开始
            startPosition: index
          })
        })
      })
    },

    /**
     * 显示评论回复组件
     */
    onReplyShow (comment) {
      this.currentReplyComment = comment
      console.log(this.currentReplyComment)
      this.isReplyShow = true
    },

    /**
     * 让页面滚动到评论区(未生效)
     */
    onCommentClick () {
      // 让页面滚动到评论区
    //   const articleContainer = this.$refs['article-container']
    //   const commentAreaTip = this.$refs['comment-area-tip']
    //   this.$nextTick(() => {
    //     setTimeout(() => {
    //       articleContainer.scrollTop = commentAreaTip.offsetTop - 50
    //     }, 20)
    //   })

      //   console.log(articleContainer.scrollTop, commentAreaTip.offsetTop - 50)
      // 注意：from 是起始位置，就是滚动条当前的位置
      // 注意：to 是目标位置，就是 div.article-container 元素的整体高度
      // 1. 当前滚动条的位置
      // 子元素调用自身的 scrollIntoView 方法，可以把自己呈现到父容器的可视区域中
      this.$refs['comment-area-tip'].scrollIntoView({
        // smooth 表示平滑滚动
        behavior: 'smooth',
        // 定义垂直方向的对齐（end 表示"元素的底端"将和其所在滚动区的可视区域的底端对齐）
        block: 'start'
      })
      // 注意：from 是起始位置，就是滚动条当前的位置
      // 注意：to 是目标位置，就是 div.article-container 元素的整体高度
      console.log(window.scrollY, document.querySelector('div.main-wrap').offsetHeight)
    //   animate({
    //     from: window.scrollY,
    //     to: document.querySelector('div.main-wrap').offsetHeight,
    //     // 只要值发生了变化，就会触发 onUpdate 函数，通过形参 latest 可以拿到当前最新的值
    //     onUpdate: function (latest) {
    //       // 调用 window.scrollTo(x, y) 来让滚动条滚动到目标位置
    //       // x 是横向滚动的位置
    //       // y 是纵向滚动的位置
    //       window.scrollTo(0, latest)
    //     }
    //   })
    },

    /**
     * 发布成功的回调函数
     */
    onPostSuccess (commentWrite) {
      // 关闭弹出层
      this.isPostCommentShow = false
      // 将发布内容展示到列表顶部
      this.articleComments.unshift(commentWrite.new_obj)
      // 评论总数 + 1
      this.totalCommentCount = parseInt(this.article.comm_count) + 1
    },

    replyCloseCallback () {
      this.isReplyShow = false
    },
    /**
     * 回复发布成功后评论总数 + 1
     */
    getTotalCount () {
      // 评论总数 + 1
      this.totalCommentCount = parseInt(this.article.comm_count) + 1
    }
  }
}
</script>

<style scoped lang="less">
@import url('./github-markdown.css');
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }
}
</style>
