<!--
 * @Author: hidari
 * @Date: 2022-05-06 14:13:04
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-07 09:21:08
 * @FilePath: \mobile-news-management\src\views\my\index.vue
 * @Description: 我的
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="my-container">
      <!-- 头部-未登录 -->
      <div class="header not-login" v-if="!getLogin">
          <div class="login-btn" @click="$router.push('/login')">
              <div class="mobile"></div>
              <div class="text">登录/注册</div>
          </div>
      </div>
      <!-- 头部-正在加载 -->
        <div class="header loading" v-if="getLogin && !userInfo">
        <van-skeleton title avatar :row="3" />
      </div>
      <!-- 头部-已登录 -->
      <div class="header user-info" v-if="getLogin && userInfo">
          <div class="base-info">
              <div class="user">
                <van-image
                class="avator"
                :src="userInfo.photo"
                round
                fit="cover"
                />
                <div class="name">{{userInfo.name}}</div>
              </div>
              <div class="edit">
                  <van-button size="mini" round>编辑资料</van-button>
              </div>
            </div>
            <div class="data-states">
                <van-grid class="data-info" :border="false">
                    <van-grid-item>
                    <span class="count">{{userInfo.art_count}}</span>
                    <span class="text">头条</span>
                    </van-grid-item>
                    <van-grid-item>
                    <span class="count">{{userInfo.follow_count}}</span>
                    <span class="text">关注</span>
                    </van-grid-item>
                    <van-grid-item>
                    <span class="count">{{userInfo.fans_count}}</span>
                    <span class="text">粉丝</span>
                    </van-grid-item>
                    <van-grid-item>
                    <span class="count">{{userInfo.like_count}}</span>
                    <span class="text">获赞</span>
                    </van-grid-item>
                </van-grid>
          </div>
      </div>

      <!-- 导航 -->
        <van-grid clickable :column-num="2">
            <van-grid-item text="收藏">
                <van-icon slot="icon" name="star-o" color="#eb5253" />
            </van-grid-item>
            <van-grid-item text="历史">
                <van-icon slot="icon" name="browsing-history-o" color="#ffa023" />
            </van-grid-item>
        </van-grid>

        <!-- 小智同学 -->
        <van-cell-group :border="false">
            <van-cell title="小智同学" is-link />
        </van-cell-group>

        <!-- 退出登录 -->
        <van-cell-group v-if="getLogin">
            <van-cell
                style="text-align: center; color: #d86262"
                title="退出登录"
                clickable
            />
        </van-cell-group>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'My',
  computed: {
    // 右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    // 判断是否登录
    ...mapGetters({
      getLogin: 'getLogin'
    }),
    // 注入一个参数 state，其实即为大仓库中的数据
    ...mapState('user', {
      userInfo: state => state.userInfo
    })
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo () {
      if (this.getLogin) {
        // 用户登录后请求
        this.$store.dispatch('user/getUserInfo')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.my-container {
    .header {
        height: 361px;
        box-sizing: border-box;
        background: url('./image/banner.png') no-repeat;
        background-size: cover;
    }
    .not-login {
        justify-content: center;
        align-items: center;
        display: flex;
        .login-btn {
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .mobile {
                background: url("./image/mobile.png") no-repeat;
                background-size: cover;
                height: 132px;
                width: 132px;
                margin-bottom: 15px;
            }
            .text{
                font-size: 28px;
                color: #fff;
            }
        }
    }
    .user-info {
        box-sizing: border-box;
        .base-info {
            height: 231px;
            box-sizing: border-box;
            padding: 76px 32px 23px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .user {
                display: flex;
                align-items: center;
                .avator {
                    height: 132px;
                    width: 132px;
                    margin-right: 23px;
                    border: 4px solid #fff;
                }
                .name {
                    font-size: 30px;
                    color: #fff;
                }
            }
        }
        .data-states {
            box-sizing: border-box;
            ::v-deep .van-grid-item__content {
                height: 130px;
                background: none;
                color: #fff;
                .count {
                    font-size: 36px;
                }
                .text {
                    font-size: 23px;
                }
            }
        }
    }
    > .van-cell-group {
        margin-top: 10px;
    }
}
</style>
