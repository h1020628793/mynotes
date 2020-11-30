/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   Tom
* @Last Modified time: 2020-02-24 18:55:29
*/
const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    //登陆用户
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //凭证
    token:{
    	type:String
    },
    createdAt: {
      type: Date,
      default:Date.now,
      expires:604800,//7天后删除
    }     
});

TokenSchema.statics.getUserByToken = function(token){
  return this.findOne({token:token}).populate('user',"_id username isAdmin")
}

const TokenModel = mongoose.model('Token', TokenSchema);

module.exports = TokenModel;