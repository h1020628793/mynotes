/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2020-02-22 13:08:51
*/
const Router = require('express').Router;
const CategoryModel = require('../../models/category.js');
const pagination = require('../../util/pagination.js');
const {unlimitedForLevel,unlimitedForTree} = require('../../util/unlimitedCategory.js');

const {UPLOAD_HOST} = require("../../config")

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/category-icons/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const router = Router();

//获取分类数组数据
router.get("/arrayCategories",(req,res)=>{
	const limit = parseInt(req.query.limit || 10)
	CategoryModel.find({level:1,isShow:1},"-createdAt -updatedAt -__v -pid")
	.limit(limit)
	.sort({order:-1,_id:-1})
	.then((categories)=>{
		res.json({
			code:0,
			data:categories
		})	
	})
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})	
});
//获取子分类数组数据
router.get("/childArrayCategories",(req,res)=>{
	const limit = parseInt(req.query.limit || 10)
	const pid = req.query.pid || 0
	CategoryModel.find({pid:pid,isShow:1},"-createdAt -updatedAt -__v -pid")
	.limit(limit)
	.sort({order:-1,_id:-1})
	.then((categories)=>{
		res.json({
			code:0,
			data:categories
		})	
	})
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})	
});
//获取分类树形数据
router.get("/treeCategories",(req,res)=>{
	CategoryModel.find({isShow:1},"-createdAt -updatedAt -__v -mobileName")
	.sort({order:-1,_id:-1})
	.then((categories)=>{
		res.json({
			code:0,
			data:unlimitedForTree(categories)
		})		
	})
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})	
});
//权限控制
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send({
			code:10
		});
	}
})
/**
 * [getLevel 根据父类id计算等级]
 * @param  {[type]} pid [description]
 * @return {[type]}     [description]
 */
async function getLevel(pid){
	let level = 1;
	if(pid != 0){
		level = await CategoryModel.findById(pid)
			.then(cate3=>{
				//最多支持3级分类
				if(cate3.level < 3){
					return cate3.level + 1;
				}else{
					throw new Error("最多支持三级分类")
				}
			})
	}
	return level;	
}

//获取分类分页数据
router.get("/list",(req,res)=>{
	let page = req.query.page || 1;
	CategoryModel
	.getPaginationCategories(page)
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
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})		
});

router.get('/detail',(req,res)=>{
	let query = {
		_id:req.query.id
	}
	CategoryModel
	.findOne(query,"-__v -createdAt -updatedAt")
	.then(category=>{
		res.json({
			code:0,
			data:category
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取分类详情失败'
		})
	})
})


//处理分类图片
router.post("/icons",upload.single('file'),(req,res)=>{
	const filePath = UPLOAD_HOST + '/category-icons/'+req.file.filename;
	res.send({
    	"name": req.file.originalname,
    	"status": "done",
    	"url": filePath,
    	"thumbUrl": filePath
	});
	
})

//添加分类
router.post("/",(req,res)=>{
	const {mobileName,name,pid,icon} = req.body
	CategoryModel
	.findOne({name:name,pid:pid})
	.then((cate)=>{
		if(cate){
	 		res.json({
	 			code:1,
	 			message:"添加分类失败,分类已存在"
	 		})
		}else{
			CategoryModel
			.findOne({mobileName:mobileName,pid:pid})
			.then(cate2=>{
				if(cate2){
			 		res.json({
			 			code:1,
			 			message:"添加分类失败,手机分类已存在"
			 		})
			 	}else{
			 		getLevel(pid)
			 		.then(level=>{
						new CategoryModel({
							level:level,
							name:name,
							mobileName:mobileName,
							icon:icon,
							pid:pid
						})
						.save()
						.then((newCate)=>{
							//添加成功后返回新的分类
							if(newCate){
								CategoryModel.find({},"-createdAt -updatedAt -__v")
								.then((categories)=>{
									res.json({
										code:0,
										data:unlimitedForLevel(categories,'|--')
									})	
								})	
							}
						})
						.catch((e)=>{
					 		res.json({
					 			code:1,
					 			message:"添加分类失败,服务器端错误"
					 		})
						})
			 		})
			 		.catch(e=>{
				 		res.json({
				 			code:1,
				 			message:"添加分类失败,"+e.message
				 		})			 			
			 		})
			 	}				
			})
		}
	})
})

