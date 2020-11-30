const crypto = require('crypto');
const { ALIPAY_PUBLIC_KEY } = require("../../../config")

class AlipaySignature{
	//验证签名
	static signVerify(params) {
		let sign = params.sign
		let signType = params.sign_type
		//获取待签名的参数字符串
		let verifyParams = this._getVerifyParams(params)
	    let verify;
	    if(signType === 'RSA2') {
	        verify = crypto.createVerify('RSA-SHA256');
	    } else {
	        verify = crypto.createVerify('RSA-SHA1');
	    }
	    verify.update(verifyParams)
	    let result = verify.verify(ALIPAY_PUBLIC_KEY,sign,'base64');
	    return result;
	}

	//除去sign、sign_type两个参数外,将剩下参数进行url_decode, 然后进行字典排序，组成字符串，得到待签名字符串
	static 	_getVerifyParams(params){
	    var keys = [];
	    for(var k in params) {
	        var v = params[k];
	        if (params[k] !== undefined && params[k] !== "") keys.push(k);
	    }
	    keys.sort();

	    var decodeStr = "";
	    var len = keys.length;
	    for(var i = 0; i < len; ++i) {
	        var k = keys[i];
	        if(i !== 0 && k != 'sign' && k != 'sign_type') {
	            decodeStr += '&';
	        }
	        if(k != 'sign' && k != 'sign_type'){
	        	decodeStr += k + '=' + decodeURI(params[k]);	
	        }
	    }
	    return decodeStr;
	}
}

module.exports = AlipaySignature