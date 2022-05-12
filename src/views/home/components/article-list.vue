<!--
 * @Author: hidari
 * @Date: 2022-05-09 08:59:21
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-12 16:00:51
 * @FilePath: \mobile-news-management\src\views\home\components\article-list.vue
 * @Description: 文章列表组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="article-list">
    <van-pull-refresh
    v-model="refreshLoading"
    @refresh="onRefresh"
    :success-duration="1500"
    :disabled="finished">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          :article="article"
          v-for="(article, index) in list"
          :key="index"
          @remove-article="removeArticle"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { reqGetArtList } from '@/api/home.api.js'

export default {
  name: '',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false, // 加载更多 loading
      refreshLoading: false, // 下拉刷新 loading
      list: [], // 数据列表
      finished: false, // 是否结束
      timestamp: null // 请求下一页的时间戳
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await reqGetArtList({
        channel_id: this.channel.id, // 频道 id
        timestamp: this.timestamp || Date.now() // 获取下一页数据的时间戳，Date.now() 表示获取当前最新数据
      })

      // 模拟加载出错
      // if (Math.random() > 0.5) {
      //   JSON.parse('ddvcfdvcfdvfda')
      // }

      // 2. 将数据添加到当前频道的文章列表中
      // ...数组，数组的展开操作符，它会把数组元素一个一个的拿出来，传递给使用的位置
      const { results } = data
      this.list.push(...results)

      // 3. 将 loading 设置为 false
      this.loading = false

      // 4. 判断还有下一页数据，则更新获取下一个数据的时间戳
      //    如果没有了，则将 finished 设置为 true，不再加载更多了
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      // 1. 请求获取最新数据
      const { data } = await reqGetArtList({
        channel_id: this.channel.id,
        timestamp: Date.now() // 获取最新数据传递当前最新时间戳即可
      })

      // 2. 把数据放到列表的顶部
      const results = data.results
      let message = ''
      if (results[0].art_id !== this.list[0].art_id) {
        this.list.unshift(...results)
        message = `更新了${results.length}条数据`
      } else {
        message = '暂无数据更新'
      }

      // 3. 停止下拉刷新的转圈圈
      this.refreshLoading = false

      // 4. 提示用户刷新成功
      this.$toast(message)
    },
    // 从文章列表中移除指定 id 的文章
    removeArticle (id) {
    // 对原数组进行 filter 方法的过滤
      this.list = this.list.filter(item => item.art_id.toString() !== id)

      // 2. 判断剩余数据的文章数量是否小于 10
      if (this.list.length < 10) {
      // 主动请求下一页的数据
        this.onLoad()
      }
    }
  }
}
</script>

<style scoped>
/**.article-list
以下不受父元素影响 响应式单位
vw(宽)
说明：视口就是ＰＣ端和手机端的可视区的的尺寸。
相对于视口的宽度，视口被均分为100单位的vw

vh(高)
说明：
相对于视口的高度。视口被均分为100单位的vh

vmax
说明：
相对于视口的宽度或高度中较大的那个。其中最大的那个被均分为100单位的vmax

vmin
说明：
相对于视口的宽度或高度中较小的那个。其中最小的那个被均分为100单位的vmin
*/
.article-list {
  height: 83vh;
  overflow: auto;
}
</style>
