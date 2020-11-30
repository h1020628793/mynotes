/*
* @Author: Tom
* @Date:   2020-01-10 12:03:18
* @Last Modified by:   Tom
* @Last Modified time: 2020-03-02 12:41:49
*/
exports.DB_HOST = 'localhost'
exports.UPLOAD_HOST = 'http://127.0.0.1:3000'
/*
使用natapp内网穿透
cd 
./natapp -authtoken=3afb41c61f82c954
*/
exports.HOST_DOMAIN = 'http://fw5gew.natappfree.cc/v1'

//以下为支付宝相关的配置沙箱环境
/*
https://openhome.alipay.com/platform/appDaily.htm?tab=info
买家账号 dfyowg0097@sandbox.com
登录密码111111
支付密码111111
*/


exports.APP_ID      = '2016072301655452' 
exports.GATEWAY_URL = 'https://openapi.alipay.com/gateway.do' 
exports.SELLER_ID = '2088021844471038' 


//生成环境 aplipay public
exports.ALIPAY_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiQOHBIpR0sSduBlzr99u
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiQOHBIpR0sSduBlzr99u
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiQOHBIpR0sSduBlzr99u
mZRc1x/WLblGMCx4woVk4Z8daOsvZ+19bKPE/A35sd1msLeimqyyXcVGNmsfxIjg
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiQOHBIpR0sSduBlzr99u
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiQOHBIpR0sSduBlzr99u
awIDAQAB
-----END PUBLIC KEY-----`

