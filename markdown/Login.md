<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [登录](#%E7%99%BB%E5%BD%95)
  - [使用路由渲染组件](#%E4%BD%BF%E7%94%A8%E8%B7%AF%E7%94%B1%E6%B8%B2%E6%9F%93%E7%BB%84%E4%BB%B6)
  - [渲染登录组件的头部区域](#%E6%B8%B2%E6%9F%93%E7%99%BB%E5%BD%95%E7%BB%84%E4%BB%B6%E7%9A%84%E5%A4%B4%E9%83%A8%E5%8C%BA%E5%9F%9F)
  - [覆盖 NavBar 组件的默认样式](#%E8%A6%86%E7%9B%96-navbar-%E7%BB%84%E4%BB%B6%E7%9A%84%E9%BB%98%E8%AE%A4%E6%A0%B7%E5%BC%8F)
  - [登录功能](#%E7%99%BB%E5%BD%95%E5%8A%9F%E8%83%BD)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-05-05 19:41:01
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-07 17:36:59
 * @FilePath: \mobile-news-management\markdown\Login.md
 * @Description: 登录模块
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->
# 登录

## 使用路由渲染组件

1. 在 `/src/views` 目录之下，创建 `Login` 文件夹，并在其下新建 `index.vue` 登录组件，初始化组件的基本结构如下：
```vue
<template>
  <div>登录组件</div>
</template>

<script>
export default {
  // name 是当前组件的名称（建议为每个组件都指定唯一的 name 名称）
  name: 'Login'
}
</script>

<style lang="less" scoped></style>
```
2. 在 `/src/router/route/login.route.js` 路由模块中，导入需要通过路由渲染的 `login.vue` 登录组件并在路由模块的 routes 数组中，声明登录组件的路由规则如下：
```js
import Login from '@/views/login'
export const login = [
  {
    path: '/login', component: Login, name: 'Login'
  }
]
```

3. 在 `App.vue` 根组件中声明路由占位符，当用户访问 `http://localhost:8080/#/login` 地址的时候，会渲染出登录组件：
```vue
<template>
  <div>
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped></style>
```

## 渲染登录组件的头部区域

> 基于 Vant 的 NavBar导航栏 组件，渲染登录组件的头部区域
1. 渲染登录组件的 header 头部区域：
```vue
<template>
  <div>
    <!-- NavBar 组件：只需提供 title 标题 -->
    <van-nav-bar title="黑马头条 - 登录" />
  </div>
</template>
```

2. 为 `<van-nav-bar>` 组件添加 `fixed` 属性，实现顶部固定定位的效果：
```vue
<van-nav-bar title="黑马头条 - 登录" fixed />
```

3. 为 `Login.vue` 组件最外层的 `div` 元素添加名为 `login-container` 的类名，防止 `<van-nav-bar>` 组件遮挡其它元素：
```vue
<template>
  <div class="login-container">
    <!-- NavBar 组件：只需提供 title 标题 -->
    <van-nav-bar title="黑马头条 - 登录" fixed />
  </div>
</template>
```
4. 在 `Login.vue` 组件的 `style` 节点中声明如下的类名：
```less
.login-container {
  padding-top: 46px;
}
```

##  覆盖 NavBar 组件的默认样式
> 3 种实现方案：
> 1. 定义全局样式表，通过审查元素的方式，找到对应的 class 类名后，进行样式的覆盖操作。
> 2. 通过定制主题的方式，直接覆盖 vant 组件库中的 less 变量；
> 3. 通过定制主题的方式，自定义 less 主题文件，基于文件的方式覆盖默认的 less 变量；
> 参考地址：https://vant-contrib.gitee.io/vant/#/zh-CN/theme

**方案 1：全局样式表 - 普通程序员的万能招式**
1. 在 `src` 目录下新建 `index.less` 全局样式表，通过审查元素的方式找到对应的 `class` 类名，进行样式的覆盖：
```less
// 覆盖 NavBar 组件的默认样式
.van-nav-bar {
  background-color: #007bff;
  .van-nav-bar__title {
    color: white;
    font-size: 14px;
  }
}
```
2. 在 main.js 中导入全局样式表即可：
```js
// 导入 Vant 和 组件的样式表
import Vant from 'vant'
import 'vant/lib/index.css'

// 导入全局样式表
import './index.less'

// 注册全局插件
Vue.use(Vant)
```
**方案 2：定制主题 - 直接覆盖变量**

1. 修改 main.js 中导入 vant 样式的代码，把 .css 的后缀名改为 .less 后缀名：
```js
import Vant from 'vant'

// 这里要把 .css 后缀名改为 .less
import 'vant/lib/index.less'
```
2. 在项目根目录下新建 `vue.config.js` 配置文件：
```js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量，注意：变量名之前不需要加 @ 符号
          'nav-bar-background-color': '#007bff',
          'nav-bar-title-text-color': 'white',
          'nav-bar-title-font-size': '14px'
        }
      }
    }
  }
}
```
配置完毕之后，重启打包的服务器

> 直接覆盖变量值的缺点：每次修改了变量的值，都需要重新启动打包的服务器，非常麻烦

**方案 3：定制主题 - 基于 less 文件**

1. 修改 `main.js` 中导入 `vant` 样式的代码，把 `.css` 的后缀名改为 `.less` 后缀名：
```js
// 导入 Vant 和 组件的样式表
import Vant from 'vant'
// 这里要把 .css 后缀名改为 .less
import 'vant/lib/index.less'
```

2. 在 `src` 目录下新建 `cover.less` 主题文件，用来覆盖 `vant` 默认主题中的 `less` 变量：
```less
@blue: #007bff;
@white: white;
@font-14: 14px;

// NavBar
@nav-bar-background-color: @blue;
@nav-bar-title-text-color: @white;
@nav-bar-title-font-size: @font-14;
```
3. 在项目根目录下新建 `vue.config.js` 配置文件：
```js
const path = require('path')

// 自定义主题的文件路径
const coverPath = path.join(__dirname, './src/cover.less')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${coverPath}";`
        }
      }
    }
  }
}
```
**注意：**初次配置完毕之后，重启打包的服务器。今后，在修改了 cover.less 中的变量后，不再需要重启打包的服务器。

## 登录功能
**渲染登录的表单**

> 基于 Vant 的 Form 表单组件，可以快速渲染出登录表单的基本结构

在 `Login.vue` 组件的 `script` 节点中，声明如下的 `data` 数据：
```js
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单的数据，最终要双向绑定到 form 这个数据对象上
      form: {
        // 用户的手机号
        mobile: '',
        // 登录的密码
        code: ''
      }
    }
  }
}
```
2. 在 `Login.vue` 组件的模板结构中定义如下的 `DOM` 结构：
```vue
<!-- 登录的表单 -->
<van-form>
  <van-field v-model="form.mobile" type="tel" label="手机号码" placeholder="请输入手机号码" required></van-field>
  <van-field v-model="form.code" type="password" label="登录密码" placeholder="请输入登录密码" required></van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
