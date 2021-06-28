import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件 本质默认会调用install方法
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)

//安装插件 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1,
  //占位图片
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,//挂载路由
  store//挂载vuex实例
}).$mount('#app')
