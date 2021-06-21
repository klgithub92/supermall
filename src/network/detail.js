
import { request } from "./request";
//商品详情数据请求
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
//商品推荐数据请求
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

//把详情需要的数据整合到一个对象中
export class Goods {
  //数据在三个不同的地方 所有把他们放到一个对象方便使用
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

//店铺信息对象
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}


//商品参数数据信息
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}