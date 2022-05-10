<!--
 * @Author: hidari
 * @Date: 2022-05-09 08:59:21
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-10 12:23:26
 * @FilePath: \mobile-news-management\src\views\home\components\channel-edit.vue
 * @Description: 频道编辑组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="channel-edit">
      <van-cell :border="false" class="title">
          <div slot="title" class="title-text">我的频道</div>
          <van-button
          class="edit-btn"
          type="danger"
          plain
          round
          size="mini"
          @click="editCannel"
          >{{isEdit ? '完成' : '编辑'}}</van-button>
      </van-cell>
      <van-grid class="my-grid" :gutter="10">
        <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="channel.id"
        @click="onMyChannelClick(channel,index)"
        >
          <van-icon v-show="isEdit && !fixChannels.includes(channel.id) && myChannels.length> 2" slot="icon" name="clear"></van-icon>
          <span slot="text" class="text" :class="{active: index === active}">{{channel.name}}</span>
        </van-grid-item>
      </van-grid>

        <!-- 分隔线 -->
    <div class="van-hairline--top sp-line"></div>

      <!-- 频道推荐 -->
      <van-cell :border="false" class="title">
          <div slot="title" class="title-text">频道推荐</div>
      </van-cell>
      <van-grid class="recommend-grid" :gutter="10">
        <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="recommendChannel in recommendChannels"
        :key="recommendChannel.id"
        :text="recommendChannel.name"
        @click="onAddChannel(recommendChannel)"
        />
      </van-grid>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
    // 控制编辑状态的显示
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  model: {
    prop: 'isEdit',
    // 这个事件名可以随意写，它实际上是规定了子组件要更新父组件值需要注册的方法
    event: 'changeEdit'
  },
  data () {
    return {
      fixChannels: [0] // 固定频道, 不允许被删除
    }
  },
  mounted () {
    this.loadRecommendChannels()
  },
  computed: {
    ...mapState('home', {
      recommendChannels: state => state.recommendChannels
    }),
    ...mapGetters({
      getLogin: 'getLogin'
    })
  },
  methods: {
    /**
     * 加载推荐频道
     */
    loadRecommendChannels () {
      try {
        this.$store.dispatch('home/getRecommendChannels')
      } catch (error) {
        this.$toast.fail('获取推荐频道失败，请稍后重试')
      }
    },
    /**
     * 添加频道
     */
    onAddChannel (recommendChannel) {
      if (this.getLogin) {
        // 已登录 请求接口
        try {
          this.$store.dispatch('home/addUserChannels', {
            id: recommendChannel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
          // 3. 通过 notify 弹框提示用户更新成功
          this.$notify({ type: 'success', message: '更新成功', duration: 1000 })
        } catch (error) {
          this.$toast.fail('添加频道失败，请稍后重试')
        }
      } else {
        // 未登录 存储在本地
        this.$store.commit('home/changeChannels', recommendChannel)
      }
    },
    /**
     * 点击编辑切换状态
     */
    editCannel () {
      this.$emit('changeEdit', !this.isEdit)
    },
    /**
     * 删除 / 编辑 频道
     */
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果是固定频道 或 仅剩下两个频道 直接返回
        if (this.fixChannels.includes(channel.id) || this.myChannels.length === 2) return
        // 编辑 => 删除
        if (this.getLogin) {
          // 已登录
          this.$store.dispatch('home/deleteUserChannels', channel.id)
        } else {
          // 未登录 数据更新到本地
          this.$store.commit('home/deleteChannels', { channel, index })
        }
        // 如果删除的 index 在 被激活的频道前面
        if (index <= this.active) {
          // 激活频道的索引 -1
          // 第一个参数 => 要高亮的索引
          // 第二个参数 => 是否继续开启弹窗
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
      // 非编辑 => 切换
        this.$emit('update-active', index, false, this.isEdit)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
    padding: 85px 25px;
    .title {
        .title-text {
            font-size: 32px;
            color: #333333;
        }
        .edit-btn {
            width: 104px;
            height: 48px;
            color: #f85959;
            font-size: 26px;
            border: 1px solid #f85959;
        }
    }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap; // 阻止文字折行
      background-color: #f4f5f6;
      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
      .grid-item {
          .van-icon-clear {
              position: absolute;
              right: -10px;
              top: -10px;
              font-size: 15px;
              color: #cacaca;
              z-index: 2;
          }
      }
  }

    /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
.sp-line {
  margin: 10px 0 30px 0;
}
</style>
