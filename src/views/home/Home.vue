<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control :titles="['流行', '新款', '经典']" class="tab-control" @tabToggleClick="tabToggleClick" ref="tabControl1" v-show="isTabFixed" />

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '经典']" @tabToggleClick="tabToggleClick" ref="tabControl2" />
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
  import { debounce } from 'common/utils'

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
        isShow: false, //返回顶部默认值
        tabOffsetTop: 0, //吸顶默认值
        isTabFixed: false, //是否吸顶默认值
        saveY: 0 //切换回来时保存的默认y轴距离
      }
    },
    computed: {
      //展示商品
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed')
    },
    //这里的两个钩子函数旨在keep-alive里起作用
    //进入调用
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0) //第三个参数是时间
      this.$refs.scroll.refresh() //防止突然回到顶部
    },
    //离开调用
    deactivated() {
      //保存离开时位置
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY)
    },
    created() {
      //1.获取首页请求数据
      this.getHomeMultidata()

      //2.获得首页tab栏的所有商品信息
      this.getHomeGoodsData('pop')
      this.getHomeGoodsData('new')
      this.getHomeGoodsData('sell')

      // created生命周期钩子里可能拿不到元素
      // document.querySelector
      // this.$refs.scroll
    },
    mounted() {
      // 1.图片加载完的事件监听
      //定义图片防抖函数 可以不传毫秒事件参数
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      //监听事件总线
      //监听item的玉佩加载完成
      this.$bus.$on('itemImageLoad', () => {
        // 所有在这里刷新 这样刷新就不会时每次30次了 而是1到几次 减轻了对服务器的压力
        refresh()
      })

      //注意这里这样拿到的是不包含大的图片的高度如轮播图 大的图片还没有加载完成
      // 2.获取tabControl的offsetTop  吸顶值赋值
      //注意：所有的组件都有一个属性$el:用于获取元素中的组件
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabOffsetTop) //53
    },
    methods: {
      /**
       *事件监听相关方法
       */
      //tab栏切换
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
        //吸顶功能上的选项要与点击的保持一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
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
        //1.监听返回按钮显示与隐藏
        // this.isShow = -position.y > 1000
        this.isShow = Math.abs(position.y) > 1000

        //2.监听tabControl吸顶效果
        this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore() {
        // console.log('上拉加载更多')
        //完成加载更多
        this.getHomeGoodsData(this.currentType)

        //有的图片还没加载完 图片加载时异步的 所有现在要在重新刷一些重新给高度
        // this.$refs.scroll.scroll.refresh() //刷新
      },
      //监听轮播图片加载完成 完成吸顶操作
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop) //608 拿到正确的值了
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
  /* padding-top: 44px; */
  /* 视口百分比高度 */
  height: 100vh;
}
.home-nav {
  /* 这里没必要托镖了，因为better-scroll是局部滚动，不包含这里*/
  /* 粘性布局 */
  /* position: sticky; */
  /* position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */

  background-color: var(--color-tint);
  color: #fff;
  font-weight: bold;
}
/* 滚动到一定位置tab栏会附着到tabbar下面 */
/* 粘性布局 一定要跟top */
/* 它本身距离视口窗顶部的距离 */
/* 他说原生的方法在 better-scroll里不起作用 */
/* .tab-control {
  position: sticky;
  top: 44px;
} */

.tab-control {
  /* 不脱离文档流 并且站住了位置 */
  position: relative;
  z-index: 9;
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
  /* 一定要加这个 保证better-scroll控制的范围不包含nav和tab上下 */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  /* height: calc(100% - 93px); */
  left: 0;
  right: 0;
}
/* 吸顶样式
*注意：这样会使本身在better-scroll范围内的tabControl变成脱离了文当流
*有因为better-scroll的滚动核心是transform：translateY移动的所以tabControl和跟着滚动移动
*并且tabControl以脱离文档流了 下面的会突然顶上来
*/
/* .isfixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
} */
</style>