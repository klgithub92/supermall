<template>
  <div class="total">
    <div class="left">
      <check-button class="check-button" />
      <span>全选</span>
    </div>
    <div class="right">
      <div>
        合计：<em>￥{{ totalPrice }}</em>
      </div>
      <div class="settlement">
        <span>结算({{ checkedLength }})</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'

  import { mapGetters } from 'vuex'
  export default {
    components: { CheckButton },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList
          .filter(item => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length
      }
    }
  }
</script>

<style scoped>
.total {
  display: flex;
  position: relative;
  /* bottom: 40px; */
  height: 40px;
  line-height: 40px;

  font-size: 14px;
  background-color: #eee;
}
.right,
.left {
  display: flex;
}
.right {
  flex: 50%;
}
.check-button {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  margin: 0 5px;
}
.right > div {
  flex: 1;
  text-align: center;
}
.right em {
  font-style: normal;
  color: var(--color-high-text);
}
.right .settlement {
  color: #fff;
}
.right .settlement span {
  display: inline-block;
  margin-top: 3px;
  width: 80%;
  height: 30px;
  line-height: 30px;
  background-color: var(--color-high-text);
  border-radius: 15px;
}
</style>