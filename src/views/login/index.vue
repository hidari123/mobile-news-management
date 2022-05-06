<!--
 * @Author: hidari
 * @Date: 2022-05-05 19:42:02
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-06 13:28:56
 * @FilePath: \mobile-news-management\src\views\login\index.vue
 * @Description: 登录组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div>
      <div class="login-container">
        <!-- NavBar 组件：只需提供 title 标题 -->
        <van-nav-bar title="注册/登录" fixed class="page-nav-bar"/>
        <!-- 登录的表单 -->
        <!--
            表单验证：
            1. 给 van-field 组件配置 rules 验证规则
            2. 如果验证通过 触发 submit 事件
            3. 如果验证失败 不触发 submit
         -->
        <van-form ref="loginForm" @submit="login">
            <van-field v-model="form.mobile"
             type="number"
             name="mobile"
             ref="mobile"
             maxlength="11"
             placeholder="请输入手机号码"
             >
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field v-model="form.code"
            type="number"
            name="code"
            ref="code"
            maxlength="6"
            placeholder="请输入验证码"
            >
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <van-button class="send-sms-btn"
                    native-type="button"
                    size="small"
                    :type="isCountDownShow ? 'default' : 'primary'"
                    :disabled="isCountDownShow"
                    @click="onSendSms"
                    round>
                    <!--
                        time: 倒计时时间
                        format: 倒计时时间显示格式
                    -->
                    <van-count-down
                    v-if="isCountDownShow"
                    ref="countDown"
                    :time="1000 * 60"
                    format="ss s"
                    :auto-start="false"
                    @finish="isCountDownShow = false"/>
                    <span v-else>获取验证码</span>
                    </van-button>
                </template>
            </van-field>
            <!-- 登录按钮 -->
            <div class="login-btn-wrap">
                <van-button block class="login-btn" type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
      </div>
  </div>
</template>

<script>
import { reqSendSms } from '@/api/user.api.js'
export default {
  name: 'Login',
  data () {
    return {
      // 用户填写的表单数据
      form: {
        // 手机号
        mobile: '13888888123',
        // 登录密码
        code: '246810'
      },
      // 表单数据验证规则
      //   userFormRules: {
      //     mobile: [{
      //       required: true,
      //       message: '手机号不能为空'
      //     }, {
      //       pattern: /^1[3|5|7|8]\d{9}$/,
      //       message: '手机号格式错误'
      //     }],
      //     code: [{
      //       required: true,
      //       message: '验证码不能为空'
      //     }, {
      //       pattern: /^\d{6}$/,
      //       message: '验证码格式错误'
      //     }]
      //   },
      // 是否展示倒计时
      isCountDownShow: false
    }
  },
  methods: {
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
    },
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
    },
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
  }
}
</script>

<style lang="less" scoped>
.login-container {
  padding-top: 100px;
  .toutiao {
      font-size: 37px;
  }
  .send-sms-btn {
    //   background-color: #ededed;
      width: 170px;
      height: 60px;
      line-height: 46px;
      font-size: 22px;
  }
  .login-btn-wrap {
      padding: 53px 33px;
      .login-btn {
          background-color: #6db4fb;
          border: none;
      }
  }
}
</style>
