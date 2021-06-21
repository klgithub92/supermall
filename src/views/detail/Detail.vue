<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :swiper-images="swiperImages" />
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shopInfo" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <div class="hot">热门推荐</div>
      <goods-list :goods-list="recommendList" />
    </scroll>
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

  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'
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
        recommendList: [] //商品推荐信息
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
      Scroll,
      GoodsList
    },
    methods: {
      //商品详情图片加载完成
      imageLoad() {
        this.$refs.scroll.refresh()
      }
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
      })
      //3.商品推荐信息
      getRecommend().then((res, error) => {
        // console.log(res)
        if (error) return
        this.recommendList = res.data.list
      })
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
  height: calc(100% - 44px);
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