import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
  //1.数量添加
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  //2.加入购物车
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}