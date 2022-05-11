<!--
 * @Author: hidari
 * @Date: 2022-05-11 11:23:23
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-11 12:16:07
 * @FilePath: \mobile-news-management\src\views\article\components\article-footer.vue
 * @Description: 文章详情底部区域
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="footer">
        <!-- 底部区域 -->
        <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="$emit('click-write')"
        >写评论</van-button>
        <van-icon
            name="comment-o"
            :badge="commentCount"
            color="#777"
            @click="$emit('click-comment')"
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
        <!-- /底部区域 -->
  </div>
</template>

<script>
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'

export default {
  name: 'ArticleFooter',
  components: { CollectArticle, LikeArticle },
  props: {
    article: {
      type: Object,
      required: true
    },
    commentCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  }
}
</script>

<style scoped lang="less">
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
    width: 160px;
  }
  .van-icon {
    font-size: 40px;
  }
  .comment-icon {
    bottom: -2px;
  }
  .share-icon {
    bottom: -2px;
  }
}
.btn-icon {
    border: none;
}
</style>
