<!--
 * @Author: hidari
 * @Date: 2022-05-09 08:59:21
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-12 17:49:47
 * @FilePath: \mobile-news-management\src\views\chat\index.vue
 * @Description: 聊天机器人组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow class="page-nav-bar" @click-left="$router.back()" title="Hi tari！"></van-nav-bar>

<!-- 聊天主体区域 -->
<div class="chat-list">
  <div v-for="(item, index) in list" :key="index">
    <!-- 左侧是机器人dari -->
    <div class="chat-item left" v-if="item.name === 'xs'">
      <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <div class="chat-pao">{{item.msg}}</div>
    </div>

    <!-- 右侧是当前用户 -->
    <div class="chat-item right" v-else>
      <div class="chat-pao">{{item.msg}}</div>
      <van-image fit="cover" round :src="userAvatar" />
    </div>
  </div>
</div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field ref="say" v-model.trim="word" placeholder="说点什么...">
        <template #button>
          <span @click="send()" style="font-size:12px;color:#999">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
// 按需导入 io 方法：调用 io('url') 方法，即可创建 websocket 连接的实例
import { io } from 'socket.io-client'

import { mapGetters } from 'vuex'
// 什么时候创建连接：刚进入 Chat.vue 组件的时候，应该立即创建连接
export default {
  name: 'Chat',
  data () {
    return {
      // 用户输入的聊天内容
      word: '',
      list: [],
      socket: null
    }
  },
  computed: {
    ...mapGetters({
      userAvatar: 'userAvatar'
    })
  },
  created () {
  // 创建客户端 websocket 的实例
    this.socket = io('ws://www.liulongbin.top:9999')
    // 监听连接创建的事件
    this.socket.on('connect', () => console.log('socket 连接创建完成！'))

    // 监听 message 事件可以获取到服务器发给客户端的消息
    // 只要 message 事件被触发，就证明服务器给客户端发消息了
    this.socket.on('message', msg => {
      console.log(msg)
      // 形参中的 msg 就是服务器发给客户端的消息
      this.list.push({ name: 'xs', msg })
    })
    // 监听连接被关闭的事件
    this.socket.on('disconnect', () => console.log('socket 连接已关闭！'))
  },
  mounted () {
    this.$refs.say.focus()
  },
  // 组件被销毁之前，清空 sock 对象
  beforeDestroy () {
  // 关闭连接
    this.socket.close()

    // 销毁 websocket 实例对象 手动释放内存
    this.socket = null
  },
  methods: {
    // 提交按钮的点击事件处理函数
    send () {
      // 如果输入的聊天内容为空，则 return 出去
      if (!this.word) return
      // 1. 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
      // 1. 将用户填写的消息存储到 list 数组中
      this.list.push({ name: 'me', msg: this.word })
      // 2. 清空文本框中的消息内容
      this.word = ''
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 100px 20px 20px 20px;
      .van-image {
        vertical-align: top;
        width: 80px;
        height: 80px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 80px;
        max-width: 140%;
        min-height: 80px;
        line-height: 76px;
        border: 1px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 20px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 28px;
        color: #333;
        &::before {
          content: '';
          width: 20px;
          height: 20px;
          position: absolute;
          top: 23px;
          border-top: 1px solid #c2d9ea;
          border-right: 1px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 30px;
    &::before {
      right: -12px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 30px;
    margin-right: 0;
    &::before {
      left: -10px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 88px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
