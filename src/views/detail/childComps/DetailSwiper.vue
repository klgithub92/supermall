//商品详情轮播图组件
<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in swiperImages">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  //轮播图组件

  export default {
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      swiperImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>>