// 公共的方法

//防抖函数封装 防止速度快而不停的向服务器发送请求
export function debounce(func, delay = 50) {
  let timer = null
  return function (...arg) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arg)
    }, delay)
  }
}

//时间格式化
export function formatDate(date, fmt) {
  //获取年份
  //y+ 1个或多个y
  //y* 0个或多个y
  //y? 0个或1个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //获取其他时间
  let o = {
    'M+': date.getMonth() + 1,//月
    'd+': date.getDate(),     //日
    'h+': date.getHours(),    //时
    'm+': date.getMinutes(),  //分
    's+': date.getSeconds()   //秒
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  //这里时不足两位就补齐0
  return ('00' + str).substr(str.length);
};
