<!--
 * @Author: hidari
 * @Date: 2022-05-10 21:31:26
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 21:31:29
 * @FilePath: \mobile-news-management\src\components\loading-page\index.vue
 * @Description: 加载中组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
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
