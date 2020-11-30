/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2020-02-26 12:02:30
*/
const Router = require('express').Router;
const ProductModel = require('../../models/product.js');
const CategoryModel = require('../../models/category.js');
const {unlimitedForLevel,getChildsId} = require('../../util/unlimitedCategory.js');
const {UPLOAD_HOST,channels} = require("../../config")

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	cb(null, 'public/product-images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const router = Router();

//pc端获取分页商品列表
async function getPaginationProducts(req){
	const {page,status,category,keyword,orderBy,isHot} = req.query
	let query = {};
	
	//如果是普通用户,只能获取上架的商品
	if(!req.userInfo.isAdmin){
		query.status = 1
	}	
	if(category){
		//获取所有显示的子分类id
		const showCategories = await CategoryModel.find({isShow:1},"-createdAt -updatedAt -__v")
		const ids = getChildsId(showCategories,category)
		ids.push(category)
		query.category = {$in:ids};
	}
	else if(keyword){
		query.name = {$regex:new RegExp(keyword,'i')}
	}

	if (isHot && isHot=='1'){
		query.isHot = isHot
	}

	let projection = 'name _id price status order isShow isHot mainImage payNums';

	let sort={order:-1,_id:-1};

	if(orderBy == 'all_asc'){
		sort={order:1,_id:1};
	}else if(orderBy == 'all_desc'){
		sort={order:-1,_id:-1};
	}else if(orderBy == 'price_asc'){
		sort = {price:1}
	}else if(orderBy == 'price_desc'){
		sort = {price:-1}
	}else if(orderBy == 'payNums_asc'){
		sort = {payNums:1}
	}else if(orderBy == 'payNums_desc'){
		sort = {price:-1}
	}

	const result = await ProductModel.getPaginationProducts(page,query,projection,sort)
	result.keyword = keyword
	return result
}

//移动端
async function getWapProductsList(req){
	const start = parseInt(req.query.start || 0)
	const limit = parseInt(req.query.limit || 20)
	const { category,keyword,orderBy,isHot } = req.query
	let query = {}
	if(category){
		//获取所有显示的子分类id
		const showCategories = await CategoryModel.find({isShow:1},"-createdAt -updatedAt -__v")
		const ids = getChildsId(showCategories,category)
		ids.push(category)
		query.category = {$in:ids};
	}
	else if(keyword){
		query.name = {$regex:new RegExp(keyword,'i')}
	}

	if (isHot && isHot=='1'){
		query.isHot = isHot
	}

	let sort={order:-1,_id:-1};

	if(orderBy == 'all_asc'){
		sort={order:1,_id:1};
	}else if(orderBy == 'all_desc'){
		sort={order:-1,_id:-1};
	}else if(orderBy == 'price_asc'){
		sort = {price:1}
	}else if(orderBy == 'price_desc'){
		sort = {price:-1}
	}else if(orderBy == 'payNums_asc'){
		sort = {payNums:1}
	}else if(orderBy == 'payNums_desc'){
		sort = {price:-1}
	}

	const result = await ProductModel.find(query)
	.populate({path: 'attrs',select:'_id key value',populate: { path: 'attrs' }})
	.sort(sort)
	.skip(start)
	.limit(limit)

	return result
}
//获取商品列表
router.get('/list',(req,res)=>{
	let channel = req.query.channel || channels.page
	
	if(channel == channels.page){//pc端获取列表
		getPaginationProducts(req)
		.then(result=>{
			res.json({
				code:0,
				data:{
					current:result.current,
					total:result.total,
					pageSize:result.pageSize,
					list:result.list,
					keyword:result.keyword					
				}
			})		
		})
		.catch(e=>{
			res.json({
				code:1,
				message:'获取商品列表失败'
			})
		})
	}
	else{//移动端获取列表
		getWapProductsList(req)
		.then(result=>{
			res.json({
				code:0,
				data:result
			})				
		})
		.catch(e=>{
			res.json({
				code:1,
				message:'获取商品列表失败'
			})
		})		
	}
})

//搜索商品
router.get('/search',(req,res)=>{
	const {keyword} = req.query
	const limit = parseInt(req.query.limit || 5)
	let query = {
		name:{$regex:new RegExp(keyword,'i')}
	}
	ProductModel
	.find(query, 'name')
	.limit(limit)
	.then(products=>{
		res.json({
			code:0,
			data:products
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取商品列表失败'
		})
	})	
})
//首页热门商品
router.get('/hot',(req,res)=>{
	const limit = parseInt(req.query.limit || 4)
	ProductModel
	.find({
		isHot:'1'
	})
	.limit(limit)
	.then(products=>{
		res.json({
			code:0,
			data:products
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取热门商品失败'
		})
	})	
})
//获取商品详细信息
router.get('/detail',(req,res)=>{
	let query = {
		_id:req.query.id
	}
	//如果是普通用户,只能获取上架的商品
	if(!req.userInfo.isAdmin){
		query.status = 1
	}
	ProductModel
	.findOne(query,"-__v -createdAt -updatedAt")
	.populate({path:'category',select:'_id name'})
	.populate({path: 'attrs',select:'_id key value',populate: { path: 'attrs' }})
	.then(product=>{
		res.json({
			code:0,
			data:product
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取商品详情失败'
		})
	})
})

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

//处理商品图片
router.post("/images",upload.single('file'),(req,res)=>{
	const filePath = UPLOAD_HOST + '/product-images/'+req.file.filename;
	res.send({
    	"name": req.file.originalname,
    	"status": "done",
    	"url": filePath,
    	"thumbUrl": filePath
	});
	
})

//处理商品详情图片
router.post("/detailImages",upload.single('upload'),(req,res)=>{
	const filePath = UPLOAD_HOST + '/product-images/'+req.file.filename;
	res.json({
		  "success": true,
		  "msg": "上传成功",
		  "file_path": filePath
	});
})

//添加商品
router.post("/",(req,res)=>{
	let body = req.body;
	let attrs = []
	if(body.attrs){
		attrs = body.attrs.split(',')
	}
	new ProductModel({
		name:body.name,
		category:body.category,
		detail:body.detail,
		description:body.description,
		mainImage:body.mainImage,
		images:body.images,
		price:body.price,
		stock:body.stock,
		payNums:body.payNums,
		attrs:attrs
	})
	.save()
	.then((product)=>{
		if(product){
			res.json({
				code:0,
				message:'新增商品成功'
			})
		}
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"新增商品失败,服务器端错误"
 		})
	})
})