//修改分类
router.put("/",(req,res)=>{
	const {mobileName,name,pid,icon,id} = req.body
	CategoryModel
	.findOne({$and:[
		{name:name},
		{pid:pid},
		{_id:{$ne:id}}
	]})
	.then((cate)=>{
		if(cate){
	 		res.json({
	 			code:1,
	 			message:"修改分类失败,分类已存在"
	 		})
		}else{
			CategoryModel
			.findOne({$and:[
				{mobileName:mobileName},
				{pid:pid},
				{_id:{$ne:id}}
			]})
			.then(cate2=>{
				if(cate2){
			 		res.json({
			 			code:1,
			 			message:"修改分类失败,手机分类已存在"
			 		})
			 	}else{
			 		getLevel(pid)
			 		.then(level=>{
						CategoryModel.update({_id:id},{
							level:level,
							name:name,
							mobileName:mobileName,
							icon:icon,
							pid:pid							
						})
						.then((newCate)=>{
							//添加成功后返回新的分类
							if(newCate){
								CategoryModel.find({},"-createdAt -updatedAt -__v")
								.then((categories)=>{
									res.json({
										code:0,
										data:unlimitedForLevel(categories,'|--')
									})	
								})	
							}
						})
						.catch((e)=>{
					 		res.json({
					 			code:1,
					 			message:"修改分类失败,服务器端错误"
					 		})
						})
			 		})
			 		.catch(e=>{
				 		res.json({
				 			code:1,
				 			message:"修改分类失败,"+e.message
				 		})			 			
			 		})
			 	}				
			})
		}
	})
})
//获取分类数组数据
router.get("/levelCategories",(req,res)=>{
	const level = req.query.level || 2
	CategoryModel.find({},"-createdAt -updatedAt -__v")
	.then((categories)=>{
		res.json({
			code:0,
			data:unlimitedForLevel(categories,'|--',0,level)
		})	
	})
	.catch(e=>{
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})	
});

//更新名称
router.put("/name",(req,res)=>{
	const {name,id,page} = req.body
	CategoryModel
	.findOne({name:name})
	.then((cate)=>{
		if(cate){
	 		res.json({
	 			code:1,
	 			message:"更新分类失败,分类已存在"
	 		})
		}else{
			CategoryModel
			.update({_id:id},{name:name})
			.then((cate)=>{
				if(cate){
					CategoryModel
					.getPaginationCategories(page)
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
			 			message:"更新分类失败,数据操作失败"
			 		})					
				}
			})
			.catch((e)=>{
		 		res.json({
		 			code:1,
		 			message:"添加分类失败,服务器端错误"
		 		})
			})
		}
	})
})
//更新手机名称
router.put("/mobileName",(req,res)=>{
	const {mobileName,id,page} = req.body
	CategoryModel
	.findOne({mobileName:mobileName})
	.then((cate)=>{
		if(cate){
	 		res.json({
	 			code:1,
	 			message:"更新分类失败,分类已存在"
	 		})
		}else{
			CategoryModel
			.update({_id:id},{mobileName:mobileName})
			.then((cate)=>{
				if(cate){
					CategoryModel
					.getPaginationCategories(page)
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
			 			message:"更新分类失败,数据操作失败"
			 		})					
				}
			})
			.catch((e)=>{
		 		res.json({
		 			code:1,
		 			message:"添加分类失败,服务器端错误"
		 		})
			})
		}
	})
})
//更新排序
router.put("/order",(req,res)=>{
	const {order,id,page} = req.body
	CategoryModel
	.update({_id:id},{order:order})
	.then((cate)=>{
		if(cate){
			CategoryModel
			.getPaginationCategories(page)
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
//更新显示
router.put("/isShow",(req,res)=>{
	const {isShow,id,page} = req.body
	CategoryModel
	.update({_id:id},{isShow:isShow})
	.then((cate)=>{
		if(cate){
			CategoryModel
			.getPaginationCategories(page)
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
	 			message:"更新显示失败,数据操作失败"
	 		})					
		}
	})
})
//更新是否楼层
router.put("/isFloor",(req,res)=>{
	const {isFloor,id,page} = req.body
	CategoryModel
	.update({_id:id},{isFloor:isFloor})
	.then((cate)=>{
		if(cate){
			CategoryModel
			.getPaginationCategories(page)
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
	 			message:"更新是否楼层失败,数据操作失败"
	 		})					
		}
	})
})
module.exports = router;