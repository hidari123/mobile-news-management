<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [文章](#%E6%96%87%E7%AB%A0)
  - [文章搜索](#%E6%96%87%E7%AB%A0%E6%90%9C%E7%B4%A2)
    - [创建组件并配置路由](#%E5%88%9B%E5%BB%BA%E7%BB%84%E4%BB%B6%E5%B9%B6%E9%85%8D%E7%BD%AE%E8%B7%AF%E7%94%B1)
      - [页面布局](#%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80)
      - [处理页面显示状态](#%E5%A4%84%E7%90%86%E9%A1%B5%E9%9D%A2%E6%98%BE%E7%A4%BA%E7%8A%B6%E6%80%81)
      - [搜索框自动获得焦点](#%E6%90%9C%E7%B4%A2%E6%A1%86%E8%87%AA%E5%8A%A8%E8%8E%B7%E5%BE%97%E7%84%A6%E7%82%B9)
    - [搜索联想建议](#%E6%90%9C%E7%B4%A2%E8%81%94%E6%83%B3%E5%BB%BA%E8%AE%AE)
      - [防抖优化](#%E9%98%B2%E6%8A%96%E4%BC%98%E5%8C%96)
      - [高亮搜索关键词](#%E9%AB%98%E4%BA%AE%E6%90%9C%E7%B4%A2%E5%85%B3%E9%94%AE%E8%AF%8D)
    - [搜索结果](#%E6%90%9C%E7%B4%A2%E7%BB%93%E6%9E%9C)
    - [搜索历史](#%E6%90%9C%E7%B4%A2%E5%8E%86%E5%8F%B2)
      - [添加历史记录](#%E6%B7%BB%E5%8A%A0%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
      - [展示历史记录](#%E5%B1%95%E7%A4%BA%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
      - [删除历史记录](#%E5%88%A0%E9%99%A4%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
      - [数据持久化](#%E6%95%B0%E6%8D%AE%E6%8C%81%E4%B9%85%E5%8C%96)
  - [文章详情](#%E6%96%87%E7%AB%A0%E8%AF%A6%E6%83%85)
    - [创建组件并配置路由](#%E5%88%9B%E5%BB%BA%E7%BB%84%E4%BB%B6%E5%B9%B6%E9%85%8D%E7%BD%AE%E8%B7%AF%E7%94%B1-1)
    - [页面布局](#%E9%A1%B5%E9%9D%A2%E5%B8%83%E5%B1%80-1)
    - [关于后端返回数据中的大数字问题](#%E5%85%B3%E4%BA%8E%E5%90%8E%E7%AB%AF%E8%BF%94%E5%9B%9E%E6%95%B0%E6%8D%AE%E4%B8%AD%E7%9A%84%E5%A4%A7%E6%95%B0%E5%AD%97%E9%97%AE%E9%A2%98)
    - [展示文章详情](#%E5%B1%95%E7%A4%BA%E6%96%87%E7%AB%A0%E8%AF%A6%E6%83%85)
    - [处理内容加载状态](#%E5%A4%84%E7%90%86%E5%86%85%E5%AE%B9%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81)
    - [关于文章正文的样式](#%E5%85%B3%E4%BA%8E%E6%96%87%E7%AB%A0%E6%AD%A3%E6%96%87%E7%9A%84%E6%A0%B7%E5%BC%8F)
    - [图片点击预览](#%E5%9B%BE%E7%89%87%E7%82%B9%E5%87%BB%E9%A2%84%E8%A7%88)
    - [关注用户](#%E5%85%B3%E6%B3%A8%E7%94%A8%E6%88%B7)
    - [文章收藏](#%E6%96%87%E7%AB%A0%E6%94%B6%E8%97%8F)
    - [文章点赞](#%E6%96%87%E7%AB%A0%E7%82%B9%E8%B5%9E)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-05-10 12:50:42
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 13:55:08
 * @FilePath: \mobile-news-management\markdown\ARTICLE.md
 * @Description: 文章模块
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->
# 文章

## 文章搜索

### 创建组件并配置路由

1. 创建 `src/views/search/index.vue`：
```vue
<template>
  <div class="search-container">文章搜索</div>
</template>

<script>
export default {
  name: 'SearchIndex',
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

<style scoped lang="less"></style>
```

- 把搜索页面的路由配置到一级路由：
```js
import Search from '@/views/search'
export const search = [
  {
    path: '/search', component: Search, name: 'Search'
  }
]
```

#### 页面布局

1. 创建 `src/views/search/components/search-history.vue`
```vue
<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>完成</span>
      <van-icon name="delete" />
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close" />
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close" />
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close" />
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
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

<style scoped lang="less"></style>
```

2. 创建 `src/views/search/components/search-suggestion.vue`
```vue
<template>
  <div class="search-suggestion">
    <van-cell title="hidari..." icon="search"></van-cell>
    <van-cell title="hidari..." icon="search"></van-cell>
    <van-cell title="hidari..." icon="search"></van-cell>
    <van-cell title="hidari..." icon="search"></van-cell>
    <van-cell title="hidari..." icon="search"></van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchSuggestion',
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

<style scoped lang="less"></style>
```

3. 创建 `src/views/search/components/search-result.vue`

```vue
<template>
  <div class="search-result">
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
  name: 'SearchResult',
  components: {},
  props: {},
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

4. 搜索组件内容如下：
```vue
<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索历史记录 -->
    <search-history />
    <!-- /搜索历史记录 -->

    <!-- 联想建议 -->
    <search-suggestion />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-result />
    <!-- /历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      console.log(val)
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
```

#### 处理页面显示状态

1. 在 data 中添加数据用来控制搜索结果的显示状态
```js
data () {
  ...
  isResultShow: false
}
```

2. 在模板中绑定条件渲染

```html
<!-- 搜索结果 -->
<search-result v-if="isResultShow" />
<!-- /搜索结果 -->

<!-- 联想建议 -->
<search-suggestion v-else-if="searchText.trim()" />
<!-- /联想建议 -->

<!-- 搜索历史记录 -->
<search-history v-else />
<!-- /搜索历史记录 -->
```

#### 搜索框自动获得焦点

在 `Search.vue` 组件的 `mounted` 生命周期函数中，并通过 `DOM` 操作查找到 `input` 输入框，使其获得焦点：
- 因为vant是封装好的组件 不能直接使用 `ref`

```js
mounted() {
  const ipt = document.querySelector('input[type=search]')
  ipt && ipt.focus()
}
```

### 搜索联想建议

基本思路：

- 当搜索框输入内容的时候，请求加载联想建议的数据
- 将请求得到的结果绑定到模板中

基本功能
- 将父组件中搜索框输入的内容传给联想建议子组件
- 在子组件中监视搜索框输入内容的变化，如果变化则请求获取联想建议数据
- 将获取到的联想建议数据展示到列表中

1. 请求搜索建议的列表数据
```js
import request from '@/utils/request'

/**
 * 获取联想建议（自动补全）
 * @param {*} q 请求的前缀词句
 * @returns
 */
export const reqGetSearchSuggestions = q => request({
  method: 'GET',
  url: '/suggestion',
  params: {
    q
  }
})
```

2. 按需导入 API 接口
```js
import { reqGetSearchSuggestions } from '@/api/search.api.js'
```
3. 声明 `suggestList` 数组，用来存放搜索的建议列表数据：
```js
data() {
  return {
    // 搜索建议列表
    suggestList: []
  }
}
```

#### 防抖优化

1. lodash
```js
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from "lodash"
```
```js
// debounce 函数
// 参数1：函数
// 参数2：防抖时间
// 返回值：防抖之后的函数，和参数1功能是一样的
onSearchInput: debounce(async function () {
  const searchContent = this.searchContent
  if (!searchContent) {
    return
  }

  // 1. 请求获取数据
  const { data } = await getSuggestions(searchContent)

  // 2. 将数据添加到组件实例中
  this.suggestions = data.data.options

  // 3. 模板绑定
}, 200),
```

2. 自封装
```js
  data () {
    return {
      suggestion: [],
      // 延时器
      timer: null
    }
  },
  watch: {
    /**
     * 监听 searchText 文本变化发送请求
     */
    searchText: {
      // searchText 发生改变的时候调用 handler 函数
      // handler函数写法固定 不要写箭头函数
      // 防抖
      handler (value) {
        // 清除延时器
        if (this.timer) clearTimeout(this.timer)
        // 如果输入的内容为空，则 return 出去，不开启延时器
        if (this.searchText.trim().length === 0) return

        // 开启延时器
        this.timer = setTimeout(() => {
          this.loadSearchSuggestions(value)
          console.log(11)
        }, 1000)
      },
      immediate: true
    }
  },
```

3. 防抖节流原理

**防抖或是节流：限制函数的执行次数**

**防抖：**通过 `settimeout` 的方式，在一定的时间间隔内，将多次触发变成一次触发

**节流：**减少一段时间的触发频率

- 防抖实现：
    - 每一次都要清空定时器，重新设置上计时器值，使得计时器每一次都重新开始，直到最后满足条件并且等待delay时间后，才开始执行handler函数。
- 适用场景:
    - 按钮提交场景:防止多次提交按钮,只执行最后提交的一次
    - 搜索框联想场景:防止联想发送请求，只发送最后一次输入
```js
function debunce（handler，delay）{ 
   //handler是要传入的进行防抖的函数，delay是等待时间。
    var timer = null;
    return function（）{
        var _self = this，args = arguments; 
        clearTimeout（timer）;        //每次都要清除这个定时器 
        timer = setTimeout（function（）{    //重新开启定时器 
            handler.apply（_self，args）; 
        }，delay）; 
    } 
}
```

- 节流实现：
    - 处理程序是要传入的进行节流的函数，wait是上述的间隔时间。
    - 使用时间戳进行时间的计算。
- 适用场景:
    - 拖拽场景:固定时间内只执行一次，防止超高频次触发位置变动
    - 缩放场景:监控浏览器`resize`使用时间戳实现
```js
function throttle（handler，wait）{  //handler是要进行节流的函数，wait是等待时间
    var lastTime = 0;
    return function（）{
        var nowTime = new Date（).getTime（）;    //获取当前时间
        if（nowTime - lastTime> wait）{
            handler.apply（this，arguments）;
            lastTime = nowTime;      //更新最后时间
        }
    }
}
```

#### 高亮搜索关键词

> 要想实现搜索关键词的高亮效果，需要用到**字符串的 replace 方法以及正则表达式**

**字符串的 replace 方法**
> String.prototype.replace() https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace

1. 将字符串中的 js 替换为 javascript：
```js
// 待处理的字符串
const str = 'JS ArrayBuffer about js'

const newStr = str.replace('js', 'javascript')
console.log(newStr) // JS ArrayBuffer about javascript

// 缺点：无法正常处理大小写问题
```

2. 通过正则进行字符串的替换：
```js
// 待处理的字符串
const str = 'JS ArrayBuffer about js'

// replace 方法的第一个形参，可以接收正则表达式进行匹配
// 可以通过修饰符 i 来忽略大小写
const newStr = str.replace(/js/i, 'javascript')
console.log(newStr) // javascript ArrayBuffer about js

// 缺点：只能匹配第一个满足条件的字符串，无法从前到后进行全局匹配
```

3. 为正则表达式指定 g 修饰符：
```js
// 待处理的字符串
const str = 'JS ArrayBuffer about js'

// replace 方法的第一个形参，可以接收正则表达式进行匹配
// 可以通过修饰符 i 来忽略大小写；通过 g 来进行全局匹配
const newStr = str.replace(/js/gi, 'javascript')
console.log(newStr) // javascript ArrayBuffer about javascript

// 缺点：正则中要匹配的文本只能写死，无法动态创建正则表达式
```

4. 通过 `new RegExp()` 来动态创建正则表达式：
```js
// 关键词
const kw = 'js'
// 待处理的字符串
const str = 'JS ArrayBuffer about js'

// 1. 动态创建正则表达式
const reg = new RegExp(kw, 'ig')
// 2. 调用字符串的 replace 进行替换
const newStr = str.replace(reg, 'javascript')

// 3. 替换的结果 javascript ArrayBuffer about javascript
console.log(newStr)

// 缺点：无法拿到每一次正则匹配的结果
```

5. 将 `replace` 方法的第二个参数指定为回调函数
```js
// 关键词
const kw = 'js'
// 待处理的字符串
const str = 'JS ArrayBuffer about js'

// 1. 动态创建正则表达式
const reg = new RegExp(kw, 'ig')
// 2. 调用字符串的 replace 进行替换，第二个参数为回调函数。其中 val 是匹配到的值
const newStr = str.replace(reg, val => {
  return `<span>${val}</span>`
})

// 3. 替换的结果 <span>JS</span> ArrayBuffer about <span>js</span>
console.log(newStr)
```

6. 定义高亮关键词的方法

- `methods` 节点下，声明高亮搜索关键词的方法：
```js
    /**
     * 关键字高亮显示
     */
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 需要根据数据变量动态创建正则表达式 new RegExp
      /**
       * RegExp 正则表达式构造函数
       * params1 => 匹配模式字符串 根据这个字符串创建正则对象
       * params2 => 匹配模式 要写到字符串中
       */
      const reg = new RegExp(this.searchText, 'gi')
      return text && text.replace(reg, highlightStr)
    }
```
- 循环渲染搜索的建议列表时，将 插值表达式替换为 `v-html` 指令，从而渲染出带标签和样式的内容：
```html
      <!-- v-html 按照html格式显示文本 -->
      <div slot="title" v-html="highlight(text)"></div>
```

### 搜索结果

思路：

- 找到数据接口
- 请求获取数据
- 将数据展示到模板中

**获取搜索关键字**

1. 声明接收父组件中的搜索框输入的内容
```js
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
```

2. 在父组件给子组件传递数据
```html
        <search-result v-if="isResultShow"
          :search-text="searchText"
        />
```

**请求获取数据**

1. 添加封装获取搜索结果的请求方法
```js
/**
 * 获取搜索结果
 * @param {*} params
 * @returns
 */
export const reqGetSearchResult = params => request({
  method: 'GET',
  url: 'search',
  params
})
```

2. 请求获取
```js
import { reqGetSearchResult } from '@/api/search.api.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await reqGetSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText // 关键词
        })
        // 2. 将数据添加到数组列表中
        const { results } = data
        this.list.push(...results)

        // 3. 将本次加载的 loading 关闭
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          //    有 => 更新获取下一个数据的页码
          this.page++
        } else {
          //    没有 => finished = true
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
```

**修改article-item**
```js
    // 控制是否展示“叉号”的小图标
    closable: {
      type: Boolean,
      // 默认值为 true，表示展示“叉号”的小图标
      default: true
    }
```
```html
<van-icon name="cross" @click.stop="show = true" v-if="closable" />
```

**导入article-item**
```js
import ArticleItem from '@/components/article-item'
```
```js
  components: { ArticleItem },
```


**模板绑定**
```vue
<template>
  <div class="search-result">
    <!-- 点击实现后退效果 -->
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" fixed />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        >
        <!-- 循环渲染文章的 Item 项组件 -->
        <!-- ArtItem 在封装的时候，封装了一个自定义属性 closable，用来指定是否显示“叉号”的小图标 -->
        <!-- true 表示展示“叉号”的小图标 -->
        <!-- false 表示不展示展示“叉号”的小图标 -->
        <article-item v-for="item in list" :key="item.id" :article="item" :closable="false" />
        <!-- <van-cell v-for="article in list" :key="article.id" :title="article.title" /> -->
      </van-list>
  </div>
</template>
```
```vue
<style lang="less" scoped>
.search-result {
    /deep/ .van-nav-bar__content {
        height: 110px;
        background-color: #3296fa;
        .van-nav-bar__title{
            color: #fff;
        }
        .van-nav-bar__left{
            .van-icon {
                    color: #fff;
            }
        }
    }
}
</style>
```


### 搜索历史

#### 添加历史记录

> 当发生搜索的时候我们才需要记录历史记录。

1. 在 `data` 中添加一个数据用来存储历史记录
```js
data () {
  return {
    ...
    searchHistories: []
  }
}
```

2. 在触发搜索的时候，记录历史记录
```html

```
```js
    onSearch (val) {
      ...
      // 存储搜索历史纪录
      this.$store.commit('search/setSearchHistories', val)
      ...
    },
```
```js
    /**
       * 存储搜索历史纪录
       * @param {*} state
       * @param {*} val 历史记录
       * 要求：不要有重复历史记录，最新的排在前面
       */
    setSearchHistories (state, val) {
      const index = state.searchHistories.indexOf(val)
      if (index !== -1) {
        // 如果已经存在 先移除
        state.searchHistories.splice(index, 1)
      }
      // 插入数组最顶部
      state.searchHistories.unshift(val)
      // 数据持久化
      setItem(searchHistories, state.searchHistories)
    },
```
```js
  state () {
    return {
      // 搜索历史纪录
      searchHistories: getItem(searchHistories) || []
    }
  },
```

#### 展示历史记录
```html
<!-- 历史记录 -->
<van-cell-group v-else>
  <van-cell title="历史记录">
    <van-icon name="delete" />
    <span>全部删除</span>
    &nbsp;&nbsp;
    <span>完成</span>
  </van-cell>
  <van-cell
    :title="item"
    v-for="(item, index) in searchHistories"
    :key="index"
  >
    <van-icon name="close"></van-icon>
  </van-cell>
</van-cell-group>
<!-- /历史记录 -->
```

#### 删除历史记录

基本思路：

- 给历史记录中的每一项注册点击事件
- 在处理函数中判断 
  - 如果是删除状态，则执行删除操作
  - 如果是非删除状态，则执行搜索操作


**处理删除相关元素的展示状态**

1. 在 data 中添加一个数据用来控制删除相关元素的显示状态
```js
  data () {
    return {
      // 控制删除显示状态
      isDeleteShow: false
    }
  },
```

2. 绑定使用
```vue
<template>
  <div class="search-history">
      <van-cell title="历史记录">
          <van-icon name="delete"
          v-if="!isDeleteShow"
          @click="isDeleteShow=true"
          />
          <div v-else>
            <span @click="$store.commit('search/deleteAllSearchHistories')">全部删除</span>
            &nbsp;
            <span @click="isDeleteShow=false">完成</span>
          </div>
      </van-cell>
      <van-cell
      v-for="(item,index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchItem(item,index)"
      >
          <van-icon v-if="isDeleteShow" name="close" />
      </van-cell>
  </div>
</template>
```

3. 处理删除操作
```js
    /**
     * 点击历史记录 删除 / 搜索
     */
    onSearchItem (item, index) {
      if (this.isDeleteShow) {
        // 删除状态 => 删除历史记录数据
        this.$store.commit('search/deleteSearchHistories', index)
      } else {
        // 非删除状态 => 直接进入搜索
        this.$emit('search', item)
      }
    }
```
```js
    /**
     * 删除单条搜索历史纪录
     * @param {*} state
     * @param {*} index 要删除的历史纪录的下标
     */
    deleteSearchHistories (state, index) {
      state.searchHistories.splice(index, 1)
      // 数据持久化
      setItem(searchHistories, state.searchHistories)
    },

    /**
     * 删除全部搜索历史纪录
     * @param {*} state
     * @param {*} index
     */
    deleteAllSearchHistories (state) {
      state.searchHistories = []
    }
```

#### 数据持久化
```js
setItem(searchHistories, state.searchHistories)
```
- 初始化的时候从本地存储获取数据
```js
  state () {
    return {
      // 搜索历史纪录
      searchHistories: getItem(searchHistories) || []
    }
  },
```

## 文章详情

### 创建组件并配置路由

1. 创建 `views/article/index.vue` 组件
```vue
<template>
  <div class="article-container">文章详情</div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String],
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

2. 将该页面配置到根级路由
```js
import Article from '@/views/article'
export const article = [
  {
    path: '/article/:articleId',
    name: 'Article',
    component: Article,
    props: true // 开启 props 传参 把路由参数映射到组件中
  }
]
```

> 官方文档：路由 props 传参 https://router.vuejs.org/zh/guide/essentials/passing-props.html

### 页面布局
```vue
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">这是文章标题</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">黑马头条号</div>
          <div slot="label" class="publish-date">14小时前</div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
          >关注</van-button>
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content">这是文章内容</div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

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
        info="123"
        color="#777"
      />
      <van-icon
        color="#777"
        name="star-o"
      />
      <van-icon
        color="#777"
        name="good-job-o"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String],
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
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
}
</style>
```

### 关于后端返回数据中的大数字问题

> JavaScript 能够准确表示的整数范围在`-2^53`到`2^53`之间（不含两个端点），超过这个范围，无法精确表示这个值，这使得 JavaScript 不适合进行科学和金融方面的精确计算。
```js
Math.pow(2, 53) // 9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1
// true
```

上面代码中，超出 2 的 53 次方之后，一个数就不精确了。
ES6 引入了`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`这两个常量，用来表示这个范围的上下限。
```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true
```
上面代码中，可以看到 JavaScript 能够精确表示的极限。

后端返回的数据一般都是**JSON格式的字符串**。

```json
'{ "id": 9007199254740995, "name": "Jack", "age": 18 }'
```
`axios` 会在内部使用 `JSON.parse()` 把后端返回的数据转为 JavaScript 对象。
```js
// { id: 9007199254740996, name: 'Jack', age: 18 }
JSON.parse('{ "id": 9007199254740995, "name": "Jack", "age": 18 }')
```

> json-bigint https://github.com/sidorares/json-bigint

1. 安装
```shell
npm i json-bigint
```

2. 示例
```js
const jsonStr = '{ "art_id": 1245953273786007552 }'

console.log(JSON.parse(jsonStr)) // 1245953273786007600
// JSON.stringify()

// JSONBig 可以处理数据中超出 JavaScript 安全整数范围的问题
console.log(JSONBig.parse(jsonStr)) // 把 JSON 格式的字符串转为 JavaScript 对象

// 使用的时候需要把 BigNumber 类型的数据转为字符串来使用
console.log(JSONBig.parse(jsonStr).art_id.toString()) // 1245953273786007552

console.log(JSON.stringify(JSONBig.parse(jsonStr)))

console.log(JSONBig.stringify(JSONBig.parse(jsonStr))) // 把 JavaScript 对象 转为 JSON 格式的字符串转
```

> json-bigint 会把超出 JS 安全整数范围的数字转为一个 BigNumber 类型的对象，对象数据是它内部的一个算法处理之后的，我们要做的就是在使用的时候转为字符串来使用。

通过 Axios 请求得到的数据都是 Axios 处理（`JSON.parse`）之后的，我们应该在 Axios 执行处理之前手动使用 `json-bigint` 来解析处理。Axios 提供了自定义处理原始后端返回数据的 API：`transformResponse` 。

```js
const instance = axios.create({
//   baseURL: 'http://api-toutiao-web.itheima.net/',
  baseURL: '/v1_0',
  //   baseURL: 'http://www.liulongbin.top:8000/v1_0',
  timeout: 5000,
  /**
   * 配置处理后端返回数据中超出 js 安全整数范围问题
   * transformResponse 允许自定义后端返回的原始的响应数据（字符串）
   */
  transformResponse: function (data) {
    try {
      /**
       * JSONBig => 可以处理数据中超出 js 安全整数范围的问题
       * JSONBig.parse()
       * JSONBig.stringify()
       * JSONBig.parse(JSONBig.strinfify(jsonStr))
       */
      return jsonBig.parse(data)
    } catch (err) {
      // 后端返回数据不是标准json字符串
      return data
    }
  }
})
```

> 扩展：ES2020 BigInt
> ES2020 引入了一种新的数据类型 BigInt（大整数），来解决这个问题。BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
> 参考链接：
>   - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt
>   - http://es6.ruanyifeng.com/#docs/number#BigInt-%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B


### 展示文章详情

1. 在 `api/article.api.js` 中新增封装接口方法
```js
import request from '@/utils/request.js'

/**
 * 获取文章详情的 API
 * @param {*} id 文章的 id
 * @returns
 */
export const reqGetArticleDetail = id => request.get(`/articles/${id}`)
```

2. 在组件中调用获取文章详情
```js
import { reqGetArticleDetail } from '@/api/article.api.js'
export default {
  name: 'ArticlePage',
  components: {},
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {} // 文章详情
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      try {
        const { data } = await reqGetArticleDetail(this.articleId)
        this.article = data.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
```

3. 模板绑定

### 处理内容加载状态

需求：

- 加载中，显示 loading
- 加载成功，显示文章详情
- 加载失败，显示错误提示 
  - 如果 404，提示资源不存在
  - 其它的，提示加载失败，用户可以点击重试重新加载

```vue
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
        <!-- 点赞 -->
        <collect-article
        class="btn-icon"
        v-model="article.is_collected"
        :article-id="article.art_id"
        />
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
```

- `/components/loading-page`
```vue
<template>
  <van-loading
    class="loading"
    v-bind="$attrs"
    color="#1989fa"
    vertical
  >
    <slot>加载中...</slot>
  </van-loading>
</template>

<script>
export default {
  name: 'PageLoading',
  components: {},
  props: {
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

<style scoped>
.loading {
  padding-top: 100px;
  text-align: center;
}
</style>
```

- `/components/error-page`
```vue
<template>
  <div class="error-page">
    <img src="./no-network.png" alt="no-network">
    <p class="text">亲，网络不给力哦~</p>
    <van-button
      class="btn"
      type="default"
      size="small"
      @click="$emit('btn-click')"
    >点击重试</van-button>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
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
.error-page {
  padding-top: 100px;
  text-align: center;
  .text {
    font-size: 15px;
  }
  .btn {
    width: 30%;
  }
}
</style>
```

### 关于文章正文的样式

> 文章正文包括各种数据：段落、标题、列表、链接、图片、视频等资源。

- 将 `github-markdown-css` 样式文件下载到项目中
- 配置不要转换样式文件中的字号

1. 引入`src\views\article\github-markdown.css`

2. 配置`postcss.config.js` `postcss-pxtorem` 插件
```js
    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      // lib-flexible 的 REM 适配方案：把一行分为 10 份，每份就是十分之一
      // 所以 rootValue 应该设置为你的设计稿宽度的十分之一
      // 我们的设计稿是 750，所以应该设置为 750 / 10 = 75
      // 但是 Vant 建议设置为 37.5，为什么？因为 Vant 是基于 375 写的
      // 所以必须设置为 37.5，唯一的缺点就是使用我们设计稿的尺寸都必须 / 2
      // 有没有更好的办法？
      //   如果是 Vant 的样式，就按照 37.5 来转换
      //   如果是 我们自己 的样式，就按照 75 来转换
      // 通过查阅文档，我们发现 rootValue 支持两种类型：
      //    数字：固定的数值
      //    函数：可以动态处理返回
      //          postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个函数
      //          它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
      rootValue ({ file }) {
        // file 是文件路径字符串
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },

      // rootValue: 75,

      // 配置要转换的 CSS 属性
      // * 表示所有
      propList: ['*'],

      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
```

### 图片点击预览

思路：

1. 从文章内容中获取到所有的 `img` DOM 节点
2. 获取文章内容中所有的图片地址
3. 遍历所有 `img` 节点，给每个节点注册点击事件
4. 在 `img` 点击事件处理函数中，调用 `ImagePreview` 预览
```html
<div ref="article-content" class="article-content markdown-body" v-html="article.content" />
```
```js
import { ImagePreview } from 'vant'
```
```js
    /**
     * 点击图片预览
     */
    previewImg () {
      // 得到 img 节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // 存储src路径的数组
      const images = []
      imgs.forEach((img, index) => {
        // src 路径
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
```

### 关注用户

思路：

- 给按钮注册点击事件
- 在事件处理函数中 
  - 如果已关注，则取消关注
  - 如果没有关注，则添加关注

1. 添加封装数据接口
```js
/**
 * 关注用户的 API
 * @param {*} userId 文字作者的 id
 * @returns
 */
export const reqFollowUser = userId => request.post('/user/followings', {
  target: userId
})

/**
 * 取消关注用户的 API
 * @param {*} userId 文字作者的 id
 * @returns
 */
export const reqUnfollowUser = userId => request.delete(`/user/followings/${userId}`)
```

2. 组件封装
```vue
<template>
    <van-button
        class="follow-btn"
        :type="isFollowed ? 'default' : 'info'"
        round
        size="small"
        :icon="isFollowed ? '' : `plus`"
        :loading="loading"
        @click.stop="onFollow"
        >
        <slot>{{ isFollowed ? '已关注' : '关注' }}</slot>
        </van-button>
</template>

<script>
import { reqFollowUser, reqUnfollowUser } from '@/api/article.api.js'
export default {
  name: 'FollowUser',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  model: {
    prop: 'isFollowed', // 默认 value
    event: 'is-followed' // 默认 input
  },
  data () {
    return {
      // 关注按钮 loading
      loading: false
    }
  },
  methods: {
    /**
     * 关注 / 取消关注
     */
    async onFollow () {
      // 开启 loading
      this.loading = true
      try {
        if (this.isFollowed) {
          // 已关注 取消关注
          await reqUnfollowUser(this.userId)
        } else {
          // 未关注 添加关注
          await reqFollowUser(this.userId)
        }
        // 更新视图状态
        this.$emit('is-followed', !this.isFollowed)
      } catch (error) {
        // 提示错误消息
        if (error.response.data.message) {
          this.$toast(error.response.data.message)
        } else {
          this.$toast('操作失败，请重试')
        }
      }
      // 关闭 loading
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
```

3. `v-model` 双向绑定
```html
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
如果有多个数据需要实现类似于 v-model 的效果，可以使用属性的 .sync 修饰符。
-->
<follow-user
class="follow-btn"
:user-id="article.aut_id"
v-model="article.is_followed"
/>
```

### 文章收藏

1. 添加封装数据接口
```js
/**
 * 收藏文章
 * @param {*} target 收藏文章的 id
 * @returns
 */
export const reqAddCollect = target => request({
  method: 'POST',
  url: '/article/collections',
  data: {
    target
  }
})

/**
 * 取消收藏文章
 * @param {*} target 取消收藏文章的 id
 * @returns
 */
export const reqDeleteCollect = target => request({
  method: 'DELETE',
  url: `/article/collections/${target}`
})
```
2. 封装组件
```vue
<template>
    <van-button
    :class="{collected: isCollected}"
    :icon="isCollected ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="loading"
    />
</template>

<script>
import { reqAddCollect, reqDeleteCollect } from '@/api/article.api.js'
export default {
  name: 'CollectArticle',
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  model: {
    prop: 'isCollected',
    event: 'is-collected'
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      try {
        this.loading = true
        if (this.isCollected) {
          // 已收藏 取消收藏
          await reqDeleteCollect(this.articleId)
        } else {
          // 未收藏 点击收藏
          await reqAddCollect(this.articleId)
        }
        // 更新视图
        this.$emit('is-collected', !this.isCollected)
        // 父组件修改状态需要时间
        this.$nextTick(() => {
          this.$toast.success(this.isCollected ? '收藏成功' : '取消收藏')
        })
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
    .van-icon {
        color: #ffa500;
    }
}
</style>
```
3. `v-model` 双向绑定
```html
        <!-- 文章收藏 -->
        <collect-article
        class="btn-icon"
        v-model="article.is_collected"
        :article-id="article.art_id"
        />
```
### 文章点赞

`article` 中的 `attitude` 表示用户对文章的态度

- -1 无态度
- 0 不喜欢
- 1 已点赞

思路：

- 给点赞按钮注册点击事件
- 如果已经点赞，则请求取消点赞
- 如果没有点赞，则请求点赞

1. 添加封装数据接口
```js
/**
 * 点赞文章
 * @param {*} target 点赞文章的 id
 * @returns
 */
export const reqAddLike = target => request({
  method: 'POST',
  url: '/article/likings',
  data: {
    target
  }
})

/**
 * 取消点赞文章
 * @param {*} target 取消点赞文章的 id
 * @returns
 */
export const reqDeleteLike = target => request({
  method: 'DELETE',
  url: `/article/likings/${target}`
})
```

2. 组件封装
```vue
<template>
    <van-button
    :class="{liked: isLiked === 1}"
    :icon="isLiked === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
    :loading="loading"
    />
</template>

<script>
import { reqAddLike, reqDeleteLike } from '@/api/article.api.js'
export default {
  name: 'LikeArticle',
  props: {
    isLiked: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  model: {
    prop: 'isLiked',
    event: 'is-like'
  },
  data () {
    return {
      loading: false,
      status: -1
    }
  },
  methods: {
    async onLike () {
      this.loading = true
      this.status = -1
      try {
        if (this.isLiked === 1) {
          // 已点赞 取消点赞
          await reqDeleteLike(this.articleId)
        } else {
          // 未点赞，点赞
          await reqAddLike(this.articleId)
          this.status = 1
        }
        this.$emit('is-like', this.status)
        this.$nextTick(() => {
          this.$toast.success(this.status === 1 ? '点赞成功' : '取消点赞')
        })
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
    .van-icon {
        color: #e5645f;
    }
}
</style>
```

3. `v-model` 双向绑定
```html
        <!-- 文章点赞 -->
        <like-article
        class="btn-icon"
        v-model="article.attitude"
        :article-id="article.art_id"
        />
```