```

**添加非空校验规则**
```js
    /**
     * 验证手机号
     */
    checkMobile () {
      const { mobile } = this.form
      if (!mobile) {
        this.$toast({
          message: '手机号码不能为空',
          position: 'top'
        })
        this.$refs.mobile.focus()
        return false
      }
      if (!/^1[3578]\d{9}$/.test(mobile)) {
        this.$toast({
          message: '手机号码格式错误',
          position: 'top'
        })
        this.$refs.mobile.focus()
        return false
      }
      return true
    },
    /**
     * 验证验证码
     */
    checkCode () {
      const { code } = this.form
      if (!code) {
        this.$toast({
          message: '验证码不能为空',
          position: 'top'
        })
        this.$refs.code.focus()
        return false
      }
      if (!/^\d{6}$/.test(code)) {
        this.$toast({
          message: '验证码格式错误',
          position: 'top'
        })
        this.$refs.code.focus()
        return false
      }
      return true
    }
```

**封装登录的 API 接口**

```js
import request from '@/utils/request'

/**
 * 登录的 API 接口
 * @param {*} data
 * @returns
 */
export const reqLogin = data => request.post('/authorizations', data)
```

**监听表单的提交事件**

1. 为 `<van-form>` 组件绑定 submit 事件处理函数：
```vue
<!-- 登录的表单 -->
<van-form @submit="login"></van-form>
```

2. 在 `Login.vue` 组件中的 `methods` 节点下声明 `login` 事件处理函数：
```js
    /**
     * 登录
     */
    async login () {
      if (!this.checkMobile() || !this.checkCode()) {
        return
      }
      this.$toast.loading({
        message: '登录中...',
        // forbidClick 属性可以禁用背景点击
        forbidClick: true,
        deration: 0 // 如果为 0 则持续显示，新的toast调用会把旧的清除
      })
      try {
        // 只有当表单数据校验通过之后，才会调用此 login 函数
        // const res = await reqLogin(this.form)
        // 登录调用 vuex action
        await this.$store.dispatch('user/login', this.form)
        // 当数据请求成功之后，res.data 中存储的就是服务器响应回来的数据
        this.$toast.success('登录成功')
        // console.log(res)
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
          return false
        }
        this.$toast.fail('登陆失败，请稍后重试')
      }
    }