//编辑商品
router.put("/",(req,res)=>{
	let body = req.body;
	let attrs = []
	if(body.attrs){
		attrs = body.attrs.split(',')
	}	
	let update = {
		name:body.name,
		category:body.category,
		detail:body.detail,
		description:body.description,
		mainImage:body.mainImage,
		images:body.images,
		price:body.price,
		stock:body.stock,
		payNums:body.payNums,
		attrs:attrs
	}
	ProductModel
	.update({_id:body.id},update)
	.then((raw)=>{
		res.json({
			code:0,
			message:'更新商品成功'
		})
	})
	.catch((e)=>{
 		res.json({
 			code:1,
 			message:"更新分类失败,服务器端错误"
 		})
	})
})

//更新排序
router.put("/order",(req,res)=>{
	const {order,id,page}  = req.body
	ProductModel
	.update({_id:id},{order:order})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(page,{})
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

//更新排序
router.put("/status",(req,res)=>{
	const {page,id,status}  = req.body;
	ProductModel
	.update({_id:id},{status:status})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(page,{})
			.then((result)=>{
				res.json({
					code:0,
					message:'更新状态成功',
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
				message:'更新状态失败'
			})							
		}
	})
})
router.put("/isShow",(req,res)=>{
	const {id,isShow,page}  = req.body;
	ProductModel
	.update({_id:id},{isShow:isShow})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(page,{})
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
router.put("/isHot",(req,res)=>{
	const{id,isHot,page}  = req.body;
	ProductModel
	.update({_id:id},{isHot:isHot})
	.then((product)=>{
		if(product){
			ProductModel
			.getPaginationProducts(page,{})
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