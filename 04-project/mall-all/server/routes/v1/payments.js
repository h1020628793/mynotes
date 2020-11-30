/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2020-02-22 13:10:33
*/
const Router = require('express').Router;
const OrderModel = require('../../models/order.js');
const ProductModel = require('../../models/product.js');

const AlipaySignature = require("../../service/payment/alipay/AlipaySignature");
const {APP_ID,SELLER_ID} = require("../../config")

const router = Router();


//支付异步回调
router.post('/alipay/notify',function(req,res,next){
	//签名验证
	let params = req.body
	let signVerified = AlipaySignature.signVerify(params)
	if(signVerified){
		//二次验证
		//获取订单号 通过订单号查找未支付的订单
		let paramNo = params.out_trade_no
		OrderModel.findOne({orderNo:paramNo})
		.then((order)=>{
			if(order.status == '30'){
				return res.send("success")
			}
			let paramAmount = params.total_amount*1
			let orderAmount = order.payment*1
			if(params.app_id === APP_ID && paramAmount === orderAmount && SELLER_ID === params.seller_id && order.orderNo === paramNo ){
				if(params.trade_status === 'TRADE_SUCCESS' || params.trade_status === 'TRADE_FINISHED' ){
					//更新订单
					order.status = '30'
					order.statusDesc = '已支付'
					order.save()
					//更新购买数
					const productIDs = order.productList.map(product=>product.productId)
					ProductModel.updateMany({_id:{$in:productIDs}},{$inc:{payNums:1}})
					.then(raw=>{})
					//返回给支付宝服务器
					res.send("success")
				}
			}else{
				res.send("failure")
			}
		})
	}else{
		res.send("failure")
	}
})

//手机用户付款中途退出返回商户网站的地址
router.get('/alipay/quit',(req,res)=>{
	res.send('pay quit')
})
//微信Native支付回调URL
router.get('/wxpay/native/notify',(req,res)=>{
	//todo.... 更具订单号获取订单信息,然后调用支付宝接口获取支付二维码
	res.json({
		code:0,
		data:{
			orderNo:req.query.orderNo,
			//该地址应该从支付宝接口获取
			qrUrl:"http://127.0.0.1:3000/alipay-qr/pay.jpg"
		}
	})

})

router.get('/status',(req,res)=>{
	let orderNo =  req.query.orderNo;
	OrderModel.findOne({orderNo:orderNo},'status')
	.then(order=>{
		res.json({
			code:0,
			data:order.status == 30
		})
	})
})






module.exports = router;