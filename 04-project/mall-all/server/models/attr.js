/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   Tom
* @Last Modified time: 2019-10-22 10:27:33
*/
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js');

const AttrSchema = new mongoose.Schema({
  name:{
  	type:String
  },
  key:{
    type:String
  },  
  value:{
    type:String
  },
  order:{
    type:Number,
    default:0
  },   
},{
  timestamps:true
});
AttrSchema.statics.getPaginationAttrs = function(page,query={},projection='-__v -createdAt -updatedAt',sort={order:-1}){
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

const AttrModel = mongoose.model('Attr', AttrSchema);

module.exports = AttrModel;