<template>
  <div class="goods">
    <goods-list-item v-for="item in goodsList" :listItem="item" />
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'
  export default {
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style>
.goods {
  display: flex;
  /* 可换行 */
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-around;
  padding: 2px;
}
</style>