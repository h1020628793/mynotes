const {
	APP_ID,     
	GATEWAY_URL,
	CHARSET,    
	SIGN_TYPE,
	APP_PRIVATE_KEY,
} = require("../../../config")

const Params = require('./Params');

//支付宝类
class Alipay{
	
	constructor(){
		this.gatewayUrl = GATEWAY_URL
		this.appId = APP_ID
		this.charset = CHARSET
		this.signType = SIGN_TYPE
		this.appPrivAteKey = APP_PRIVATE_KEY
	}

	/**
	 * 生成支付参数供电脑网站使用
	 */
	pagePay(options){
		//构造业数据对象
		//请求参数
	    let bizContent = {
	        out_trade_no: options.outTradeNo,
	        subject: options.subject,
	        total_amount: options.amount,
	        product_code: 'FAST_INSTANT_TRADE_PAY',
	        body: options.body,
	        //支付过期时间 2小时
	        timeout_express:'120m',
	        passback_params:options.passbackParams,
	    };
	    let params = new Params(
		    	this.appId,
		    	'alipay.trade.page.pay',
		    	bizContent,
		    	options.notifyUrl,
		    	options.returnUrl,
		    	this.appPrivAteKey,
		    	this.signType
	    	)
	    return this.gatewayUrl + '?'+ params.getTradeParams()
	}

	/**
	 * 单笔转账到支付宝账户接口
	 * alipay.fund.trans.toaccount.transfer
	 */
	transfer(options){
	    let bizContent = {
	        out_biz_no: options.outBizNo,
	        payee_type: options.payeeType,
	        payee_account: options.payeeAccount,
	        amount:options.amount,
	        remark:options.remark,
	    };
	    let params = new Params(
		    	this.appId,
		    	'alipay.fund.trans.toaccount.transfer',
		    	bizContent,
		    	'',
		    	'',
		    	this.appPrivAteKey,
		    	this.signType
	    	)
	    return this.gatewayUrl + '?'+ params.getTradeParams()		
	}
	/**
	 * 手机网站支付接口
	 * alipay.trade.wap.pay
	 */
	wapPay(options){
		//构造业数据对象
		//请求参数
	    let bizContent = {
	        out_trade_no: options.outTradeNo,
	        subject: options.subject,
	        total_amount: options.amount,
	        quit_url:options.quitUrl,
	        product_code: 'QUICK_WAP_WAY',
	        body: options.body,
	        //支付过期时间 2小时
	        timeout_express:'120m',
	        passback_params:options.passbackParams,
	    };
	    let params = new Params(
		    	this.appId,
		    	'alipay.trade.wap.pay',
		    	bizContent,
		    	options.notifyUrl,
		    	options.returnUrl,
		    	this.appPrivAteKey,
		    	this.signType
	    	)
	    return this.gatewayUrl + '?'+ params.getTradeParams()
	}
	/**
	 * app支付接口
	 * alipay.trade.app.pay
	 */
	appPay(options){
		//构造业数据对象
		//请求参数
	    let bizContent = {
	        out_trade_no: options.outTradeNo,//商户网站唯一订单号
	        subject: options.subject,//商品的标题/交易标题/订单标题/订单关键字等。
	        total_amount: options.amount,//订单总金额
	        body: options.body,
	        //支付过期时间 2小时
	        timeout_express:'120m',
	        passback_params:options.passbackParams,
	    };
	    let params = new Params(
	    	this.appId,
	    	'alipay.trade.app.pay',
	    	bizContent,
	    	options.notifyUrl,
	    	options.returnUrl,
	    	this.appPrivAteKey,
	    	this.signType
    	)
	    return  params.getTradeParams()
	}	
}

module.exports = Alipay