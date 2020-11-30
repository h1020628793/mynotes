/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2020-03-04 13:48:43
*/
const Router = require('express').Router;
const CollectionModel = require('../../models/collection.js');
const {channels} = require("../../config")
const router = Router();


//普通用户登录权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			code:10
		})
	}
})
//检查用户名是否存收藏了该商品
router.get("/checkCollections",async (req,res)=>{
	const productId = req.query.productId
	try{
		const existCollection = await CollectionModel.findOne({user:req.userInfo._id,product:productId})
		if(existCollection){
			res.json({
				code:0,
				message:'已经收藏',
				data:{
					isCollect:true
				}
			})
			return
		}else{
			res.json({
				code:0,
				message:'还没收藏',
				data:{
					isCollect:false
				}
			})
			return
		}		
	}
	catch(e){
		res.json({
			code:0,
			message:'还没收藏',
			data:{
				isCollect:false
			}
		})		
	}
});

//添加收藏
router.post("/",async (req,res)=>{
	let {productId} = req.body
	try{
		const existCollection = await CollectionModel.findOne({user:req.userInfo._id,product:productId})
		if(existCollection){
			res.json({
				code:0,
				message:'已经收藏'
			})
			return
		}
		const collection = await new CollectionModel({
			user:req.userInfo._id,
			product:productId
		}).save()
		res.json({
			code:0,
			message:'收藏成功'
		})
	}
	catch(e){
		res.json({
			code:1,
			message:'收藏失败'
		})
	}
});
//获取登录用户的收藏商品
router.get("/list",async (req,res)=>{
	try{
		const userId = req.userInfo._id
		let channel = req.query.channel || channels.page
	
		if(channel == channels.page){
		//pc端获取列表

		}
		else{
		//移动端获取列表
			const start = parseInt(req.query.start || 0)
			const limit = parseInt(req.query.limit || 20)
			const result = await CollectionModel.getWapCollectProductByUserId(userId,start,limit)
			res.json({
				code:0,
				message:'获取成功',
				data:result.map(v=>({
					_id:v.product._id,
					name:v.product.name,
					mainImage:v.product.mainImage,
					price:v.product.price
				}))
			})
		}		
	}
	catch(e){
		console.log(e)
		res.json({
			code:1,
			message:'获取收藏失败'
		})
	}	
});

//取消收藏
router.delete('/',async (req,res)=>{
	let productId = req.query.productId || req.body.productId;
	try{
		await CollectionModel.deleteMany({user:req.userInfo._id,product:productId})
		res.json({
			code:0,
			message:'取消成功'
		})
	}
	catch(e){
		res.json({
			code:1,
			message:'取消失败'
		})
	}	

})

module.exports = router;