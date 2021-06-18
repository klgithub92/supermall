//封装对首页数据的请求
import { request } from "./request"

//获取轮播图数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//首页tab栏数据的所有数据
export function getHomeGoods(type, page) {
  return request({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}