<!--
 * @Author: hidari
 * @Date: 2022-05-10 16:13:29
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 21:53:54
 * @FilePath: \mobile-news-management\src\views\article\index.vue
 * @Description: 文章详情组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="article-container">
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
        <!-- 底部区域 -->
        <div class="article-bottom">
        <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
        >写评论</van-button>
        <van-icon
            name="comment-o"
            badge="123"
            color="#777"
        />
        <!-- 文章收藏 -->
        <collect-article
        class="btn-icon"
        v-model="article.is_collected"
        :article-id="article.art_id"
        />
        <!-- 文章点赞 -->
        <like-article
        class="btn-icon"
        v-model="article.attitude"
        :article-id="article.art_id"
        />
        <van-icon name="share" color="#777777"></van-icon>
        </div>
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
    </div>
  </div>
</template>

<script>
import { reqGetArticleDetail } from '@/api/article.api.js'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import LoadingPage from '@/components/loading-page'
import ErrorPage from '@/components/error-page'
export default {
  name: 'ArticleIndex',
  components: { FollowUser, CollectArticle, LikeArticle, LoadingPage, ErrorPage },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
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
      followLoading: false
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

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    /deep/ .comment-btn {
      border: 1px solid #eeeeee;
      font-size: 30px;
      color: #a7a7a7;
    //   border: none;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
}
.btn-icon {
    border: none;
}
</style>
