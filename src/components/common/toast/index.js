//这是另一种封装组件方法
import Toast from './Toast'

const obj = {}

//install方法默认会传递参数Vue
obj.install = function (Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.new的方法,根据组件构造器可以床关键出来一个组件
  const toast = new toastContrustor()

  //3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  //5.挂载到原型上
  Vue.prototype.$toast = toast
}

export default obj