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