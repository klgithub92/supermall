import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router//挂载路由
}).$mount('#app')
