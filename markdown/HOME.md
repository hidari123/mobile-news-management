<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [首页](#%E9%A6%96%E9%A1%B5)
  - [页面布局](#%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80)
  - [频道列表](#%E9%A2%91%E9%81%93%E5%88%97%E8%A1%A8)
    - [使用 Tab 标签页组件](#%E4%BD%BF%E7%94%A8-tab-%E6%A0%87%E7%AD%BE%E9%A1%B5%E7%BB%84%E4%BB%B6)
    - [展示频道列表](#%E5%B1%95%E7%A4%BA%E9%A2%91%E9%81%93%E5%88%97%E8%A1%A8)
    - [文章列表](#%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8)
      - [封装文章列表组件](#%E5%B0%81%E8%A3%85%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6)
      - [使用 List 列表组件](#%E4%BD%BF%E7%94%A8-list-%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6)
      - [让文章列表固定](#%E8%AE%A9%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E5%9B%BA%E5%AE%9A)
      - [加载文章列表数据](#%E5%8A%A0%E8%BD%BD%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E6%95%B0%E6%8D%AE)
      - [下拉刷新](#%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0)
      - [文章列表项](#%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E9%A1%B9)
      - [文章列表图片的懒加载](#%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8%E5%9B%BE%E7%89%87%E7%9A%84%E6%87%92%E5%8A%A0%E8%BD%BD)
      - [关于第三方图片资源403问题](#%E5%85%B3%E4%BA%8E%E7%AC%AC%E4%B8%89%E6%96%B9%E5%9B%BE%E7%89%87%E8%B5%84%E6%BA%90403%E9%97%AE%E9%A2%98)
      - [处理相对时间](#%E5%A4%84%E7%90%86%E7%9B%B8%E5%AF%B9%E6%97%B6%E9%97%B4)
  - [反馈操作](#%E5%8F%8D%E9%A6%88%E6%93%8D%E4%BD%9C)
    - [展示反馈的动作面板](#%E5%B1%95%E7%A4%BA%E5%8F%8D%E9%A6%88%E7%9A%84%E5%8A%A8%E4%BD%9C%E9%9D%A2%E6%9D%BF)
    - [渲染一级反馈面板的结构](#%E6%B8%B2%E6%9F%93%E4%B8%80%E7%BA%A7%E5%8F%8D%E9%A6%88%E9%9D%A2%E6%9D%BF%E7%9A%84%E7%BB%93%E6%9E%84)
    - [点击一级选项](#%E7%82%B9%E5%87%BB%E4%B8%80%E7%BA%A7%E9%80%89%E9%A1%B9)
    - [渲染二级反馈面板的结构](#%E6%B8%B2%E6%9F%93%E4%BA%8C%E7%BA%A7%E5%8F%8D%E9%A6%88%E9%9D%A2%E6%9D%BF%E7%9A%84%E7%BB%93%E6%9E%84)
    - [渲染二级反馈面板的数据](#%E6%B8%B2%E6%9F%93%E4%BA%8C%E7%BA%A7%E5%8F%8D%E9%A6%88%E9%9D%A2%E6%9D%BF%E7%9A%84%E6%95%B0%E6%8D%AE)
    - [指定动作面板的挂载位置](#%E6%8C%87%E5%AE%9A%E5%8A%A8%E4%BD%9C%E9%9D%A2%E6%9D%BF%E7%9A%84%E6%8C%82%E8%BD%BD%E4%BD%8D%E7%BD%AE)
    - [将文章设置为不感兴趣](#%E5%B0%86%E6%96%87%E7%AB%A0%E8%AE%BE%E7%BD%AE%E4%B8%BA%E4%B8%8D%E6%84%9F%E5%85%B4%E8%B6%A3)
    - [从列表中移除不感兴趣的文章](#%E4%BB%8E%E5%88%97%E8%A1%A8%E4%B8%AD%E7%A7%BB%E9%99%A4%E4%B8%8D%E6%84%9F%E5%85%B4%E8%B6%A3%E7%9A%84%E6%96%87%E7%AB%A0)
    - [炸楼之后防止上拉加载不生效](#%E7%82%B8%E6%A5%BC%E4%B9%8B%E5%90%8E%E9%98%B2%E6%AD%A2%E4%B8%8A%E6%8B%89%E5%8A%A0%E8%BD%BD%E4%B8%8D%E7%94%9F%E6%95%88)
    - [实现举报文章的功能](#%E5%AE%9E%E7%8E%B0%E4%B8%BE%E6%8A%A5%E6%96%87%E7%AB%A0%E7%9A%84%E5%8A%9F%E8%83%BD)
  - [频道编辑](#%E9%A2%91%E9%81%93%E7%BC%96%E8%BE%91)
    - [渲染频道管理的 DOM 结构](#%E6%B8%B2%E6%9F%93%E9%A2%91%E9%81%93%E7%AE%A1%E7%90%86%E7%9A%84-dom-%E7%BB%93%E6%9E%84)
    - [动态计算更多频道的列表数据](#%E5%8A%A8%E6%80%81%E8%AE%A1%E7%AE%97%E6%9B%B4%E5%A4%9A%E9%A2%91%E9%81%93%E7%9A%84%E5%88%97%E8%A1%A8%E6%95%B0%E6%8D%AE)
    - [实现新增频道的功能](#%E5%AE%9E%E7%8E%B0%E6%96%B0%E5%A2%9E%E9%A2%91%E9%81%93%E7%9A%84%E5%8A%9F%E8%83%BD)
    - [切换频道](#%E5%88%87%E6%8D%A2%E9%A2%91%E9%81%93)
    - [实现删除频道的功能](#%E5%AE%9E%E7%8E%B0%E5%88%A0%E9%99%A4%E9%A2%91%E9%81%93%E7%9A%84%E5%8A%9F%E8%83%BD)
    - [频道数据持久化](#%E9%A2%91%E9%81%93%E6%95%B0%E6%8D%AE%E6%8C%81%E4%B9%85%E5%8C%96)
    - [正确的获取首页频道列表数据](#%E6%AD%A3%E7%A1%AE%E7%9A%84%E8%8E%B7%E5%8F%96%E9%A6%96%E9%A1%B5%E9%A2%91%E9%81%93%E5%88%97%E8%A1%A8%E6%95%B0%E6%8D%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-05-09 17:12:28
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 18:23:38
 * @FilePath: \mobile-news-management\markdown\HOME.md
 * @Description: 首页
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->
# 首页

## 页面布局
```vue
<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
```

## 频道列表
### 使用 Tab 标签页组件
```vue
<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        size="small"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 文章频道列表 -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
    </van-tabs>
    <!-- /文章频道列表 -->
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0 // 控制被激活的标签
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
```

### 展示频道列表
```js
/**
 * 请求用户频道列表
 * @returns
 */
export const reqGetUserChannel = () => request.get('/user/channels')
```
```js
    /**
     * 获取用户频道列表
     * @param {*} params
     * @returns
     */
    async getLoadChannels ({ commit }) {
      const res = await reqGetUserChannel()
      if (res.message === 'OK') {
        commit('getLoadChannels', res.data.channels)
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
```
```vue
<van-tabs v-model="active">
  <van-tab
    :title="channel.name"
    v-for="channel in channels"
    :key="channel.id"
  >
    {{ channel.name }}的内容
  </van-tab>
</van-tabs>
```
```less
.channel-tabs {
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    bottom: 20px;
    width: 15px !important;
    height: 3px;
    background: #3296fa;
  }
}
```

### 文章列表

> 目标：加载过的数据列表不要重新加载。

实现思路：准备多个 `list` 数组，每个频道对应一个，查看哪个频道就把数据往哪个频道的列表数组中存放，这样的话就不会导致覆盖问题。个一个声明的话会非常麻烦，所以这里利用组件来处理。

具体实现：

- 封装一个文章列表组件
- 然后在频道列表中把文章列表遍历出来

因为文章列表组件中请求获取文章列表数据需要频道 `id`，所以 频道 `id` 应该作为 `props` 参数传递给文章列表组件，为了方便，直接把频道对象传递给文章列表组件。

#### 封装文章列表组件
```vue
<template>
  <div class="article-list">文章列表</div>
</template>

<script>
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
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
  methods: {}
}
</script>

<style scoped lang="less"></style>
```

> 为什么标签内容是懒渲染的？
> 
> 因为这是 `Tab` 标签页组件本身支持的默认功能，如果不需要可以通过配置 `:lazy-render="false"` 来关闭这个效果。

#### 使用 List 列表组件
```vue
<!-- List 列表：瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。 -->
<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  components: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less"></style>
```
`List` 组件通过 `loading` 和 `finished` 两个变量控制加载状态，
当组件初始化或滚动到到底部时，会触发 `load` 事件并将 `loading` 设置成 `true`，此时可以发起异步操作并更新数据，数据更新完毕后，将 `loading` 设置成 `false` 即可。
若数据已全部加载完毕，则直接将 `finished` 设置成 `true` 即可。

- `load` 事件： 
  - `List` 初始化后会触发一次 `load` 事件，用于加载第一屏的数据。
  - 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，`List` 会继续触发 `load` 事件，直到内容铺满屏幕或数据全部加载完成。
- `loading` 属性：控制加载中的 `loading` 状态 
  - 非加载中，`loading` 为 `false`，此时会根据列表滚动位置判断是否触发 `load` 事件（列表内容不足一屏幕时，会直接触发）
  - 加载中，`loading` 为 `true`，表示正在发送异步请求，此时不会触发 `load` 事件
- `finished` 属性：控制加载结束的状态 
  - 在每次请求完毕后，需要手动将 `loading` 设置为 `false`，表示本次加载结束
  - 所有数据加载结束，`finished` 为 `true`，此时不会触发 `load` 事件

#### 让文章列表固定
解决以下问题：
1. 看不到底部内容(设置 `padding`)
2. 记住列表的滚动位置（每个列表都有自己的滚动容器，每个滚动容器中有不同的滚动位置）
    - 给容器设定样式
    - 每次渲染组件时都渲染一遍容器 不再共用同一个 `body` 滚动
```less
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
```

#### 加载文章列表数据
```js
  data () {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载中的 loading 状态
      finished: false, // 控制加载结束的状态，当加载结束，不再触发加载更多
      timestamp: null // 获取下一页数据的时间戳
    }
  },
```
```js
/**
 * 根据频道 Id 请求频道下的文章列表数据
 * @param {*} id 频道的 Id
 * @param {*} time 时间戳
 * @returns
 */
export const reqGetArtList = (params) => request.get('/articles', {
  params
})
```
```js
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
    }
```
模板绑定：
```vue
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="(article, index) in articles"
    :key="index"
    :title="article.title"
  />
</van-list>
```

#### 下拉刷新

> 主要使用到 `Vant` 中的 `PullRefresh` 下拉刷新 组件。

思路：
1. 使用下拉刷新组件将下拉区域包裹住
2. 注册下拉刷新事件处理函数
3. 发送请求获取文章列表数据
4. 把获取到的数据添加到当前频道的文章列表的顶部

将下拉刷新刷新组件需要的数据初始化到 data 中：
```js
data () {
  return {
    ...
    isRefreshLoading: false, // 下拉刷新的 loading 状态
    refreshSuccessText: '' // 下拉刷新成功的提示文本
  }
}
```
使用下拉刷新组件将文章列表包裹住：
```vue
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
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
```

下拉刷新时会触发组件的 `refresh` 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 `v-model` 设置为 `false`，表示加载完成。
```js
    async onRefresh () {
      // 1. 请求获取最新数据
      const { data } = await reqGetArtList({
        channel_id: this.channel.id,
        timestamp: Date.now() // 获取最新数据传递当前最新时间戳即可
      })

      // 2. 把数据放到列表的顶部
      const results = data.results
      let message = ''
      if (!this.list.indexOf(...results)) {
        this.list.unshift(...results)
        message = `更新了${results.length}条数据`
      } else {
        message = '暂无数据更新'
      }

      // 3. 停止下拉刷新的转圈圈
      this.refreshLoading = false

      // 4. 提示用户刷新成功
      this.$toast(message)
    }
```

#### 文章列表项

**封装组件**
创建 `src/components/article-item/index.vue` 组件
```vue
<template>
  <div class="article-item">文章列表项</div>
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
  methods: {}
}
</script>

<style scoped lang="less"></style>
```

**展示列表项内容**
```js
<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title }}</div>
    <div slot="label">
      <div
        v-if="article.cover.type === 3"
        class="cover-wrap"
      >
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-image"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </div>
    <!-- 默认插槽的名字叫 default，可以省略 -->
    <van-image
      v-if="article.cover.type === 1"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
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
  methods: {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }

  .cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-image {
        width: 100%;
        height: 73px;
      }
    }
  }

  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-wrap span {
    margin-right: 12px;
  }
}
</style>
```

**防止首次加载时触发 load 事件**

1. 在浏览器中经过测试，发现：`<van-list>`组件首次加载的时候，会自动触发一次 `@load` 事件。

2. 经过翻阅 Vant 的官方文档，发现可以为 `<van-list>` 组件绑定 `:immediate-check="false"` 属性，即可防止首次加载时触发 `load` 事件：
```vue
<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <!-- 循环渲染文章的列表 -->
      <art-item v-for="item in artlist" :key="item.art_id" :article="item"></art-item>
    </van-list>
  </div>
</template>
```

#### 文章列表图片的懒加载

> 基于 `Vant` 的 `Lazyload` 懒加载

1. 在 `main.js` 入口文件中，按需导入 `Lazyload` 指令：
```js
import Vant, { Lazyload } from 'vant'
```
2. 在 `main.js` 中将 `Lazyload` 注册为全局可用的指令：
```js
Vue.use(Lazyload)
```
3. 在 `ArtItem.vue` 组件中，删除 `<img>` 标签的 `src` 属性，并应用 `v-lazy` 指令，指令的值是要展示的图片地址：
```html
<!-- 单张图片 -->
<img alt="" class="thumb" v-if="article.cover.type === 1" v-lazy="article.cover.images[0]">

<!-- 三张图片 -->
<div class="thumb-box" v-if="article.cover.type === 3">
  <img alt="" class="thumb" v-for="(item, index) in article.cover.images" :key="index" v-lazy="item">
```


#### 关于第三方图片资源403问题

> 因为本项目接口数据是后端通过爬虫抓取的第三方平台内容，而第三方平台对图片资源做了防盗链保护处理。
> 服务端一般使用 `Referer` 请求头识别访问来源，然后处理资源访问。
> 扩展参考：http://www.ruanyifeng.com/blog/2019/06/http-referer.html

`Referer` 是 `HTTP` 请求头的一部分，当浏览器向 `Web` 服务器发送请求的时候，一般会带上 `Referer`，它包含了当前请求资源的来源页面的地址。服务端一般使用 `Referer` 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。

> 需要注意的是 `referer` 实际上是 "referrer" 误拼写。

解决：
不要发送 `referrer` ，对方服务端就不知道从哪里来

用 `<a>、<area>、<img>、<iframe>、<script>` 或者 `<link>` 元素上的 `referrerpolicy` 属性为其设置独立的请求策略，例如：
```html
<img src="http://……" referrerPolicy="no-referrer">
```
或者直接在 HTMl 页面头中通过 meta 属性全局配置：
```html
<meta name="referrer" content="no-referrer" />
```

#### 处理相对时间

推荐两个第三方库：

- Moment.js
- Day.js

两者都是专门用于处理时间的 JavaScript 库，功能差不多，因为 Day.js 的设计就是参考的 Moment.js。但是 `Day.js` 相比 `Moment.js` 的包体积要更小一些，因为它采用了插件化的处理方式。

Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样。

- Day.js 可以运行在浏览器和 Node.js 中。 
- 🕒 和 Moment.js 相同的 API 和用法 
- 💪 不可变数据 (Immutable) 
- 🔥 支持链式操作 (Chainable) 
- 🌐 国际化 I18n 
- 📦 仅 2kb 大小的微型库 
- 👫 全浏览器兼容 

下面是具体的操作流程。

安装 dayjs：
```shell
npm i dayjs
```
创建封装 `utils/dayjs.js`：
```js
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 导入得到相对时间插件
import rTime from 'dayjs/plugin/relativeTime'
dayjs.extend(rTime)

// 配置语音包为全局使用
dayjs.locale('zh-cn')

// 定义一个全局过滤器 可以在任何组件的模板中使用
// 相当于全局方法 只能供模板使用

export const relativeTime = value => dayjs().to(dayjs(value))

// 全局注册，多文件调用
export default {
  /**
   * vue提供install可供我们开发新的插件及全局注册组件等
   * @param1 {*} Vue vue的构造器，
   * @param2 是可选的选项对象
   */
  install (Vue) {
    /**
     * 相对时间全局过滤器
     *
     * params1: 过滤器名称
     * params2: 过滤器函数
     * 使用方式 {{ 表达式 | 过滤器名称 }}
     * 管道符前面的表达式结果会作为参数传递到过滤器函数中
     * 过滤器的返回值会渲染到使用过滤器的模板位置
     */
    Vue.filter('relativeTime', relativeTime)
  }
}
```
在 `main.js` 中加载初始化：
```js
// 加载 dayjs 初始化配置
import dayjs from '@/utils/dayjs'
Vue.use(dayjs)
```

使用过滤器：
```vue
<span>{{ article.pubdate | relativeTime }}</span>
```

## 反馈操作

### 展示反馈的动作面板

> 基于 Vant 的 `ActionSheet` 动作面板组件

1. `\src\components\article-item\index.vue`声明**动作面板**对应的 DOM 结构：
```html
<!-- 文章的信息 -->
<van-cell></van-cell>

<!-- 反馈的动作面板 -->
<van-action-sheet v-model="show" cancel-text="取消" :closeable="false">
  <div class="content">内容</div>
</van-action-sheet>
```

2. 在 ArtItem.vue 组件的 data 中声明布尔值 show，用来控制动作面板的显示与隐藏：
```js
data() {
  return {
    // 是否展示反馈面板
    show: false
  }
}
```
3. 在点击 `ArtItem.vue` 组件中的“关闭按钮”时，展示反馈的动作面板：
```html
<!-- 关闭按钮 -->
<!-- 通过 .stop 事件修饰符，阻止点击事件的冒泡 -->
<van-icon name="cross" @click.stop="show = true" />
```

### 渲染一级反馈面板的结构

> 基于 Vant 的 `Cell` 单元格组件

1. 在 `ArtItem.vue` 组件的反馈动作面板中，声明如下的一级反馈面板可选项：
```html
<!-- 反馈的动作面板 -->
<van-action-sheet v-model="show" cancel-text="取消" :closeable="false">
  <!-- 第一级反馈面板 -->
  <div>
    <van-cell title="aaa" clickable class="center-title" />
    <van-cell title="aaa" clickable class="center-title" />
    <van-cell title="aaa" clickable class="center-title" />
  </div>
</van-action-sheet>
```

2. 在 `ArtItem.vue` 组件的 `<style>` 节点下，声明 `center-title` 类名：
```less
.center-title {
  text-align: center;
}
```

3. 在 `ArtItem.vue` 组件的 `data` 中声明如下的 `actions` 可选项数组：
```js
data() {
  return {
    // 第一个面板的可选项列表
    actions: [
      { name: '不感兴趣' },
      { name: '反馈垃圾内容' },
      { name: '拉黑作者' }
    ]
  }
}
```

4. 基于 `v-for` 指令，循环渲染一级反馈面板的可选项列表：
```html
<!-- 反馈的动作面板 -->
<van-action-sheet v-model="show" cancel-text="取消" :closeable="false">
  <!-- 第一级反馈面板 -->
  <div>
    <!-- 循环渲染可选项 -->
    <van-cell :title="item.name" clickable class="center-title" v-for="item in actions" :key="item.name" />
  </div>
</van-action-sheet>
```

### 点击一级选项
1. 为一级选项绑定名为 `onCellClick` 的点击事件处理函数，同时把当前选项的 `name` 作为参数，传递给事件处理函数：
```html
<!-- 一级选项 -->
<van-cell :title="item.name" clickable class="center-title" v-for="item in actions" :key="item.name" @click="onCellClick(item.name)" />
```

2. 在 `ArtItem.vue` 组件的 `methods` 节点下，声明 `onCellClick` 方法如下：
```js
methods: {
  // 一级选项的点击事件处理函数
  onCellClick(name) {
    if (name === '不感兴趣') {
      console.log('不感兴趣')
      this.show = false

    } else if (name === '拉黑作者') {
      console.log('拉黑作者')
      this.show = false

    } else if (name === '反馈垃圾内容') {
      // TODO：展示二级反馈面板
    }
  }
}
```

### 渲染二级反馈面板的结构

1. 在 `ArtItem.vue` 组件的反馈动作面板中，声明如下的二级反馈面板：
```html
<!-- 反馈的动作面板 -->
<van-action-sheet v-model="show" cancel-text="取消" :closeable="false">
  <!-- 第一级反馈面板 -->
  <div>
    <van-cell :title="item.name" clickable class="center-title" v-for="item in actions" :key="item.name" @click="onCellClick(item.name)" />
  </div>
  <!-- 第二级反馈面板 -->
  <div>
    <van-cell title="返回" clickable title-class="center-title" />
  </div>
</van-action-sheet>
```

2. 在 `ArtItem.vue` 组件的 `data` 节点下，定义名为 `isFirst` 的布尔值，用来控制是否展示第一个面板：
```js
data() {
  // 省略其它数据项...

  // 是否展示第一个反馈面板
  isFirst: true
}
```

3. 在 `ArtItem.vue` 组件中的反馈动作面板中，结合 `v-if` 与 `v-else` 指令，按需展示对应的反馈面板：
```html
<van-action-sheet v-model="show" cancel-text="取消" :closeable="false">
  <!-- 第一级反馈面板 -->
  <div v-if="isFirst">
    <van-cell :title="item.name" clickable class="center-title" v-for="item in actions" :key="item.name" @click="onCellClick(item.name)" />
  </div>
  <!-- 第二级反馈面板 -->
  <div v-else>
    <van-cell title="返回" clickable title-class="center-title" />
  </div>
</van-action-sheet>
```

4. 点击一级反馈面板中的反馈垃圾内容选项时，将 `isFirst` 设置为 `false`，从而展示二级反馈面板：
```js
else if (name === '反馈垃圾内容') {
  // TODO：展示二级反馈面板
  this.isFirst = false
}
```

5. 当点击二级反馈面板中的返回时，将 `isFirst` 设置为 `true`，从而展示一级反馈面板：
```html
<!-- 第二级反馈面板 -->
<div v-else>
  <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true" />
</div>
```

6. 监听 `<van-action-sheet>` 的 `@closed` 事件，当动作面板完全关闭且结束动画以后，将 `isFirst` 设置为 `true`。保证下次打开动作面板时，默认展示第一个反馈面板：
```html
<!-- 反馈的动作面板 -->
<van-action-sheet v-model="show" cancel-text="取消" :closeable="false" @closed="isFirst = true">
  <!-- 省略其它代码 -->
</van-action-sheet>
```

### 渲染二级反馈面板的数据

1. 在 `/src/api/` 目录下，新建 `reports.api.js` 模块，用来定义第二个反馈面板要用到的列表数据：
```js
// 以模块的方式导出"举报文章"时，后端接口约定的举报类型
const reports = [
  {
    type: 0,
    label: '其它问题'
  },
  {
    type: 1,
    label: '标题夸张'
  },
  {
    type: 2,
    label: '低俗色情'
  },
  {
    type: 3,
    label: '错别字多'
  },
  {
    type: 4,
    label: '旧闻重复'
  },
  {
    type: 6,
    label: '内容不实'
  },
  {
    type: 8,
    label: '侵权'
  },
  {
    type: 5,
    label: '广告软文'
  },
  {
    type: 7,
    label: '涉嫌违法犯罪'
  }
]
export default reports
```

2. 在 ArtItem.vue 组件中，导入 /src/api/reports.api.js 模块：
```js
import reports from '@/api/reports.api'
```

3. 并将导入得到的 `reports` 数组挂载为 `ArtItem.vue` 组件的 `data` 数据，供模板结构进行 v-for 循环的渲染：
```js
data() {
  return {
    // 省略其它数据项...

    // 第二个面板的可选项列表，数组中每一项的格式 { type, label }
    reports
  }
}
```

4. 在 `ArtItem.vue` 组件的模板结构中，循环渲染二级反馈面板的可选项列表：
```html
<!-- 第二级反馈面板 -->
<div v-else>
  <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true" />
  <van-cell :title="item.label" clickable title-class="center-title" v-for="item in reports" :key="item.type" />
</div>
```

### 指定动作面板的挂载位置
1. 默认情况下，我们是在 `ArtItem.vue` 组件中使用的 `<van-action-sheet>` 组件，因此动作面板的 `DOM` 结构会被渲染到 `List` 列表组件 内部
    - 导致的问题：动作面板中的内容上下滑动时，会导致 `List` 列表组件的 下拉刷新
    - 解决方案：把 `ActionList` 组件，通过 `get-container` 属性，挂载到 `body` 元素下：
```html
<van-action-sheet v-model="show" cancel-text="取消" :closeable="false" @closed="isFirst = true" get-container="body">
  <!-- 省略其它代码 -->
</van-action-sheet>
```

### 将文章设置为不感兴趣
1. 在 `/src/api/home.api.js` 模块中，定义名为 `reqDislikeArticle` 的方法，用来将指定 id 的文章设置为不感兴趣：
```js
/**
 * 将文章设置为不感兴趣
 * @param {*} id 文章的 id
 * @returns
 */
export const reqDislikeArticle = id => request.post('/article/dislikes', {
  target: id
})
```

2. 在 `ArtItem.vue` 组件中，按需导入 `API` 接口：
```js
// 按需导入 API 接口
import { reqDislikeArticle } from '@/api/home.api.js'
```
3. 在 `ArtItem.vue` 组件中，基于 `props` 中的 `article` 文章对象，定义名为 `artId` 的计算属性：
```js
props: {
  // 文章的信息对象
  article: {
    type: Object, // 数据类型
    required: true // 必填项
  }
},

computed: {
  // 文章 Id 的计算属性
  artId() {
    // 注意：文章对象的 art_id 是大数对象，需要调用 .toString() 方法转换为字符串形式
    return this.article.art_id.toString()
  }
}
```

4. 在 `onCellClick` 处理函数中，调用 `API` 接口，将指定 `Id` 的文章设置不感兴趣：
```js
// 一级选项的点击事件处理函数
async onCellClick(name) {
  if (name === '不感兴趣') {
    // 调用 API 接口，将文章设置为不感兴趣
    const { data: res } = await reqDislikeArticle(this.artId)
    if (res.message === 'OK') {
      // TODO：炸楼的操作
    }
    this.show = false
  }

  // 省略其它代码...
}
```

### 从列表中移除不感兴趣的文章
1. 在 `ArtItem.vue` 组件中，通过 `this.$emit()` 触发自定义事件，把要删除的文章 `Id` 传递给父组件：
```js
// 一级选项的点击事件处理函数
async onCellClick(name) {
  if (name === '不感兴趣') {
    // 调用 API 接口，将文章设置为不感兴趣
    const { data: res } = await dislikeArticleAPI(this.artId)
    if (res.message === 'OK') {
      // TODO：炸楼的操作，触发自定义的事件，将文章 id 发送给父组件
      this.$emit('remove-article', this.artId)
    }
    this.show = false
  }

  // 省略其它代码...
}
```

2. 在 `ArtList.vue` 组件中使用 `ArtItem.vue` 组件时，监听 `ArtItem.vue` 组件的 `@remove-article` 事件：
```html
<!-- 循环渲染文章的列表 -->
<art-item
   v-for="item in artlist"
   :key="item.art_id.toString()"
   :article="item"
   @remove-article="removeArticle"
  >
</art-item>
```

3. 在 `ArtList.vue` 组件的 `methods` 中，声明 `removeArticle` 方法如下：
```js
methods: {
  // 从文章列表中移除指定 id 的文章
  removeArticle(id) {
    // 对原数组进行 filter 方法的过滤
    this.artlist = this.artlist.filter(item => item.art_id.toString() !== id)
 }
}
```

### 炸楼之后防止上拉加载不生效
> 问题描述：炸楼之后，如果文章列表的数据不足以撑满整个屏幕，会导致上拉加载和下拉刷新不生效的问题
> 
> 解决方案：每次炸楼之后，判断剩余数据的文章数量是否小于 10，如果小于 10，则主动请求下一页的数据

- 在 `ArtList.vue` 组件的 `methods` 节点下，改造 `removeArticle` 方法：
```js
methods: {
  // 从文章列表中移除指定 id 的文章
  removeArticle(id) {
    // 1. 炸楼操作
    this.list = this.list.filter(item => item.art_id.toString() !== id)

    // 2. 判断剩余数据的文章数量是否小于 10
    if (this.list.length < 10) {
      // 主动请求下一页的数据
      this.initArtList()
    }
  }
}
```

### 实现举报文章的功能
1. 在 `/sr/api/home.api.js` 模块中，定义 `reqReportArticle` 的方法，用来实现举报文章的功能：
```js
// 举报文章的 API
export const reportArticleAPI = (target, type) => {
  return request.post('/v1_0/article/reports', {
    target, // 文章的 Id
    type // 举报的类型
  })
}
```

2. 在 `ArtItem.vue` 组件中，按需导入举报文章的 `API` 接口：
```js
// 按需导入 API 接口
import { reqDislikeArticle, reqReportArticle } from '@/api/home.api.js'
```

3. 在 `ArtItem.vue` 组件中，为二级反馈面板中的选项，绑定点击事件处理函数，将举报的类型作为参数，传递到事件处理函数中：
```html
<!-- 第二级反馈面板 -->
<div v-else>
  <van-cell title="返回" clickable title-class="center-title" @click="isFirst = true" />
  <van-cell :title="item.label" clickable title-class="center-title" v-for="item in reports" :key="item.type" @click="reportArticle(item.type)" />
</div>
```

4. 在 `ArtItem.vue` 组件的 `methods` 节点下，定义名为 `reportArticle` 的点击事件处理函数：
```js
methods: {
  // 举报文章（形参 type 是举报的类型值）
  async reportArticle(type) {
    // 1. 发起举报文章的请求
    const { data: res } = await reqReportArticle(this.artId, type)
    if (res.message === 'OK') {
      // 2. 炸楼操作，触发自定义事件，把文章 Id 发送给父组件
      this.$emit('remove-article', this.artId)
    }
    // 3. 关闭动作面板
    this.show = false
  }
}
```

## 频道编辑

### 渲染频道管理的 DOM 结构

> 基于 Vant 提供的 `Popup` 弹出层组件

1. 在 `/src/views/Home/index.vue` 组件中，在频道管理的小图标下面，基于 `<van-popup>` 渲染出频道管理的弹出层：
```html
<van-popup
  v-model="isChannelEditShow"
  position="bottom"
  class="channel-edit-popup"
  closeable
  close-icon-position="top-left"
  get-container="body"
  style="height: 100%"
/>
```
2. 在 `data` 中添加一个数据用来控制弹层的显示和隐藏
```js
data () {
  return {
    ...
    // 控制频道管理弹出层的展示与隐藏
    isChannelEditShow: false
  }
}
```
3. 为 `<van-popup>` 组件绑定 `:close-on-click-overlay="false"` 属性，从而防止点击遮罩层时，弹出层自动关闭的效果：
```html
<!-- 频道管理的弹出层 -->
<van-popup v-model="isChannelEditShow" :close-on-click-overlay="false">内容</van-popup>
```

4. 实现频道管理的基础布局
```vue
<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
      >编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.channel-edit {
  .channel-item {
    height: 86px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
      }
    }
  }
}
</style>
```

### 动态计算更多频道的列表数据

> 后台没有提供直接获取更多频道的 API 接口，需要程序员动态地进行计算：
> 更多频道 = 所有频道 - 我的频道
> 此时，需要先获取到所有频道地列表数据，再使用计算属性动态地进行筛选即可

1. 请求所有频道的列表数据
在 `/src/api/home.api.js` 模块中，定义名为 `reqGetAllChannel` 的方法，用来请求所有频道列表的数据：
```js
/**
 * 请求全部频道列表
 * @returns
 */
export const reqGetChannel = () => request.get('/channels')
```

2. 在 `channel-edit.vue` 组件中，按需导入 `reqGetChannel` 方法：
```js
// 按需导入 API 接口
import { reqGetChannel } from '@/api/home.api'
```
3. `src\store\modules\home.store.js`
```js
    /**
     * 推荐频道列表
     * @param {*} param0
     * @returns
     */
    async getRecommendChannels ({ commit }) {
      const res = await reqGetChannel()
      if (res.message === 'OK') {
        commit('getRecommendChannels', res.data.channels)
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
```
```js
    /**
     * 推荐频道列表
     * @param {*} state
     * @param {*} channels 推荐频道列表
     */
    getRecommendChannels (state, channels) {
      // 1. 对数组进行 filter 过滤，返回的是符合条件的新数组
      // 判断当前循环项，是否在 “我的频道” 列表之中
      // 如果不在，则 return true，表示需要把这一项存储到返回的新数组之中
      state.recommendChannels = channels.filter(channel => !state.channels.find(myChannel => myChannel.id === channel.id))
    },
```
```js
  state: () => {
    return {
      // 用户频道列表
      channels: [],
      // 推荐频道列表
      recommendChannels: []
    }
  },
```
4. 声明`loadRecommendChannels`方法：
```js
    /**
     * 加载推荐频道
     */
    loadRecommendChannels () {
      try {
        this.$store.dispatch('home/getRecommendChannels')
      } catch (error) {
        this.$toast.fail('获取推荐频道失败，请稍后重试')
      }
    },
```
```js
  mounted () {
    this.loadRecommendChannels()
  },
```
```html
      <van-grid class="recommend-grid" :gutter="10">
        <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="recommendChannel in recommendChannels"
        :key="recommendChannel.id"
        :text="recommendChannel.name"
        />
      </van-grid>
```

### 实现新增频道的功能

思路：

- 给推荐频道列表中每一项注册点击事件
- 获取点击的频道项
- 将频道项添加到我的频道中
- 将当前点击的频道项从推荐频道中移除 
  - 不需要删除，因为我们获取数据使用的是计算属性，当我频道发生改变，计算属性重新求值了

1. 为“更多频道”下的 `item` 项绑定点击事件处理函数，将当前的频道信息作为参数，传递给 `addChannel` 方法：
```html
      <van-grid class="recommend-grid" :gutter="10">
        <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="recommendChannel in recommendChannels"
        :key="recommendChannel.id"
        :text="recommendChannel.name"
        @click="onAddChannel(recommendChannel)"
        />
      </van-grid>
```

2. `src\store\modules\home.store.js`
```js
    /**
     * 添加频道(本地)
     * @param {*} state
     * @param {*} channel 需要添加的频道
     */
    changeChannels (state, channel) {
      // 替换旧对象的方式触发 mutations
      state.channels.push(channel)
      state.recommendChannels = state.recommendChannels.filter(recommendChannel => recommendChannel.id !== channel.id)
    },
```
```js
    /**
     * 添加频道(登录)
     * @param {*} state
     * @param {*} channel id => 频道的id, seq => 频道的位置(在数组最后添加)
     */
    changeOnlineChannels (state, channel) {
      const name = state.recommendChannels.find(recommendChannel => recommendChannel.id === channel[0].id)
      state.channels.push(name)
      state.recommendChannels = state.recommendChannels.filter(recommendChannel => recommendChannel.id !== channel[0].id)
    },
```
4. `/src/api/home.api.js` 模块中，声明如下的 `API` 接口，用来将用户的频道列表数据提交到服务器保存：
```js
/**
 * 根据频道 Id 请求频道下的文章列表数据
 * @param {*} id 频道的 Id
 * @param {*} time 时间戳
 * @returns
 */
export const reqGetArtList = (params) => request.get('/articles', {
  params
})
```
5. 按需导入 API 接口：
```js
import { reqAddUserChannels, reqDeleteUserChannels, reqGetChannel, reqGetUserChannel } from '@/api/home.api'
```
```js
    /**
     * 登录状态下添加频道
     * @param {*} param0
     * @param {*} param1 id => 频道的id, seq => 频道的位置(在数组最后添加)
     */
    async addUserChannels ({ commit }, { id, seq }) {
      const res = await reqAddUserChannels({ id, seq })
      if (res.message === '更新用户频道成功') {
        commit('changeOnlineChannels', res.data.channels)
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
```

6.  `onAddChannel` 方法，用来把最新的用户频道列表数据，提交到后端保存：
```js
    /**
     * 添加频道
     */
    onAddChannel (recommendChannel) {
      if (this.getLogin) {
        // 已登录 请求接口
        try {
          this.$store.dispatch('home/addUserChannels', {
            id: recommendChannel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
          // 3. 通过 notify 弹框提示用户更新成功
          this.$notify({ type: 'success', message: '更新成功', duration: 1000 })
        } catch (error) {
          this.$toast.fail('添加频道失败，请稍后重试')
        }
      } else {
        // 未登录 存储在本地
        this.$store.commit('home/changeChannels', recommendChannel)
      }
    },
```

### 切换频道

> 功能需求：在非编辑器状态下切换频道。

1. 给我的频道项注册点击事件
```html
        <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="channel.id"
        @click="onMyChannelClick(channel,index)"
        >
```

2. 处理函数
```js
      // 非编辑 => 切换
        this.$emit('update-active', index, false)
```

3. 在父组件中监听处理自定义事件
```js
    /**
     * 子传父自定义事件 @update-active 的回调函数
     * 更新激活页码
     */
    onUpdateActive (index, isChannelEditShow) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
```
```html
<channel-edit :my-channels="channels" :active="active" @update-active="onUpdateActive"/>
```

4. 让激活频道高亮

思路：

- 将首页中的激活的标签索引传递给频道编辑组件
- 在频道编辑组件中遍历我的频道列表的时候判断遍历项的索引是否等于激活的频道标签索引，如果一样则作用一个高亮的 `CSS` 类名

-  将首页组件中的 `active` 传递到频道编辑组件中
```html
<channel-edit :my-channels="channels" :active="active" @update-active="onUpdateActive"/>
```

- 在频道编辑组件中声明 `props` 接收
```js
    active: {
      type: Number,
      required: true
    }
```

- 判断遍历项，如果 `遍历项索引 === active`，则给这个频道项设置高亮样式
```html
<span slot="text" class="text" :class="{active: index === active}">{{channel.name}}</span>
```

### 实现删除频道的功能

> 功能需求：在编辑状态下删除频道。

1. `data` 节点下声明`isEdit`和`fixChannels`
```js
  data () {
    return {
      isEdit: false, // 控制编辑状态的显示
      fixChannels: [0] // 固定频道, 不允许被删除
    }
  }
```

2. 点击编辑按钮的时候，切换 `isEdit` 的状态：
```js
    /**
     * 点击编辑切换状态
     */
    editCannel () {
      this.isEdit = !this.isEdit
    },
```

3. 根据 isEdit 的状态，动态渲染按钮的文本和提示的文本：
```html
          <van-button
          class="edit-btn"
          type="danger"
          plain
          round
          size="mini"
          @click="editCannel"
          >{{isEdit ? '完成' : '编辑'}}</van-button>
```

4. 渲染删除的图标
```html
<van-icon slot="icon" name="clear"></van-icon>
```
- 使用 `v-show` 控制图标的显示与隐藏：
```html
<van-icon v-show="isEdit && !fixChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
```

5. 实现删除的功能

> 注意：
> 
> “推荐”这个频道不允许被删除
> 用户的频道列表中，至少要包含两个频道

- 为用户的频道 `Item` 项绑定点击事件处理函数，命名为 `onMyChannelClick`：
```html
<!-- 用户的频道 Item 项 -->
<div class="channel-item van-hairline--surround" @click="onMyChannelClick(channel,index)">
</div>
```
- 在 methods 中声明 
```js
    /**
     * 删除 / 编辑 频道
     */
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果是固定频道 直接返回
        if (this.fixChannels.includes(channel.id)) return
        // 编辑 => 删除
        if (this.getLogin) {
          // 已登录
          this.$store.dispatch('home/deleteUserChannels', channel.id)
        } else {
          // 未登录 数据更新到本地
          this.$store.commit('home/deleteChannels', { channel, index })
        }
        // 如果删除的 index 在 被激活的频道前面
        if (index <= this.active) {
          // 激活频道的索引 -1
          // 第一个参数 => 要高亮的索引
          // 第二个参数 => 是否继续开启弹窗
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
      // 非编辑 => 切换
        this.$emit('update-active', index, false)
      }
    }
```

6. 优化删除的功能

- 如果频道的名字是“推荐”，则不渲染删除的小图标
```js
v-show="isEdit && !fixChannels.includes(channel.id)"
```
```js
// 如果是固定频道 直接返回
if (this.fixChannels.includes(channel.id)) return
```
- 如果 `myChannels` 数组中仅剩下两个频道，则不渲染删除的小图标：
```js
v-show="isEdit && !fixChannels.includes(channel.id) && myChannels.length> 2"
```
```js
        // 如果是固定频道 或 仅剩下两个频道 直接返回
        if (this.fixChannels.includes(channel.id) || this.myChannels.length === 2) return
```

7. **弹出层关闭时重置编辑的状态(v-model父子通信)**

- 实现步骤：
    - 允许一个自定义组件在使用 `v-model` 时定制 `prop` 和 `event`。默认情况下，一个组件上的 `v-model` 会把 `value` 用作`prop` 且把 `input` 用作 `event`，但是一些输入类型比如单选框和复选框按钮可能想使用 `value` `prop` 来达到不同的目的。使用 `model` 选项可以回避这些情况产生的冲突。
    - 如果要将属性或事件名称更改为其他名称，则需要在 `ChildComponent` 组件中添加 `model` 选项：
    - 父组件 `v-model` 绑定值
    - 子组件 `props` 接收值，`model`包含两个参数 `prop`：v-model接收的值，`event`：`v-model`发生变化时触发的方法
- 子组件
```js
export default {
  props: {
    // 控制编辑状态的显示
    isEdit: {
      type: Boolean, 
      required: true
    }
  },
  model: {
    prop: 'isEdit', // v-model接收的值 = props 的 isEdit 属性接收的值
    // 这个事件名可以随意写，它实际上是规定了子组件要更新父组件值需要注册的方法
    event: 'changeEdit'
  },
}
```
```js
    /**
     * 点击编辑切换状态
     */
    editCannel () {
      this.$emit('changeEdit', !this.isEdit)
    },
```
- 父组件
```js
  data () {
    return {
      isEdit: false
    }
  }
```
```html
<channel-edit v-model="isEdit" :my-channels="channels" :active="active" @update-active="onUpdateActive"/>
```

### 频道数据持久化

业务分析

频道编辑这个功能，无论用户是否登录用户都可以使用。

- 不登录也能使用
    - 数据存储在本地
    - 不支持同步功能
- 登录也能使用
    - 数据存储在线上后台服务器
    - 更换不同的设备可以同步数据

实现：

1. . `src\constants\index.js`
```js
/**
 * 频道列表
 */
export const channels = 'CHANNELS'

/**
 * 推荐列表
 */
export const recommendChannels = 'RECOMMEND_CHANNELS'
```
2. `src\store\modules\home.store.js`
```js
    /**
     * 添加频道(本地)
     * @param {*} state
     * @param {*} channel 需要添加的频道
     */
    changeChannels (state, channel) {
      // 替换旧对象的方式触发 mutations
      state.channels.push(channel)
      state.recommendChannels = state.recommendChannels.filter(recommendChannel => recommendChannel.id !== channel.id)
      // 本地持久化
      setItem(channels, state.channels)
      setItem(recommendChannels, state.recommendChannels)
    },
```
```js
    /**
     * 删除频道(本地)
     * @param {*} state
     * @param {*} param1 需要删除的频道
     */
    deleteChannels (state, { channel, index }) {
      state.channels.splice(index, 1)
      console.log(11)
      state.recommendChannels.push(channel)
      // 本地持久化
      setItem(channels, state.channels)
      setItem(recommendChannels, state.recommendChannels)
    },
```

### 正确的获取首页频道列表数据

> 获取登录用户的频道列表和获取默认推荐的频道列表是同一个数据接口。后端会根据接口中的 `token` 来判定返回数据。

```js
async loadChannels () {
  try {
    let channels = []
    if (this.user) {
      // 已登录，请求获取线上的频道数据
      const { data } = await getChannels()
      channels = data.data.channels
    } else {
      // 未登录
      const localChannels = getItem('channels')
      if (localChannels) {
        // 有本地频道数据，则使用
        channels = localChannels
      } else {
        // 没有本地频道数据，则请求获取默认推荐的频道列表
        const { data } = await getChannels()
        channels = data.data.channels
      }
    }

    // 将数据更新到组件中
    this.channels = channels
  } catch (err) {
    console.log(err)
    this.$toast('数据获取失败')
  }
},
```