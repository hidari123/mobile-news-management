<!--
 * @Author: hidari
 * @Date: 2022-05-07 14:25:04
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-07 16:11:38
 * @FilePath: \mobile-news-management\src\components\article-item\index.vue
 * @Description: 文章列表项组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <van-cell class="article-item">
      <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <div slot="label">
          <div class="cover-wrap" v-if="article.cover.type === 3">
              <div class="cover-item"
                v-for="(image,index) in article.cover.images"
                :key="index">
                <van-image
                    class="cover-item-img"
                    fit="cover"
                    :src="image"
                    />
              </div>
          </div>
          <div class="label-info-wrap">
            <span>{{article.aut_name}}</span>
            <span>{{article.comm_count}}评论</span>
            <span>{{article.pubdate | relativeTime }}</span>
          </div>
      </div>
      <!-- 1图 -->
      <van-image
      v-if="article.cover.type === 1"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
        slot="default"
      />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
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
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 100%;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
