// 轮播图组件
<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  //导入轮播图组件
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false //节流阀
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imgLoad() {
        //监听轮播图篇是否加载完
        //保证值发出一次事件就行 这样效率跟高
        if (!this.isLoad) {
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style>
</style>