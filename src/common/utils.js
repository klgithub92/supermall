// 公共的方法

//防抖函数封装 防止速度快而不停的向服务器发送请求
export function debounce(func, delay) {
  let timer = null
  return function (...arg) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arg)
    }, delay)
  }
}