/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-23 11:37:31
*/
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js');

const ProductSchema = new mongoose.Schema({
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
  }, 
  attrs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attr' }], 
  detail:{
  	type:String
  },
  description:{
    type:String
  },
  mainImage:{
    type:String
  },
  images:{
    type:String
  },
  price:{
    type:Number
  }, 
  stock:{
    type:Number
  },
  name:{
    type:String
  },
  status:{
    type:String,
    default:'0'//0-下架 1-上架
  },     
  order:{
  	type:Number,
    default:0
  },
  isShow:{
      type: String,
      default: '0' //是在首页显示 0-不是 1-是
  },
  isHot: {
      type: String,
      default: '0' //是否热卖 0-不是 1-是
  },
  payNums:{
    type:Number,
    default: '0' //支付人数 
  }  
},{
  timestamps:true
});

ProductSchema.statics.getPaginationProducts = function(page,query={},projection='name _id price status order isShow isHot payNums',sort={order:-1,_id:-1}){
    return new Promise((resolve,reject)=>{
      let options = {
        page: page,
        model:this, 
        query:query, 
        projection:projection,
        sort:sort, 
      }
      pagination(options)
      .then((data)=>{
        resolve(data); 
      })
    })
 }
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;