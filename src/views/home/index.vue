<!--
 * @Author: hidari
 * @Date: 2022-05-06 14:27:36
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 12:08:33
 * @FilePath: \mobile-news-management\src\views\home\index.vue
 * @Description 首页
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
    <div class="home page-container">
        <!-- 导航栏 -->
        <div class="nav-bar">
        <van-button
            class="search-btn"
            round
            type="info"
            size="small"
            icon="search"
            @click="$router.push('/search')"
            to="/search"
        >搜索</van-button>
        </div>
        <!-- /导航栏 -->

        <!-- 频道列表 -->
        <van-tabs v-model="active" class="fixed-tabs" animated swipeable v-if="channels">
            <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
                <!-- 文章列表 -->
                <article-list :channel="channel"/>
            </van-tab>
            <div slot="nav-right" class="placeholder"></div>
            <div
            slot="nav-right"
            class="hamburger"
            @click="isChannelEditShow=true">
                <i class="toutiao toutiao-gengduo"></i>
            </div>
        </van-tabs>
        <!-- /频道列表 -->

        <!-- 频道编辑弹出层 -->
        <van-popup
            v-model="isChannelEditShow"
            closeable
            position="bottom"
            close-icon-position="top-left"
            :close-on-click-overlay="false"
            :style="{ height: '100%' }"
            @closed="isEdit = false"
        >
        <channel-edit v-model="isEdit" :my-channels="channels" :active="active" @update-active="onUpdateActive"/>
        </van-popup>
        <!-- /频道编辑弹出层 -->
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { getItem } from '@/utils/storage.js'
import { channels } from '@/constants'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      isChannelEditShow: false,
      isEdit: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState('home', {
      channels: state => state.channels
    }),
    ...mapGetters({
      getLogin: 'getLogin'
    })
  },
  methods: {
    /**
     * 获取频道列表
     */
    loadChannels () {
      try {
        if (this.getLogin) {
          // 已登录 获取用户频道列表
          this.$store.dispatch('home/getLoadChannels')
        } else {
          // 未登录 判断是否有本地频道列表数据
          const localChannels = getItem(channels)
          if (localChannels) {
            this.$store.commit('home/getLoadChannels', localChannels)
          } else {
            this.$store.dispatch('home/getLoadChannels')
          }
        }
      } catch (error) {
        this.$toast.fail('获取频道列表失败，请稍后重试')
      }
    },
    /**
     * 子传父自定义事件 @update-active 的回调函数
     * 更新激活页码
     */
    onUpdateActive (index, isChannelEditShow) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
    // changeEditCallback (isEdit) {
    //   this.isEdit = isEdit
    // }
  }
}
</script>

<style lang='less' scoped>
.home {
    .nav-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #3196fa;
        z-index: 1;
        margin-bottom: 20px;
        .search-btn {
            background-color: #5babfb;
            width: 555px;
            height: 64px;
            border: none;
            font-size: 28px;
            ::v-deep .van-icon {
                font-size: 32px;
            }
        }
    }
    .fixed-tabs {
        ::v-deep .van-tabs__wrap{
            position: fixed;
            top: 80px;
            height: 82px;
            clear: both;
            .van-tab {
                border-right: 1px solid #edeff3;
                min-width: 200px;
                font-size: 30px;
                color: #777777;
            }
            .van-tab--active {
                color: #333333;
            }
            .van-tabs__nav {
                padding-bottom: 0;
                // display: flex;
                // align-items: center;
                .van-tabs__line {
                    width: 31px ;
                    height: 6px;
                    background-color: #3296fa;
                    bottom: 8px;
                }
                .hamburger {
                    position: fixed;
                    // background-color: pink;
                    right: 0;
                    width: 66px;
                    height: 82px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #fff;
                    opacity: .9;
                    i.toutiao {
                        font-size: 33px;
                    }
                    &::before {
                        content: '';
                        width: 1px;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        background-image: url(~@/assets/gradient-gray-line.png);
                        background-size: contain;
                    }
                }
                .placeholder {
                    // flex-shrink用来设置，当父元素的宽度小于所有子元素的宽度的和时
                    // （即子元素会超出父元素），子元素如何缩小自己的宽度的。
                    // flex-shrink的默认值为1，当父元素的宽度小于所有子元素的宽度的和时，子元素的宽度会减小。
                    // 值越大，减小的越厉害。如果值为0，表示不减小。
                    flex-shrink: 0;
                    width: 66px;
                    height: 82px;
                }
            }
        }
        ::v-deep .van-tabs__content {
            padding-top: 75px;
            padding-bottom: 50px;
        }
    }
}
</style>
