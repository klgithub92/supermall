<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '经典']" class="tab-control" @tabToggleClick="tabToggleClick" />
      <goods-list :goods-list="showGoods" />
    </scroll>

    <!-- 返回顶部按钮组件 -->
    <!-- 给组件添加原生的点击事件 监听组件根元素的原生事件-->
    <back-top @click.native="backTop" v-show="isShow" />
  </div>
</template>

<script>
  //这里是子组件部分
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import HomeRecommendView from './childComps/HomeRecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  //这里是公共组件部分
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  //这里是方法部分
  import { getHomeMultidata, getHomeGoods } from 'network/home'

  export default {
    components: {
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        // tab栏商品的所有数据
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] }
        },
        currentType: 'pop',
        isShow: false
      }
    },
    created() {
      //1.获取首页请求数据
      this.getHomeMultidata()

      //2.获得首页tab栏的所有商品信息
      this.getHomeGoodsData('pop')
      this.getHomeGoodsData('new')
      this.getHomeGoodsData('sell')
    },
    computed: {
      //展示商品
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       *事件监听相关方法
       */
      tabToggleClick(index) {
        // console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      //返回顶部事件
      backTop() {
        // this.$refs.scroll 拿到的是scroll组件对象
        //this.$refs.scroll.scroll 拿到的是Scroll组件下data的scroll值
        // this.$refs.scroll.scroll.scrollTo(0, 0, 300) //x y 300毫秒
        this.$refs.scroll.scrollTo(0, 0) //默认300ms
      },
      //滚动事件 返回顶部按钮的显示与隐藏
      contentScroll(position) {
        // console.log(position.y)
        // this.isShow = -position.y > 1000
        this.isShow = Math.abs(position.y) > 1000
      },
      //上拉加载更多
      loadMore() {
        // console.log('上拉加载更多')
        //完成加载更多
        this.getHomeGoodsData(this.currentType)

        //有的图片还没加载完 图片加载时异步的 所有现在要在重新刷一些重新给高度
        this.$refs.scroll.scroll.refresh() //刷新
      },
      /**
       * 网络请求相关方法
       */
      //1.获取首页请求数据 封装
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //先把数据保存到data中，因为这里函数调用执行完里面的数据就会被垃圾回收机制回收
          //保存数据实质时保存对象的引用(地址或指针),当这里的数据被回收时，他就不会指向内存中的数据了，但是因为把引用保存在了data中所有又有指针指向了内存数据
          //注意：如果对象没有引用指向它时就会把回收，所有闭包就可以让数据存活了
          // console.log(res)
          //把数据保存到data中
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      //2.获得首页tab栏的所有商品信息
      getHomeGoodsData(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          //把数据加入到data中goods里的对应list数组中
          this.goods[type].list.push(...res.data.list)
          //页码要再加1
          this.goods[type].page += 1

          //完成加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  /* 视口百分比高度 */
  height: 100vh;
}
.home-nav {
  /* 粘性布局 */
  /* position: sticky; */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

  background-color: var(--color-tint);
  color: #fff;
  font-weight: bold;
}
/* 滚动到一定位置tab栏会附着到tabbar下面 */
.tab-control {
  /* 粘性布局 一定要跟top */
  position: sticky;
  /* 它本身距离视口窗顶部的距离 */
  top: 44px;
}
/* 注意calc函数里减号两边要有空格  */
/* 这样可能有误差 */
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
/* 采用定位就没有误差了 */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>