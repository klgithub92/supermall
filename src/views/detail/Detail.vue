<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :swiper-images="swiperImages" />
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shopInfo" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <div class="hot">热门推荐</div>
      <goods-list ref="recommend" :goods-list="recommendList" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />

    <!-- 返回顶部按钮组件 -->
    <!-- 给组件添加原生的点击事件 监听组件根元素的原生事件-->
    <back-top @click.native="backTop" v-show="isShow" />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import { debounce } from 'common/utils'
  import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'
  import { itemImgListenerMixin, backTopMixin } from 'common/mixin'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        swiperImages: [],
        goodsInfo: {}, //商品信息
        shopInfo: {}, //店铺信息
        detailInfo: {}, //商品图片信息
        paramInfo: {}, //商品参数信息
        commentInfo: {}, //商品评论信息
        recommendList: [], //商品推荐信息
        themeTopYs: [], //详情页顶部tab栏
        getThemeTopY: null, //加入防抖后获取的y值
        currentIndex: 0
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    methods: {
      //商品详情图片加载完成
      imageLoad() {
        //方法一：不使用防抖
        // this.$refs.scroll.refresh()

        //方法二：使用防抖
        this.newRefresh()

        //点击顶部主题滚到相应位置
        this.getThemeTopY()
      },

      //点击联动效果
      titleClick(index) {
        // console.log(index)
        // console.log(this.themeTopYs[index])
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },

      contentScroll(position) {
        // console.log(position)
        //1.联动效果
        this._listenScrollTheme(position)

        //2.是否显示回到顶部
        this.listenShowBackTop(position)
      },

      //滚动联动效果
      _listenScrollTheme(position) {
        //1.获取y值
        const positionY = Math.abs(position.y)
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
           */
          //方案一
          //把前三个归类到一起,最后一个为一类
          // if ((this.currentIndex !== i && i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i])) {
          //   this.currentIndex = i
          //   // console.log(this.currentIndex)
          //   this.$refs.nav.currentIndex = this.currentIndex
          //   break
          // }

          //方案二 hock
          if (this.currentIndex !== i && i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
            this.currentIndex = i
            // console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
            break
          }
        }
      },

      //添加购物车
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.swiperImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.realPrice
        product.iid = this.iid

        //2.将商品添加到购物车
        // this.$store.state.cartList.push(product)//这样不推荐，要经过vuex的mutations
        // this.$store.commit('addCart', product)//这是传递数据到mutations
        this.$store.dispatch('addCart', product) //传递数据到actions
      }
    },
    mixins: [itemImgListenerMixin, backTopMixin],
    mounted() {
      // console.log('详情页混入内容')
    },
    //这个只有在keep-alive里起作用 所以这里不起作用 没有缓存
    // deactivated() {
    //   //取消事件总线的全局监听事件
    //   this.$bus.$off('itemImageLoad', this.itemImgListener)
    //   console.log('1111')
    // },
    destroyed() {
      //取消事件总线的全局监听事件
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created() {
      // console.log(this.$route.params)
      //注意：route是该活动的组件
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        //2.1获取数据
        const data = res.result
        //2.2获得顶部图片轮播数据
        this.swiperImages = data.itemInfo.topImages

        //2.3获得商品信息
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //2.4店铺信息显示
        this.shopInfo = new Shop(data.shopInfo)

        //2.5保存商品的详情数据
        this.detailInfo = data.detailInfo

        //2.6保存参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //2.7保存商品评论信息
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }

        //第一次获取：值不对 原因：this.$refs.param.$el压根没有被渲染
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)

        //联动效果 点击顶部标题显示对应位置
        this.$nextTick(() => {
          //第二次获取值不对 原因：图片没有计算在内
          //根据最新的数据，对应的DOM时已经被渲染出来了 但是图片依然是没有加完成(目前获得到offserTop不包含其中的图片的)
          //注意：offsetTop值不对一般都是图片问题
          // this.themeTopYs = []
          // this.themeTopYs.push(0)
          // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs)
        })
      })
      //3.商品推荐信息
      getRecommend().then((res, error) => {
        // console.log(res)
        if (error) return
        this.recommendList = res.data.list
      })
      //4.给getThemeTopY加防抖后赋值
      //对getThemeTopY赋值的操作进行防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 40)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      }, 200)
    }
  }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
/* 滚动必须设置高度 */
.content {
  /* 空格一定不用忘了 */
  height: calc(100% - 44px - 49px);
  /* position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0; */
  overflow: hidden;
}
.hot {
  padding-left: 8px;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  color: #333;
}
</style>