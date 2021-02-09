import { API_CONFIG, SERVER } from './config.js'
import regeneraorRuntime from '../lib/regeneratorRuntime/regeneratorRuntime'
import promisify from '../utils/promisify.js'

let ajaxTimes = 0

const getApiObj = (apiConfig) => {
  const apiObj = {}

  for (let key in apiConfig) {
    apiObj[key] = async (options={}) => {
      //处理请求参数
      let url = apiConfig[key][0] || ''
      if (!url.startsWith('http://') && SERVER) {
        url = SERVER + url
      }
      let method = apiConfig[key][1] || 'get'
      options.url = url
      options.method = method
      try{
        const request = promisify(wx.request)
        wx.showLoading({
          title: '加载中',
          mask: true
        })        
        ajaxTimes++
        const result = await request(options)
        ajaxTimes--
        if (ajaxTimes == 0) {
          wx.hideLoading()
        }
        if (result.data.code == 0) {
          //返回数据
          return result.data.data
        } else {
          //错误提示 返回undefined
          console.error('接口调用错误:' + result.data.message)
        }
      }catch(e){
        //错误提示 返回undefined
        console.error('接口调用错误:' + result.data.message)
      }
    }
  }

  return apiObj
}


module.exports = getApiObj(API_CONFIG)