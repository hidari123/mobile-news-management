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
      - [关于第三方图片资源403问题](#%E5%85%B3%E4%BA%8E%E7%AC%AC%E4%B8%89%E6%96%B9%E5%9B%BE%E7%89%87%E8%B5%84%E6%BA%90403%E9%97%AE%E9%A2%98)
      - [处理相对时间](#%E5%A4%84%E7%90%86%E7%9B%B8%E5%AF%B9%E6%97%B6%E9%97%B4)

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

实现思路：准备多个 list 数组，每个频道对应一个，查看哪个频道就把数据往哪个频道的列表数组中存放，这样的话就不会导致覆盖问题。个一个声明的话会非常麻烦，所以这里利用组件来处理。

具体实现：

- 封装一个文章列表组件
- 然后在频道列表中把文章列表遍历出来

因为文章列表组件中请求获取文章列表数据需要频道 id，所以 频道 id 应该作为 props 参数传递给文章列表组件，为了方便，直接把频道对象传递给文章列表组件。

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
> 因为这是 Tab 标签页组件本身支持的默认功能，如果不需要可以通过配置 :lazy-render="false" 来关闭这个效果。

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
List 组件通过 loading 和 finished 两个变量控制加载状态，
当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 设置成 true，此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可。
若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

- load 事件： 
  - List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
  - 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。
- loading 属性：控制加载中的 loading 状态 
  - 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
  - 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件
- finished 属性：控制加载结束的状态 
  - 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
  - 所有数据加载结束，finished 为 true，此时不会触发 load 事件

#### 让文章列表固定
解决以下问题：
1. 看不到底部内容(设置 padding)
2. 记住列表的滚动位置（每个列表都有自己的滚动容器，每个滚动容器中有不同的滚动位置）
    - 给容器设定样式
    - 每次渲染组件时都渲染一遍容器 不再共用同一个 body 滚动
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
这里主要使用到 Vant 中的 PullRefresh 下拉刷新 组件。

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
<van-pull-refresh
  v-model="isRefreshLoading"
  :success-text="refreshSuccessText"
  :success-duration="1500"
  @refresh="onRefresh"
>
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
</van-pull-refresh>
```
下拉刷新时会触发组件的 refresh 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。
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

#### 关于第三方图片资源403问题

> 因为本项目接口数据是后端通过爬虫抓取的第三方平台内容，而第三方平台对图片资源做了防盗链保护处理。
> 服务端一般使用 Referer 请求头识别访问来源，然后处理资源访问。
> 扩展参考：http://www.ruanyifeng.com/blog/2019/06/http-referer.html

Referer 是 HTTP 请求头的一部分，当浏览器向 Web 服务器发送请求的时候，一般会带上 Referer，它包含了当前请求资源的来源页面的地址。服务端一般使用 Referer 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。

> 需要注意的是 referer 实际上是 "referrer" 误拼写。参见 HTTP referer on Wikipedia （HTTP referer 在维基百科上的条目）来获取更详细的信息。

解决：
不要发送 referrer ，对方服务端就不知道从哪里来

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

两者都是专门用于处理时间的 JavaScript 库，功能差不多，因为 Day.js 的设计就是参考的 Moment.js。但是 Day.js 相比 Moment.js 的包体积要更小一些，因为它采用了插件化的处理方式。

Day.js 是一个轻量的处理时间和日期的 JavaScript 库，和 Moment.js 的 API 设计保持完全一样，如果您曾经用过 Moment.js, 那么您已经知道如何使用 Day.js 。

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