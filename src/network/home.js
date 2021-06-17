//封装对首页数据的请求
import { request } from "./request"

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}