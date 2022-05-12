<!--
 * @Author: hidari
 * @Date: 2022-05-12 12:39:45
 * @LastEditors: lijiaying 1640106564@qq.com
 * @LastEditTime: 2022-05-12 15:26:12
 * @FilePath: \mobile-news-management\src\views\user-profile\components\update-photo.vue
 * @Description: 修改头像
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
<div class="update-photo">
  <img :src="img" ref="img" class="img" alt="">

  <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
  </div>
</div>
</template>

<script>
import { reqUpdateUserAvatar } from '@/api/user.api'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 裁剪框不能超出图片区域
      dragMode: 'none',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: true,
      background: false
    })
  },
  methods: {
    onConfirm () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '上传中...',
          forbidClick: true,
          duration: 0
        })
        try {
          // 如果接口要求 Content-Type 为 multipart/form-data
          // 需要传递 FormData 对象
          const formData = new FormData()
          formData.append('photo', blob)
          const res = await reqUpdateUserAvatar(formData)
          console.log(res)
          this.$toast.success('上传头像成功')
          // 更新视图
          this.$emit('update-photo', res.data.photo)
        } catch (error) {
          this.$toast.fail('上传头像失败')
        }
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
    background-color: #000;
    height: 100%;
    .img {
    display: block;
    max-width: 100%;
}
    .toolbar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        .cancel,.confirm {
            width: 90px;
            height: 90px;font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }
}

</style>
