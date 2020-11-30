/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   Tom
* @Last Modified time: 2020-03-04 12:33:50
*/
const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
    //用户
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //收藏的商品
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Product'
    },    
},{
  timestamps:true
});

CollectionSchema.statics.getWapCollectProductByUserId = function(userId,start,limit){
  return this.find({user:userId})
  .populate('user',"_id username isAdmin")
  .populate('product',"_id name mainImage price")
  .skip(start)
  .limit(limit)
}

const CollectionModel = mongoose.model('Collection', CollectionSchema);

module.exports = CollectionModel;