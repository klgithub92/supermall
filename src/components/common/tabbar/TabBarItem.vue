<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 这样包裹不会使得插槽样式错乱 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // 当前活跃状态的路由地址是否和现在的path是否相等
        // return this.$route.path === this.path
        // return this.$route.path.indexOf(this.path) !== -1
        return this.$route.path.includes(this.path)
      },
      activeStyle() {
        //先判断是否处于活跃或被点击 在给值
        return this.isActive ? { color: this.activeColor } : {}
      }
    },
    props: {
      //动态的传递地址
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /* 移动端tabbar一般高度固定49px */
  height: 49px;
  margin-top: 3px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>