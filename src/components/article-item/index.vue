<!--
 * @Author: hidari
 * @Date: 2022-05-07 14:25:04
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 16:19:32
 * @FilePath: \mobile-news-management\src\components\article-item\index.vue
 * @Description: 文章列表项组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
<div class="article-item-container">
    <!-- 文章的信息 -->
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
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
            <!-- 关闭按钮 -->
            <!-- 通过 .stop 事件修饰符，阻止点击事件的冒泡 -->
            <van-icon name="cross" @click.stop="show = true" v-if="closable" />
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
    <!-- 反馈的动作面板 -->
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      :closeable="false"
      @closed="isFirst = true"
      get-container="body">
        <!-- 第一级反馈面板 -->
        <div v-if="isFirst">
            <van-cell :title="item.name" clickable class="center-title" v-for="item in actions" :key="item.name" @click="onCellClick(item.name)" />
        </div>
        <!-- 第二级反馈面板 -->
        <div v-else>
            <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true" />
            <van-cell :title="item.label" clickable title-class="center-title" v-for="item in reports" :key="item.type" @click="reportArticle(item.type)" />
        </div>
    </van-action-sheet>
</div>
</template>

<script>
import reports from '@/api/reports.api.js'
import { reqDislikeArticle, reqReportArticle } from '@/api/home.api.js'
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    },
    // 控制是否展示“叉号”的小图标
    closable: {
      type: Boolean,
      // 默认值为 true，表示展示“叉号”的小图标
      default: true
    }
  },
  data () {
    return {
      // 是否展示反馈面板
      show: false,
      // 第一个面板的可选项列表
      actions: [
        { name: '不感兴趣' },
        { name: '反馈垃圾内容' },
        { name: '拉黑作者' }
      ],
      // 是否展示第一个反馈面板
      isFirst: true,
      // 第二个面板的可选项列表，数组中每一项的格式 { type, label }
      reports
    }
  },
  computed: {
    // 文章 Id 的计算属性
    artId () {
    // 注意：文章对象的 art_id 是大数对象，需要调用 .toString() 方法转换为字符串形式
      return this.article.art_id.toString()
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    /**
     * 一级选项的点击事件处理函数
     */
    async onCellClick (name) {
      if (name === '不感兴趣') {
        // 调用 API 接口，将文章设置为不感兴趣
        const res = await reqDislikeArticle(this.artId)
        if (res.message === 'OK') {
          // TODO：炸楼的操作，触发自定义的事件，将文章 id 发送给父组件
          this.$emit('remove-article', this.artId)
        }
        this.show = false
      } else if (name === '拉黑作者') {
        console.log('拉黑作者')
        this.show = false
      } else if (name === '反馈垃圾内容') {
        // TODO：展示二级反馈面板
        this.isFirst = false
      }
    },
    /**
     * 举报文章（形参 type 是举报的类型值）
     */
    async reportArticle (type) {
    // 1. 发起举报文章的请求
      const res = await reqReportArticle(this.artId, type)
      if (res.message === 'OK') {
        // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
        // this.$emit('remove-article', this.artId)
      }
      // 3. 关闭动作面板
      this.show = false
    }
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
.center-title {
  text-align: center;
}
</style>
