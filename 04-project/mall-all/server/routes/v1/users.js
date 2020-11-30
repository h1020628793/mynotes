/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2020-02-25 14:51:08
*/
const https = require("https")

const Router = require('express').Router;
const svgCaptcha = require('svg-captcha')
const UserModel = require('../../models/user.js');
const OrderModel = require('../../models/order.js');
const ProductModel = require('../../models/product.js');
const TokenModel = require('../../models/token.js');
const VerifyModel = require('../../models/verify.js');
const pagination = require('../../util/pagination.js');
const hmac = require('../../util/hmac.js')
const {sendRegisterSms,sendLoginSms} = require("../../service/sms/sms");
const {UPLOAD_HOST,channels} = require("../../config")
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatar/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const router = Router();

//检查用户名是否存在
router.get("/checkUsername",(req,res)=>{
	const username = req.query.username;
	UserModel
	.findOne({username:username})
	.then((user)=>{
		if(user){
			res.json({
				code:1,
				message:'用户名已存在'
			})
		}else{
			res.json({
				code:0,
			})
		}
	})
});
//检查手机号是否存在
router.get("/checkPhone",(req,res)=>{
	const phone = req.query.phone;
	UserModel
	.findOne({phone:phone})
	.then((user)=>{
		if(user){
			res.json({
				code:1,
				message:'手机号已存在'
			})
		}else{
			res.json({
				code:0,
			})
		}
	})
});
//获取图像验证码
router.get("/captcha",(req,res)=>{
	const captcha = svgCaptcha.create();
	req.session.captcha = captcha.text.toLowerCase();
	
	res.type('svg');
	res.status(200).json({
		code:0,
		data:captcha.data
	});	
});
//获取注册短信验证码
router.get("/registerVerifyCode",async (req,res)=>{
	const {phone,captchaCode,channel} = req.query
	//app端不需要图形验证码
	if(channel != channels.app){
		const lowerCaseCaptchaCode = captchaCode && captchaCode.toLowerCase()
		if(req.session.captcha != lowerCaseCaptchaCode){
			res.json({
				code:1,
				message:'图形验证码错误'
			})		
			return;		
		}
	}
	try{
		const user = await UserModel.findOne({phone:phone})
		if(user){
			res.json({
				code:1,
				message:'手机号已存在'
			})
			return				
		}
		const code = await sendRegisterSms(phone)
		//1.删除原有的
		await VerifyModel.deleteMany({phone:phone,codeType:'20'})
		//2.增加新的
		await new VerifyModel({
			phone:phone,
			code:code,
			codeType:'20'
		}).save()
		//返回
		res.json({
			code:0,
			message:'手机验证码已发送'
		})
	}	
	catch(e){
		res.json({
			code:1,
			message:'验证码发送失败'
		})	
	}
});
//注册用户
router.post("/",async (req,res)=>{
	const {phone,password,verifyCode,channel} = req.body
	try{
		//1.判断验证码
		const verify = await VerifyModel.findOne({phone:phone,codeType:'20'})
		if(!verify || verify.code != verifyCode){
			res.json({
				code:1,
				message:'手机号和短信验证码错误'
			})		
			return;		
		}
		//检查是否已经注册
		const user = await UserModel.findOne({phone:phone})
		if(user){
			res.json({
				code:1,
				message:'用户已存在'
			})
			return		
		}

		//插入新用户
		const newUser = await new UserModel({
			username:phone,
			phone:phone,
			password:hmac(password),
			avatar:UPLOAD_HOST+'/avatar/default.jpg',
		}).save()

		//保存登陆状态
		if(channels.app = channel){
			//生成token
			const token = hmac(Date.now().toString() + parseInt(Math.random()*10000))
			//插入token 返回token
			await new TokenModel({
				user:newUser._id,
				token:token
			}).save()

			//创建token成功 返回token
			res.json({
				code:0,
				message:'注册成功',
				data:{
					username:newUser.username,
					token:token,
					avatar:newUser.avatar
				}
			})
		}else{
			req.session.userInfo = {
				_id:newUser._id,
				username:newUser.username,
				isAdmin:isAdmin
			}
			res.json({
				code:0,
				message:'注册成功',
				data:{
					username:newUser.username
				}
			});
		}		
	}
	catch(e){
		console.log(e)
		res.json({
			code:1,
			message:'注册失败'
		})		
	}
})
//用户登录(用户名密码)
router.post("/login",(req,res)=>{
	const { username,password,role,captchaCode,channel} = req.body
	//app端不需要图形验证码
	if(channel != channels.app){
		const lowerCaseCaptchaCode = captchaCode && captchaCode.toLowerCase()
		if(req.session.captcha != lowerCaseCaptchaCode){
			res.json({
				code:1,
				message:'图形验证码错误'
			})		
			return;		
		}
	}
	//默认是普通用户登陆	
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
				 		username:user.username
				 	}
				})
				return;
			}
			//app端
			if(channel == channels.app){
				//生成token
				const token = hmac(Date.now().toString() + parseInt(Math.random()*10000))
				//插入token 返回token
				new TokenModel({
					user:user._id,
					token:token
				})
				.save()
				.then(raw=>{
					//创建token成功 返回token
					res.json({
						code:0,
						data:{
							username:user.username,
							token:token,
							avatar:user.avatar
						}
					})
				})						
			}
			//非app端(pc/h5)
			else{
				//用户信息存储在session中
				req.session.userInfo = {
					_id:user._id,
					username:user.username,
					isAdmin:isAdmin
				}
				res.json({
					code:0,
					data:{
						username:user.username
					}
				});
			}
		}else{
			res.json({
			 	code:1,
			 	message:"用户名和密码错误"
			 })
		}
	})
})
//获取登陆短信验证码
router.get("/loginVerifyCode",async (req,res)=>{
	const {phone,captchaCode,channel} = req.query
	
	//app端不需要图形验证码
	if(channel != channels.app){
		const lowerCaseCaptchaCode = captchaCode && captchaCode.toLowerCase()
		if(req.session.captcha != lowerCaseCaptchaCode){
			res.json({
				code:1,
				message:'图形验证码错误'
			})		
			return;		
		}
	}
	try{
		const user = await UserModel.findOne({phone:phone})
		if(user){
			//发送短信
			const code = await sendLoginSms(phone)
			//1.删除原有的
			await VerifyModel.deleteMany({phone:phone,codeType:'10'})
			//2.增加新的
			await new VerifyModel({
				phone:phone,
				code:code,
				codeType:'10'
			}).save()
			//返回
			res.json({
				code:0,
				message:'手机验证码已发送'
			})						
		}else{
			res.json({
				code:1,
				message:'手机号不存在'
			})	
		}		
	}catch(e){
		res.json({
			code:1,
			message:'验证码发送失败'
		})	
		console.log(e)
	}

});
//用户登录(验证码)
router.post("/dynamicLogin",async (req,res)=>{
	
	const { phone,verifyCode,channel} = req.body
	
	try{
		//1.判断验证码
		const verify = await VerifyModel.findOne({phone:phone,codeType:'10'})
		if(verify.code != verifyCode){
			res.json({
				code:1,
				message:'手机号和短信验证码错误'
			})		
			return;		
		}
		
		let isAdmin = false

		const user = await UserModel.findOne({phone:phone,isAdmin:isAdmin})
		
		if(user){
			if(user.isActive == '0'){
				res.json({
				 	code:1,
				 	message:"用户名已经被锁定",
				 	data:{
				 		username:user.username
				 	}
				})
				return;
			}
			if(channels.app = channel){
				//生成token
				const token = hmac(Date.now().toString() + parseInt(Math.random()*10000))
				//插入token 返回token
				await new TokenModel({
					user:user._id,
					token:token
				}).save()

				//创建token成功 返回token
				res.json({
					code:0,
					data:{
						username:user.username,
						token:token,
						avatar:user.avatar
					}
				})
			}else{
				req.session.userInfo = {
					_id:user._id,
					username:user.username,
					isAdmin:isAdmin
				}
				res.json({
					code:0,
					data:{
						username:user.username
					}
				});
			}
		}else{
			res.json({
			 	code:1,
			 	message:"用户名和密码错误",
			 })
		}		
	}catch(e){
		res.json({
		 	code:1,
		 	message:"服务端错误",
		})
		console.log(e)	
	}
})

