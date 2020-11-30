/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2020-02-22 13:09:17
*/
const Router = require('express').Router;
const CategoryModel = require('../../models/category.js');
const ProductModel = require('../../models/product.js');
const pagination = require('../../util/pagination.js');
const {unlimitedForLevel,getChildsId} = require('../../util/unlimitedCategory.js');

const router = Router();

async function getFloor(limit){
	//1.获取:显示并且是楼层的一级分类
	const categories = await CategoryModel.find({level:1,isShow:1,isFloor:1},"-createdAt -updatedAt -__v -mobileName -pid")
	//2.根据获取的一级分类找到所有的子分类
	const showCategories = await CategoryModel.find({isShow:1},"-createdAt -updatedAt -__v")
	/*
		{
			title:'F1 家用电器',
			id:
			products:[

			]
		},

	 */
	const promises = categories.map(category=>{
		const ids = getChildsId(showCategories,category._id)
		ids.push(category._id)
		return ProductModel.find({category:{$in:ids},isShow:1},"-createdAt -updatedAt -__v -images -description -detail")
		.populate({path: 'attrs',select:'_id key value',populate: { path: 'attrs' }})
		.limit(limit)
		.then(products=>{
			return {
				title:category.name,
				id:category._id,
				products:products,
				order:category.order
			}
		})
	})
	const allFloors = await Promise.all(promises)

	const sortFloors = allFloors.sort((f1,f2)=>f2.order-f1.order)

	return sortFloors.map((floor,index)=>{
		floor.num = index + 1
		return floor
	})
}


//获取分类数组数据
router.get("/",(req,res)=>{
	const limit = parseInt(req.query.limit || 10)
	getFloor(limit)
	.then(floors=>{
		res.json({
			code:0,
			data:floors
		})
	})
	.catch(e=>{
		console.log(e)
 		res.json({
 			code:1,
 			message:"获取分类失败,服务器端错误"
 		})		
	})	
});
module.exports = router;