import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//1.安装vuex插件
Vue.use(Vuex)

const state = {
  cartList: []
}
//2.创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  // mutations: {
  //   //mutations唯一的目的就是修改state中的状态
  //   //mutations中的每个方法要尽可能完成的事件比较单一 这里就是两件事情了所有要抽取
  //   addCart(state, payload) {
  //     //payload新添加的商品
  //     //方法一 循环判断
  //     // let oldProduct = null
  //     // for (const item of state.cartList) {
  //     //   if (item.iid === payload.iid) {
  //     //     oldProduct = item
  //     //   }
  //     // }
  //     // if (oldProduct) {
  //     //   oldProduct.count += 1
  //     // } else {
  //     //   payload.count = 1
  //     //   state.cartList.push(payload)
  //     // }

  //     //方法二 数组高阶函数
  //     //1.查找数组中是否有该商品 返回布尔值
  //     const oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //     // 2.判断oldProduct
  //     if (oldProduct) {
  //       oldProduct.count += 1
  //     } else {
  //       payload.count = 1
  //       state.cartList.push(payload)
  //     }
  //   }
  // }
})

//3.挂载到vue实例上
export default store