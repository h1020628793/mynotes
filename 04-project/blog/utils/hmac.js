// /utils/hmac.js
const crypto = require('crypto')

module.exports = (str)=>{
    const hmac = crypto.createHmac('sha512','sdkfjsdk2343sfjdsklj')
    hmac.update(str)
    return hmac.digest('hex')
}