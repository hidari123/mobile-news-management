<!--
 * @Author: hidari
 * @Date: 2022-05-10 21:34:14
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 21:34:17
 * @FilePath: \mobile-news-management\src\components\error-page\index.vue
 * @Description: 其它未知错误（例如网络原因或服务端异常）组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
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
