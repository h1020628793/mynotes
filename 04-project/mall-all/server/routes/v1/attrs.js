/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2020-02-22 13:08:06
*/
const Router = require('express').Router;
const AttrModel = require('../../models/attr.js');

const router = Router();

//管理员权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send({
			code:10
		});
	}
})

//获取属性列表
router.get('/list',(req,res)=>{
	const {page} = req.query
	let query = {};
	let projection = '-__v -createdAt -updatedAt';
	let sort={order:-1,_id:-1};
	AttrModel.getPaginationAttrs(page,query,projection,sort)
	.then(result=>{
		res.json({
			code:0,
			data:{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				list:result.list,
			}
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取属性列表失败'
		})
	})
})
router.get('/allAttrs',(req,res)=>{
	AttrModel
	.find()
	.then(attrs=>{
		res.json({
			code:0,
			data:attrs
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取属性列表失败'
		})
	})	
})
//获取属性详细信息
router.get('/detail',(req,res)=>{
	let query = {
		_id:req.query.id
	}
	AttrModel
	.findOne(query,"-__v -createdAt -updatedAt")
	.then(attr=>{
		res.json({
			code:0,
			data:attr
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取属性详情失败'
		})
	})
})

//添加属性
router.post("/",(req,res)=>{
	const {name,key,value}  = req.body;
	new AttrModel({
		name:name,
		key:key,
		value:value,
	})
	.save()
	.then((attr)=>{
		if(attr){
			res.json({
				code:0,
				message:'新增属性成功'
			})
		}
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"新增属性失败,服务器端错误"
 		})
	})
})

//编辑属性
router.put("/",(req,res)=>{
	const {id,name,key,value}  = req.body;
	const update = {
		name:name,
		key:key,
		value:value,
	}
	AttrModel
	.update({_id:id},update)
	.then((raw)=>{
		res.json({
			code:0,
			message:'更新属性成功'
		})
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"更新属性失败,服务器端错误"
 		})
	})
})

//更新排序
router.put("/order",(req,res)=>{
	const {order,id,page}  = req.body
	AttrModel
	.update({_id:id},{order:order})
	.then((attr)=>{
		if(attr){
			AttrModel
			.getPaginationAttrs(page,{})
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
		}else{
	 		res.json({
	 			code:1,
	 			message:"更新排序失败,数据操作失败"
	 		})					
		}
	})
})

module.exports = router;