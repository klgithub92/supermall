<template>
  <div class="goods-item" @click="itemClick">
    <!-- vue中监听图片加载@load 原生js img.onload=function()-->
    <img :src="showIma" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ listItem.title }}</p>
      <span class="price">{{ listItem.price }}</span>
      <span class="collect">{{ listItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      listItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showIma() {
        return this.listItem.image || this.listItem.show.img
      }
    },
    methods: {
      //监听图片加载完毕 刷新
      imageLoad() {
        // console.log(this.$bus)
        //发射到事件总线中 留给home.vue首页监听
        this.$bus.$emit('itemImageLoad')

        //因为详情页下面的热门推荐也会发送图片加载 所有要判断
        // if (this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('itemImageLoad')
        // } else if (this.$route.path.indexOf('/detail')) {
        //   this.$bus.$emit('detailImgLoad')
        // }
      },
      itemClick() {
        // console.log(this.listItem.iid)
        this.$router.push('/detail/' + this.listItem.iid)
        // this.$router.push({
        //   path: '/detail',
        //   query: {
        //     iid: this.listItem.iid
        //   }
        // })
      }
    }
  }
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  background-color: #fff;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>