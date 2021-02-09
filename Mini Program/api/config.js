const SERVER = 'https://api.mall.kuazhu.com'
const API_CONFIG = {
  //接口名称:[接口地址,方法,权限验证]
  getPositionAds: ['/ads/positionAds', 'get'],
  addCarts: ['/carts', 'post','auth'],
  getArrayCategories : ['/categories/arrayCategories', 'get'],
  getFloors:['/floors','get']
}
module.exports = {
  API_CONFIG,
  SERVER
}