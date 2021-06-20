<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :swiper-images="swiperImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
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

  import Scroll from 'components/common/scroll/Scroll.vue'

  import { getDetail, Goods, Shop, GoodsParam } from 'network/detail'
  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        swiperImages: [],
        goods: {}, //商品信息
        shop: {}, //店铺信息
        detailInfo: {}, //商品图片信息
        paramInfo: {} //商品参数信息
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
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
        console.log(res)
        const data = res.result
        // 1.获得顶部图片轮播数据
        this.swiperImages = data.itemInfo.topImages

        //2.获得商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.店铺信息显示
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
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
</style>