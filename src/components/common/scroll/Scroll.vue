// 封装滚动组件
<template>
  <div class="wrapper" ref="swrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script scoped>
  import BScroll from 'better-scroll'
  export default {
    props: {
      //设置滚动监听系数0 1 2 3
      probeType: {
        type: Number,
        default: 0
      },
      //设置上拉加载更多
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      //进一步封装返回顶部方法
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      //完成加载更多
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.swrapper, {
        click: true,
        probeType: this.probeType,
        oserveDOM: true, //监听dom变化
        pullUpLoad: this.pullUpLoad //上拉加载更多
      })
      //2.实时监听滚动位置
      this.scroll.on('scroll', position => {
        //把position的值传递给home父组件 到哪里处理
        this.$emit('scroll', position)
      })
      //3.上拉加载更多
      this.scroll.on('pullingUp', () => {
        // console.log('加载更多')
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style scoped>
/*scoped表示作用域 颜色只在这个组件有用 */
</style>>
