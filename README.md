<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [mobile-news-management](#mobile-news-management)
  - [扫码体验](#%E6%89%AB%E7%A0%81%E4%BD%93%E9%AA%8C)
  - [相关资源](#%E7%9B%B8%E5%85%B3%E8%B5%84%E6%BA%90)
  - [功能列表](#%E5%8A%9F%E8%83%BD%E5%88%97%E8%A1%A8)
  - [一些计划](#%E4%B8%80%E4%BA%9B%E8%AE%A1%E5%88%92)
  - [初始化项目](#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE)
    - [ESLint 常见的语法规则](#eslint-%E5%B8%B8%E8%A7%81%E7%9A%84%E8%AF%AD%E6%B3%95%E8%A7%84%E5%88%99)
    - [配置 vant 组件库](#%E9%85%8D%E7%BD%AE-vant-%E7%BB%84%E4%BB%B6%E5%BA%93)
    - [Vant 组件库的 rem 布局适配](#vant-%E7%BB%84%E4%BB%B6%E5%BA%93%E7%9A%84-rem-%E5%B8%83%E5%B1%80%E9%80%82%E9%85%8D)
      - [配置 postcss-pxtorem](#%E9%85%8D%E7%BD%AE-postcss-pxtorem)
      - [配置 amfe-flexible](#%E9%85%8D%E7%BD%AE-amfe-flexible)
    - [安装和配置 axios](#%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AE-axios)
    - [vue + sentry监控平台](#vue--sentry%E7%9B%91%E6%8E%A7%E5%B9%B3%E5%8F%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-05-05 14:40:59
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-05 19:35:25
 * @FilePath: \mobile-news-management\README.md
 * @Description: 项目简介
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->
# mobile-news-management

## 扫码体验

<img src="./public/qrcode_toutiao.m.lipengzhou.com.png" width="200" />

## 相关资源

- GitHub 仓库：https://github.com/lipengzhou/topline-m
- 学习笔记：http://doc.toutiao.liulongbin.top/
- 接口文档： https://www.showdoc.com.cn/1289305683568179?page_id=6452917580651891
- 在线预览：http://toutiao.liulongbin.top/

## 功能列表

- [x] 登录注册

- [x] 首页
  + [x] 频道列表
  + [x] 文章列表
  + [x] 频道编辑
- [x] 搜索
  - [x] 联想建议
  - [x] 搜索历史记录
  - [x] 搜索结果

- [x] 文章详情
  + [x] 关注用户
  + [x] 文章收藏
  + [x] 文章点赞
  + [x] 文章分享
- [x] 文章评论
  - [x] 文章评论
  - [x] 评论回复
  - [x] 发布文章评论
  - [x] 发布评论回复
  - [x] 评论点赞
- [x] 我的
  + [x] 我的收藏
  + [x] 我的历史
  + [x] 我的作品
- [x] 个人中心
  - [x] 展示当前登录用户信息
  - [x] 退出登录
- [x] 用户页面
  - [x] 展示用户信息
  - [x] 关注用户
  - [x] 用户文章列表
- [ ] 用户关注/粉丝
  - [ ] 用户关注列表
  - [ ] 用户粉丝列表
  - [ ] 关注/取消关注用户/粉丝
- [x] 小智同学
  - [x] 展示聊天消息列表
  - [x] 发送/接收消息
- [ ] 消息通知
  - [ ] 点赞通知
  - [ ] 评论通知
  - [ ] 关注通知

## 一些计划

- [ ] 动画交互
- [ ] 黑暗模式
- [ ] 发布 Android App
- [ ] 发布 iOS App
- [ ] 小程序 App
- [ ] Flutter App
- [ ] 重写后端接口

## 初始化项目

### ESLint 常见的语法规则

| 序号 | 规则名称                | 规则约束/默认约束                    |
| ---- | --------------------------- | -------------------------------------------- |
| 1    | quotes                      | 默认：字符串需要使用单引号包裹 |
| 2    | key-spacing                 | 默认：对象的属性和值之间，需要有一个空格分割 |
| 3    | comma-dangle                | 默认：对象或数组的末尾，不允许出现多余的逗号 |
| 4    | no-multiple-empty-lines     | 不允许出现多个空行                  |
| 5    | no-trailing-spaces          | 不允许在行尾出现多余的空格      |
| 6    | eol-last                    | 默认：文件的末尾必须保留一个空行 |
| 7    | spaced-comment              | 在注释中的//或/*后强制使用一致的间距 |
| 8    | indent                      | 强制一致的缩进                        |
| 9    | import/first                | import 导入模块的语句必须声明在文件的顶部 |
| 10   | space-before-function-paren | 方法的形参之前是否需要保留一个空格 |

> 详细的 ESLint 语法规则列表，请参考官方文档 https://eslint.org/docs/rules/

如果希望修改 ESLint 默认的校验规则，可以在 `.eslintrc.js` 文件的 `rules` 节点下进行自定义。

### 配置 vant 组件库

> 官网地址：https://vant-contrib.gitee.io/vant/#/zh-CN/

1. 运行如下的命令，在项目中安装 vant 组件库：
```sh
npm i vant@2.12.12 -S
```

2. 在 main.js 入口文件中，完整导入并注册所有的 vant 组件：
```js
import Vue from 'vue'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
```

3. 在 App.vue 根组件中，基于 Button 按钮组件测试是否配置成功：
```vue
<template>
  <div>
    <p>App 根组件</p>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>
```

4. 一次性、完整导入并注册所有 vant 组件的优缺点：

    - 优点：所有的 vant 组件都进行了全局的注册。在每个组件中，不再需要按需引入并注册组件了。
    - 缺点：项目中没有用到的组件也会被打包进来，导致打包体积过大的问题（此问题在项目发布时，可通过 CDN 加速解决）。

### Vant 组件库的 rem 布局适配

> 如果需要使用 rem 单位进行适配，推荐使用以下两个工具：
> postcss-pxtorem 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位
> lib-flexible 用于动态设置 rem 基准值
> 详情请参考 Vant 的官方文档：https://vant-contrib.gitee.io/vant/#/zh-CN/advanced-usage#rem-bu-ju-gua-pei


#### 配置 postcss-pxtorem

1. 运行如下的命令：
```sh
npm install postcss-pxtorem@5.1.1 -D
```

2. 在 vue 项目根目录下，创建 `postcss` 的配置文件 `postcss.config.js`，并初始化如下的配置：
```js
module.exports = {
  // 配置要使用的 PostCSS 插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer 插件
    // 所以又配置了一次，所以产生冲突了
    // 'autoprefixer': { // autoprefixer 插件的配置
    //   // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

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
  }
}
```

3. 关于 `px -> rem` 的换算：
```
iphone6

375px = 10rem
37.5px = 1rem
1px = 1/37.5rem
12px = 12/37.5rem = 0.32rem
```

#### 配置 amfe-flexible

1. 运行如下的命令：
```sh
npm i amfe-flexible@2.2.1 -S
```

2. 在 `main.js` 入口文件中导入 `amfe-flexible`：
```js
import 'amfe-flexible'
```
>  注意：当配置完 `postcss-pxtorem` 和 `amfe-flexible` 之后，要**重启打包的服务器**

###  安装和配置 axios
安装：
```sh
npm i axios@0.21.1 -S
```

2. 在 `src` 目录之下，创建 `utils` 子目录，并在 `utils` 目录下新建 `request.js` 网络请求模块如下：
```js
import axios from 'axios'

// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  // 请求根路径
  baseURL: 'http://www.liulongbin.top:8000'
})

export default instance
```

### vue + sentry监控平台

1. 在sentry平台创建账户：https://sentry.io/welcome/

2. 创建组织，创建项目
![image](https://img-blog.csdnimg.cn/70adf116950a44c39e0880dad3c3c6db.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5p6t5p6t5LmY6Jma5YWD,size_20,color_FFFFFF,t_70,g_se,x_16)

需要记住team名字，和项目名字，后续关联需要用到

3. 在项目中引入sentry

```js
// @sentry/vue @sentry/tracing 是必须的， @sentry/webpack-plugin和sourceMap有关
npm install @sentry/vue @sentry/tracing @sentry/webpack-plugin

// main.js
import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing
Sentry.init({
  Vue,
  dsn: 'your dsn', //官网创建完后就可以看到了
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//]
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})
```

创建完成后，官网也给出了引入教程，下图为官网贴图。

![image](https://img-blog.csdnimg.cn/c83f8b47c31848e9b91b329e6428a844.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5p6t5p6t5LmY6Jma5YWD,size_20,color_FFFFFF,t_70,g_se,x_16)

sentry便成功接入了，可以到项目中抛出一个报错，到sentry上刷新一下项目-issue便可发现报错记录已经生成。点击可查看详情。

![image](https://img-blog.csdnimg.cn/137f18cef0da477ebc36fae8f5c5e77f.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5p6t5p6t5LmY6Jma5YWD,size_20,color_FFFFFF,t_70,g_se,x_16)

但是此处线上代码是打包后的，不能具体到是哪里代码错误。此时便需要上传sourceMap到sentry平台，才可查看到具体代码报错。

4. 上传sourceMap到sentry平台
    上传sourceMap有 手动 和 自动 上传两种方式。这里只介绍自动上传
    手动上传需要用到@sentry-cli
    自动上传sourceMap需要用到插件@sentry/webpack-plugin，步骤3中已安装@sentry/webpack-plugin，可直接进行下一步操作。

    1. 生成sentry的auth token信息
    ![image](https://img-blog.csdnimg.cn/8a37ec84ead240c78c931d0a60fb46db.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5p6t5p6t5LmY6Jma5YWD,size_20,color_FFFFFF,t_70,g_se,x_16)

    点击create new token 按钮，然后在默认选项基础上加勾选 【project：write】，便可以得到auth token（打码的就是）；

    ![image](https://img-blog.csdnimg.cn/45ae2656062a45e8b50fbfe6e1a55307.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5p6t5p6t5LmY6Jma5YWD,size_20,color_FFFFFF,t_70,g_se,x_16)

    2. 在根目录下创建.sentryclirc文件，配置环境文件
    配置信息如下
    ```js
    // .sentryclirc
    [auth]
    token= your auth toekn


    [defaults]
    url=https://sentry.io/
    org=your org
    project= your projectName

    // prod.env.js
    "use strict";
    const release = "test-01-2021-12-15"; // 版本号需要一致
    process.env.RELEASE_VERSION = release;
    module.exports = {
        NODE_ENV: '"production"',
        RELEASE_VERSION: `"${release}"`
    };
    ```

    不清楚org，project的可以查看organization settings下的信息

    3. 配置vue.config.js
    ```js
    const SentryCliPlugin = require('@sentry/webpack-plugin')

    configureWebpack: {
        plugins: [
        new SentryCliPlugin({
            include: "./dist", // 打包后的文件夹
            release: process.env.RELEASE_VERSION, // 引用配置的版本号，版本号需要一致
            configFile: "sentry.properties",
            ignoreFile: '.gitignore',  // 指定忽略文件配置
            ignore: ['node_modules', 'webpack.config.js'], 
            // configFile: './.sentryclirc',   // 指定sentry上传配置
            urlPrefix: '~/'   // 保持与publicpath相符
        })
        ]
    }

    // ！ 需要打开配置里生成sourceMap的配置项
    /* # 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。*/
    productionSourceMap: true
    ```

    然后打包npm run build，部署到线上。然后线上抛出报错测试一下。
    ![image](https://img-blog.csdnimg.cn/42a6feeff28c40148ad66798464d91bf.png)

    ![image](https://img-blog.csdnimg.cn/dd421815a53e420d83672d7e69542455.png)

    ![image](https://img-blog.csdnimg.cn/6f1788fbc406438883968019a6e76175.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5p6t5p6t5LmY6Jma5YWD,size_20,color_FFFFFF,t_70,g_se,x_16)

    具体效果如图，上传sourceMap后可以看到具体报错代码，问题定位准确。