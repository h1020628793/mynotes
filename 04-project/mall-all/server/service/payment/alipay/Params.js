const crypto = require('crypto');
const moment = require('moment')
//处理参数类
class Params{
	/**
	 * 参数的构造函数
	 * @param  {[type]} method     [description]
	 * @param  {[type]} bizContent [description]
	 * @param  {[type]} notifyUrl  [description]
	 * @param  {[type]} returnUrl  [description]
	 * @param  {[type]} appPrivAteKey [description]
	 * @param  {[type]} signType   [description]
	 * @return {[type]}            [description]
	 */
	constructor(appId,method,bizContent,notifyUrl,returnUrl,appPrivAteKey,signType){
		this.appId = appId
		this.method = method
		this.bizContent = bizContent
		this.appPrivAteKey = appPrivAteKey
		this.signType = signType
		this.notifyUrl = notifyUrl
		this.returnUrl = returnUrl
	}

	getTradeParams(){
		//公共请求参数
		let bizParams = {
	        app_id: this.appId,
	        method: this.method,
	        format: 'JSON',
	        charset: 'utf-8',
	        sign_type: this.signType,
	        timestamp: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
	        version: '1.0',
	        biz_content: JSON.stringify(this.bizContent)
	    }
	    if(this.returnUrl){
	    	bizParams.return_url = this.returnUrl;	
	    }
	    if(this.notifyUrl){
	    	bizParams.notify_url = this.notifyUrl;	
	    }
	    
	    let encodeParams = this._encodeParams(bizParams)

	    let sign = this._sign(encodeParams.unencode, this.appPrivAteKey, this.signType);
	    
	    return encodeParams.encode + '&sign=' + encodeURIComponent(sign);
	}

	/**
	 * 对请求参数进行组装、编码
	 * @param {Object} params  请求参数
	 * @returns {Object}
	 */
	_encodeParams(params) {
	    var keys = [];
	    for(var k in params) {
	        var v = params[k];
	        if (params[k] !== undefined && params[k] !== "") keys.push(k);
	    }
	    keys.sort();

	    var unencodeStr = "";
	    var encodeStr = "";
	    var len = keys.length;
	    for(var i = 0; i < len; ++i) {
	        var k = keys[i];
	        if(i !== 0) {
	            unencodeStr += '&';
	            encodeStr += '&';
	        }
	        unencodeStr += k + '=' + params[k];
	        encodeStr += k + '=' + encodeURIComponent(params[k]);
	    }
	    return {unencode:unencodeStr, encode:encodeStr};
	};

	/**
	 * 对字符串进行签名
	 * @param {String} str 要签名的字符串
	 * @param {String} appPrivAteKey 商户应用私钥
	 * @param {String} [signType] 签名类型
	 * @returns {String}
	 */
	_sign(str, appPrivAteKey, signType) {
	    var sha;
	    if(signType === 'RSA2') {
	        sha = crypto.createSign('RSA-SHA256');
	    } else {
	        sha = crypto.createSign('RSA-SHA1');
	    }
	    sha.update(str, 'utf8');
	    return sha.sign(appPrivAteKey, 'base64');
	}	
}

module.exports = Params