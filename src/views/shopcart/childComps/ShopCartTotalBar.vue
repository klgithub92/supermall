<template>
  <div class="total">
    <div class="left">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="selectAllClick" />
      <span>全选</span>
    </div>
    <div class="right">
      <div>
        合计：<em>￥{{ totalPrice }}</em>
      </div>
      <div class="settlement">
        <span @click="calcClick">结算({{ checkedLength }})</span>
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
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        //方法一 find
        // return !this.cartList.find(item => !item.checked)
        //方法二 some 只要有不满足的就终止
        // return !this.cartList.some(item => !item.checked)
        //方法三 every 查看所有满足条件的
        return this.cartList.every(item => item.checked)
      }
    },
    methods: {
      selectAllClick() {
        if (this.isSelectAll) {
          //全部选中
          //点击要全部不选中
          this.cartList.forEach(item => (item.checked = false))
        } else {
          //全部不选中或者有的没选中
          //点击后全部选中
          this.cartList.forEach(item => (item.checked = true))
        }

        //注意：这里不能简写 要不然会相互影响
        // this.cartList.forEach(item => (item.checked = !this.checked))
      },
      //结算操作
      calcClick() {
        if (this.checkedLength === 0) {
          this.$toast.show('请选择购买的商品', 1000)
        }
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