//用户退出
router.get('/logout',(req,res)=>{
	const {channel} = req.query
	//app端
	if(channels.app = channel){
		TokenModel.deleteMany({token:req.userInfo.token})
		.then(raw=>{
			res.json({
				code:0,
			})	
		})
	}else{
		req.session.destroy();
		res.json({
			code:0,
		})		
	}

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

function getWxOpenId(code){
	return new Promise((resolve,reject)=>{
		const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa1a92684b94828a5&secret=e9f5a1ee08c77a76fffbaaed10ebb548&js_code='+code+'&grant_type=authorization_code'
		https.get(url,(res)=>{
			let body = ''
			res.on('data',(chunk)=>{
				body += chunk
			})
			res.on('end',()=>{
				try{
					resolve(JSON.parse(body).openid)
				}catch(e){
					reject(e)
				}
			})
			res.on('error',e=>{
				reject(e)
			})
		})
	})
}
//微信用户登录
router.post("/wxlogin",(req,res)=>{
	const { code } = req.body
	//1.用code换取openid
	getWxOpenId(code)
	.then(openid=>{
		UserModel
		.findOne({wxopenid:openid})
		.then(user=>{
			const token = hmac(Date.now().toString() + parseInt(Math.random()*10000))
			if(user){
				//用户存在
				//更新token 返回token
				UserModel
				.update({_id:user._id},{token:token})
				.then(user=>{
					res.json({
					 	code:0,
					 	data:token
					})					
				})				
			}else{
				//用户不存在
				//创建用户 插入token 返回token
				new UserModel({
					wxopenid:openid,
					token:token
				})
				.save()
				.then(user=>{
					//创建用户成功
					res.json({
					 	code:0,
					 	data:token
					})
				})				
			}
		})	
	})
})
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
router.get("/info",(req,res)=>{
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
//修改密码
router.put("/pwd",(req,res)=>{
	const {password}  = req.body;
	UserModel
	.update({_id:req.userInfo._id},{password:hmac(password)})
	.then(user=>{
		if(user){
			res.json({
				code:0,
				message:'更新成功'
			})			
		}else{
			res.json({
				code:1,
				message:'更新失败'
			})							
		}
	})
})
//修改用户名
router.put("/username",(req,res)=>{
	const {username}  = req.body;
	UserModel
	.findOne({username:username})
	.then(user=>{
		if(user){
			res.json({
				code:1,
				message:'用户名已存在'
			})			
		}else{
			UserModel
			.update({_id:req.userInfo._id},{username:username})
			.then(user=>{
				if(user){
					res.json({
						code:0,
						message:'更新成功'
					})			
				}else{
					res.json({
						code:1,
						message:'更新失败'
					})							
				}
			})
		}
	})
})
//修改邮箱
router.put("/email",(req,res)=>{
	const {email}  = req.body;
	UserModel
	.update({_id:req.userInfo._id},{email:email})
	.then(user=>{
		if(user){
			res.json({
				code:0,
				message:'更新成功'
			})			
		}else{
			res.json({
				code:1,
				message:'更新失败'
			})							
		}
	})
})
//上传图像
router.post("/avatar",upload.single('avatar'),(req,res)=>{
	const filePath = UPLOAD_HOST + '/avatar/'+req.file.filename;
	UserModel.update({_id:req.userInfo._id},{avatar:filePath})
	.then(raw=>{
		res.json({
			code:0,
			data:filePath,
			message:'更新成功'
		})			
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'更新失败'
		})
	})	
})

//管理员权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.json({
			code:10
		});
	}
})

//获取用户列表
router.get('/list',(req,res)=>{
	UserModel
	.getPaginationUsers(req.query.page)
	.then((result)=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				list:result.list
			}
		})	
	})	
})
//修改用户状态
router.put("/isActive",(req,res)=>{
	const {id,isActive,page}  = req.body;
	UserModel
	.update({_id:id},{isActive:isActive})
	.then((user)=>{
		if(user){
			UserModel
			.getPaginationUsers(page)
			.then((result)=>{
				res.json({
					code:0,
					message:'更新成功',
					data:{
						current:result.current,
						total:result.total,
						pageSize:result.pageSize,
						list:result.list
					}
				})	
			})								
		}else{
			res.json({
				code:1,
				message:'更新失败'
			})							
		}
	})
})

module.exports = router;