<template>
  <div class="cart-list">
    <!-- 一般使用了better-scroll插件 都要刷新一下 -->
    <scroll class="content" ref="scroll">
      <shop-cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll.vue'

  import ShopCartListItem from './ShopCartListItem.vue'

  import { mapGetters } from 'vuex'
  export default {
    components: {
      ShopCartListItem,
      Scroll
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 44px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>