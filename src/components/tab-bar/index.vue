<!--
 * @Author: hidari
 * @Date: 2022-05-06 14:17:39
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 16:41:15
 * @FilePath: \mobile-news-management\src\components\tab-bar\index.vue
 * @Description: 底部导航栏
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="tabbar-container">
    <!-- 子路由出口 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!--
      标签栏支持路由模式，用于搭配vue-router使用。
      route 开启路由模式
      路由模式下会匹配页面路径和标签的to属性，并自动选中对应的标签
     -->
    <van-tabbar class="tabbar" v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">
        <span>首页</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? 'wap-home' : 'home-o'"
        ></van-icon>
      </van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">
        <span>问答</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? 'comment' : 'comment-o'"
        ></van-icon>
      </van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">
        <span>视频</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? 'video' : 'video-o'"
        ></van-icon>
      </van-tabbar-item>
      <van-tabbar-item
        icon="user-o"
        to="/my"
      >
        <span>{{ $store.getters.getLogin ? '我的' : '未登录' }}</span>
        <van-icon
          slot="icon"
          slot-scope="props"
          :name="props.active ? 'manager' : 'manager-o'"
        ></van-icon>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {
  },
  created () {},
  methods: {}
}
</script>

<style scoped>
.tabbar {
  background: #f6f6f6;
}
</style>
