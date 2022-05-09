<!--
 * @Author: hidari
 * @Date: 2022-05-09 17:26:09
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-09 17:45:17
 * @FilePath: \mobile-news-management\markdown\MY.md
 * @Description: 我的
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->
# 我的

## 页面布局
```vue
<template>
  <div class="my-container">
    <van-cell-group>
      <van-cell
        title="单元格"
        value="内容"
        center
      >
        <van-image
          slot="icon"
          width="50"
          height="50"
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title">昵称</div>
        <van-button
          size="small"
          round
        >编辑资料</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="span">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    
    <div class="not-login">
      <div @click="$router.push('/login')">
        <img class="mobile" src="./手机.png">
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid :column-num="2">
      <van-grid-item
        icon-prefix="toutiao"
        icon="shoucang"
        text="文字"
      />
      <van-grid-item
        icon-prefix="toutiao"
        icon="lishi"
        text="文字"
      />
    </van-grid>

    <van-cell title="小智同学" is-link to="/" />
    <van-cell title="退出登录" />
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
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
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
```

## 处理页面显示状态
```js
const getters = {
  /**
     * 判断用户是否登录
     * @param {*} state
     * @returns
     */
  getLogin: state => {
    return state.user.user !== null
  }
}
export default getters
```
```js
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
  }
}
```

- 退出登录
```js
    onLogout () {
      // 提示用户确认退出
      // 确认 -> 处理退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => { // 确认执行这里
          // 清除用户登录状态
          this.$store.commit('user/setUser', null)
        })
        .catch(() => { // 退出执行这里
          // on cancel
        })
    }
```

- 展示登录用户信息
```js
/**
 * 获取用户个人信息
 * @returns
 */
export const reqGetUserInfo = () => request.get('/user')
```
```js
    /**
     * 请求用户信息
     * @param {*} param0 修改state数据
     */
    async getUserInfo ({ commit }) {
      const res = await reqGetUserInfo()
      if (res.message === 'OK') {
        commit('setUserInfo', res.data)
      } else {
        return Promise.reject(new Error('faild'))
      }
    }
```
```js
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
```
```js
      if (this.getLogin) {
        // 用户登录后请求
        this.$store.dispatch('user/getUserInfo')
      }
```