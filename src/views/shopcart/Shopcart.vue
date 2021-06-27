<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!-- 1.购物车数量 -->
      <!-- <div slot="center">购物车({{ cartLength }})</div> -->
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 2.购物车商品列表 -->
    <shop-cart-list />
    <!-- 3.购物车商品汇总 -->
    <shop-cart-total-bar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import ShopCartTotalBar from './childComps/ShopCartTotalBar.vue'

  import ShopCartList from './childComps/ShopCartList.vue'

  import { mapGetters } from 'vuex'

  export default {
    components: {
      NavBar,
      ShopCartList,
      ShopCartTotalBar
    },
    computed: {
      //方法一 使用对象展开运算符将 getter 混入 computed 对象中
      // ...mapGetters(['cartLength', 'cartList'])

      //方法二 如果你想将一个 getter 属性另取一个名字，使用对象形式
      ...mapGetters({
        length: 'cartLength'
        // list: 'cartList'
      })
    }
  }
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cart .nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>