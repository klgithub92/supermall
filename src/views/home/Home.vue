<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control :titles="['流行', '新款', '经典']" class="tab-control" />

    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
    </ul>
  </div>
</template>

<script>
  //这里是子组件部分
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import HomeRecommendView from './childComps/HomeRecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  //这里是公共组件部分
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl'

  //这里是方法部分
  import { getHomeMultidata } from 'network/home'

  export default {
    components: {
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      NavBar,
      TabControl
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      //获取首页请求数据
      getHomeMultidata()
        .then(res => {
          //先把数据保存到data中，因为这里函数调用执行完里面的数据就会被垃圾回收机制回收
          //保存数据实质时保存对象的引用(地址或指针),当这里的数据被回收时，他就不会指向内存中的数据了，但是因为把引用保存在了data中所有又有指针指向了内存数据
          //注意：如果对象没有引用指向它时就会把回收，所有闭包就可以让数据存活了
          // console.log(res)
          //把数据保存到data中
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style>
#home {
  padding-top: 44px;
}
.home-nav {
  /* 粘性布局 */
  /* position: sticky; */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

  background-color: var(--color-tint);
  color: #fff;
  font-weight: bold;
}
/* 滚动到一定位置tab栏会附着到tabbar下面 */
.tab-control {
  /* 粘性布局 一定要跟top */
  position: sticky;
  /* 它本身距离视口窗顶部的距离 */
  top: 44px;
}
</style>