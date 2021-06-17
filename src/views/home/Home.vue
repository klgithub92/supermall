<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends" />
  </div>
</template>

<script>
  //导航组件
  import NavBar from 'components/common/navbar/NavBar.vue'
  //轮播图组件
  import HomeSwiper from './childComps/HomeSwiper.vue'
  //..组件
  import HomeRecommendView from './childComps/HomeRecommendView.vue'

  import { getHomeMultidata } from 'network/home'

  export default {
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      //获取首页请求数据
      getHomeMultidata()
        .then(res => {
          //先把数据保存到data中，因为这里函数调用执行完里面的数据就会被垃圾回收机制回收
          //保存数据实质时保存对象的引用(地址或指针),当这里的数据被回收时，他就不会指向内存中的数据了，但是因为把引用保存在了data中所有又有指针指向了内存数据
          //注意：如果对象没有引用指向它时就会把回收，所有闭包就可以让数据存活了
          // console.log(res)
          //把数据保存到data中
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: bold;
}
</style>