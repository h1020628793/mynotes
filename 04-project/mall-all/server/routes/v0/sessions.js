/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-31 15:19:05
*/
const Router = require('express').Router

const UserModel = require('../models/user.js')
const OrderModel = require('../models/order.js')
const hmac = require('../util/hmac.js')

const router = Router();

//用户登录
router.post("/users",(req,res)=>{
	const { username,password,role} = req.body
	
	let isAdmin = false
	if(role == 'admin'){
		isAdmin = true
	}

	UserModel
	.findOne({$or:[
		{username:username,password:hmac(password),isAdmin:isAdmin},
		{phone:username,password:hmac(password),isAdmin:isAdmin}
	]})
	.then((user)=>{
		if(user){
			if(user.isActive == '0'){
				res.json({
				 	code:1,
				 	message:"用户名已经被锁定",
				 	data:{
				 		username:username
				 	}
				})
				return;
			}
			req.session.userInfo = {
				_id:user._id,
				username:username,
				isAdmin:isAdmin
			}
			res.json({
				code:0,
				data:{
					username:username
				}
			});
		}else{
			res.json({
			 	code:1,
			 	message:"用户名和密码错误",
			 	data:{
			 		username:username
			 	}
			 })
		}
	})
})

//用户退出
router.delete('/users',(req,res)=>{
	req.session.destroy();
	res.json({
		code:0,
	})
})
//获取登录用户的用户名
router.get("/username",(req,res)=>{
	if(req.userInfo._id){
		res.json({
			code:0,
			data:{
				username:req.userInfo.username
			}
		})
	}else{
		res.json({
			code:1
		});
	}
});

//登录权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			code:10
		})
	}
})

//获取登录用户的信息
router.get("/users",(req,res)=>{
	UserModel.findById(req.userInfo._id,"username phone email createdAt avatar")
	.then(user=>{
		OrderModel.countDocuments({user:req.userInfo._id})
		.then((count)=>{
			const userObj = {
				orderNum:count,
				email:user.email,
				createdAt: user.createdAt,
				phone: user.phone,
				username: user.username,
				avatar: user.avatar,
				_id: user._id,
			}
			res.json({
				code:0,
				data:userObj
			})
		})
	})
	.catch(e=>{
		res.json({
			code:1
		});			
	})
})

module.exports = router;