```

**验证码处理**
1. 由于 Form 中的任何按钮点击都会触发表单的默认提交行为，所以可以使用 `.prevent` 修饰符阻止默认行为或者vant自带的`native-type="button"`
2. `onSendSmd` 处理函数：
```js
async onSendSms () {
  try {
    // 校验手机号码
    await this.$refs['login-form'].validate('mobile')
		// 验证通过 -> 请求发送验证码 -> 用户接收短信 -> 输入验证码 -> 请求登录
    // 请求发送验证码 -> 隐藏发送按钮，显示倒计时
    // 倒计时结束 -> 隐藏倒计时，显示发送按钮
  } catch (err) {
    this.$toast({
      message: err.message,
      position: 'top'
    })
  }
}
```
3. 请求发送短信
```js
/**
 * 发送验证码 一分钟只能发送一次
 * @param {*} mobile
 * @returns
 */
export const reqSendSms = mobile => request.get(`/sms/codes/${mobile}`)
```
```js
async onSendSms () {
  try {
    // 校验手机号码
    await this.$refs['login-form'].validate('mobile')
    // 验证通过，请求发送验证码
    await sendSms(this.user.mobile)
  } catch (err) {
    // try 里面任何代码的错误都会进入 catch
    // 不同的错误需要有不同的提示，那就需要判断了
    let message = ''
    if (err && err.response && err.response.status === 429) {
      // 发送短信失败的错误提示
      message = '发送太频繁了，请稍后重试'
    } else if (err.name === 'mobile') {
      // 表单验证失败的错误提示
      message = err.message
    } else {
      // 未知错误
      message = '发送失败，请稍后重试'
    }

    // 提示用户
    this.$toast({
      message,
      position: 'top'
    })
  }
}
```
4. 请求期间禁用按钮点击
    1. 在 data 中添加数据用来控制按钮的 loading 状态：
    ```js
    data () {
    ...
    isSendSmsLoading: false
    }
    ```
    2. 将数据绑定给发送按钮的 loading 属性：
    ```vue
    <van-button
        v-else
        class="send-btn"
        size="mini"
        round
        :loading="isSendSmsLoading"
        @click.prevent="onSendSms"
    >发送验证码</van-button>
    ```
    3. 在请求开始展示 loading，请求结束关闭 loading：
    ```js
    async onSendSms () {
        try {
            // 校验手机号码
            await this.$refs['login-form'].validate('mobile')

            // 验证通过，请求发送验证码
        + this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
            await sendSms(this.user.mobile)

            // 短信发出去了，隐藏发送按钮，显示倒计时

            // 倒计时结束 -> 隐藏倒计时，显示发送按钮（监视倒计时的 finish 事件处理）
        } catch (err) {
            // try 里面任何代码的错误都会进入 catch
            // 不同的错误需要有不同的提示，那就需要判断了
            let message = ''
            if (err && err.response && err.response.status === 429) {
            // 发送短信失败的错误提示
            message = '发送太频繁了，请稍后重试'
            } else if (err.name === 'mobile') {
            // 表单验证失败的错误提示
            message = err.message
            } else {
            // 未知错误
            message = '发送失败，请稍后重试'
            }

            // 提示用户
            this.$toast({
            message,
            position: 'top'
            })
        }

        // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
        + this.isSendSmsLoading = false
    }
    ```
    4. 使用 Vant 中的 CountDown 倒计时。
        1. 在 data 中添加数据用来控制倒计时的显示和隐藏：
        ```js
        data () {
            return {
                ...
                isCountDownShow: false
            }
        }
        ```
        2. 将倒计时组件和发送验证码按钮放到一起：
        ```vue
        <template #button>
        <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
        />
        <van-button
            v-else
            class="send-btn"
            size="mini"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
        >发送验证码</van-button>
        </template>
        ```
        > - 倒计时组件 
        >   - time：倒计时时长，单位毫秒，默认是 0
        >   - format：时间格式，默认是 HH:mm:ss
        >   - finish：倒计时结束时触发，这里我们的处理逻辑是结束之后关闭倒计时
        3. 发送验证码处理
        ```js
        /**
         * 发送验证码
        */
        async onSendSms () {
            const { mobile } = this.form
            if (!this.checkMobile()) {
                return
            }
            // 验证通过 显示倒计时
            this.isCountDownShow = true
            // 聚焦验证码输入框
            this.$refs.code.focus()
            // 开始倒计时
            this.$nextTick(() => {
                this.$refs.countDown.start()
            })
            // 请求发送验证码
            try {
                await reqSendSms(mobile)
                this.$toast.success('发送成功')
            } catch (error) {
                // 关闭倒计时
                this.isCountDownShow = false
                let message = '发送失败，请稍后重试'
                if (error.response.status === 429) {
                message = '1分钟内只能发送1次，请稍后重试'
                }
                this.$toast.fail(message)
            }
        }
        ```


**token 的存储**
1. 存储到vuex
```js
export default new Vuex.Store({
  state: {
    // 用来存储 token 信息的对象，将来这个对象中会包含两个属性 { token, refresh_token }
    tokenInfo: {}
  }
})
```
```js
mutations: {
  // 更新 tokenInfo 数据的方法
  updateTokenInfo(state, payload) {
    // 把提交过来的 payload 对象，作为 tokenInfo 的值
    state.tokenInfo = payload

    // 测试 state 中是否有数据
    console.log(state)
  }
},
```
2. 存储到本地
    1. 定义location存储/读取的方法
    ```js
    /**
     * 存储数据
     * @param {*} key 存储字段
     * @param {*} value 字段值
     */
    export const setItem = (key, value) => {
    // 持久化存储 token
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
    }

    /**
     * 获取数据
     * @param {*} key 存储字段
     * @returns
     */
    export const getItem = (key) => {
    const value = window.localStorage.getItem(key)
    try {
        // 如果是有效的JSON格式字符串
        return JSON.parse(value)
    } catch (error) {
        // 否则
        return value
    }
    }

    export const removeItem = (key) => {
    return localStorage.removeItem(key)
    }
    ```
    2. 定义常量 token
    ```js
    export const token = 'TOKEN'
    ```
    3. vuex处理
    ```js
    import { getItem, setItem } from '@/utils/storage'
    import { token } from '@/constants'
    export default {
    namespaced: true,
    state: () => {
        // 一个对象，存储当前用户信息( token等 )
        return {
        user: getItem(token),
        userInfo: null
        }
    },
    mutations: {
        setUser (state, data) {
        state.user = data
        // 本地持久化
        setItem(token, state.user)
        },
        setUserInfo (state, userInfo) {
        state.userInfo = userInfo
        }
    }
    ```

**axios 拦截器**

1. 请求拦截器
```js
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
```

2. 响应拦截器
```js
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
```

**基于拦截器实现 loading 效果**

> 基于 Vant 的 Toast 轻提示 组件，可以方便的展示 loading 效果

1. 在 `src/utils/request.js` 模块中，从 `vant` 中按需导入 `Toast` 组件：
```js
import { Toast } from 'vant'
```
2. 在请求拦截器中，展示 loading 提示效果：
```js
// 请求拦截器
// 注意：在我们的项目中，是基于 instance 实例来发起 ajax 请求的，因此一定要为 instance 实例绑定请求拦截器
instance.interceptors.request.use(
  config => {
    // 展示 loading 效果
    Toast.loading({
      message: '加载中...', // 文本内容
      duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```
3. 在响应拦截器中，隐藏 loading 提示效果：
```js
// 响应拦截器（注意：响应拦截器也应该绑定给 instance 实例）
instance.interceptors.response.use(
  response => {
    // 隐藏 loading 效果
    Toast.clear()
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
```

**基于拦截器添加 token 认证**

1. 在 request.js 模块中导入 vuex 的模块：
```js
import store from '@/store/index'
```
2. 在请求拦截器中，从 `store.state` 中获取到 `tokenInfo` 对象上的 `token` 值：
```js
instance.interceptors.request.use(
  config => {
    // 1. 获取 token 值
    const tokenStr = store.state.tokenInfo.token
  },
  function(error) {
    return Promise.reject(error)
  }
)
```
3. 如果 `tokenStr` 的值不为空， 则为这次请求的请求头添加 `Authorization` 身份认证字段：
```js
instance.interceptors.request.use(
  config => {
    // 1. 获取 token 值
    const tokenStr = store.state.tokenInfo.token
    // 2. 判断 tokenStr 的值是否为空
    if (tokenStr) {
      // 3. 添加身份认证字段
      config.headers.Authorization = `Bearer ${tokenStr}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
```

**在请求的响应拦截器中统一处理 token 过期**
```js

```

**配置处理后端返回数据中超出 js 安全整数范围问题**
```js
import jsonBig from 'json-bigint'

/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 * transformResponse 允许自定义原始的响应数据（字符串）
 */
instance.defaults.transformResponse = [
  function (data) {
    try {
      return jsonBig.parse(data)
    } catch (err) {
      return {}
    }
  }
]
```