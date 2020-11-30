/*
* @Author: TomChen
* @Date:   2018-08-04 17:14:00
* @Last Modified by:   Tom
* @Last Modified time: 2020-03-02 15:26:40
*/
const mongoose = require('mongoose');
const ProductModel = require('./product.js');
const pagination = require('../util/pagination.js');

const CartItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    attr:{
      type:String
    },    
    count:{
        type:Number,
        default:1
    },
    totalPrice:{
        type:Number,
        default:0
    },
    checked:{
        type:Boolean,
        default:true
    }
});

const CartSchema = new mongoose.Schema({
  cartList:{
    type:[CartItemSchema]
  },
  allChecked:{
    type:Boolean,
    default:true
  },
  totalCartPrice:{
    type:Number,
    default:0
  }
})
const ShippingSchema = new mongoose.Schema({
    name:{
        type:String
    },
    province:{
        type:String
    },
    city:{
        type:String
    },
    county:{
        type:String
    },
    areaCode:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    zip:{
        type:String
    },
    isDefault:{
        type:Boolean,
        default:false
    }
})
const UserSchema = new mongoose.Schema({
  username:{
  	type:String
  },
  password:{
  	type:String
  },
  isAdmin:{
  	type:Boolean,
  	default:false//默认是普通用户
  },
  avatar:{
    type:String,
  },
  isActive:{
      type: String,
      default: '1' //是否是有效用户 0-不是 1-是
  },  
  email:{
    type:String
  },
  phone:{
    type:String
  },
  wxopenid:{
    type:String //微信openid
  },
  token:{
    type:String //微信登录凭证
  },
  cart:{
    type:CartSchema
  },
  shipping:{
    type:[ShippingSchema],
    default:[]
  }
},{
  timestamps:true
});
//获取用户列表
UserSchema.statics.getPaginationUsers = function(page,query={},projection='-password -__v -updatedAt',sort={_id:-1}){
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
//获取当前用户的购物车
UserSchema.methods.getCart = function(){
    return new Promise((resolve,reject)=>{
        //如果没有购物车信息返回空对象
        if(!this.cart){
            resolve({
                cartList:[]
            });
        }
        //获取购物车项目的promise
        let getCartItems = this.cart.cartList.map(cartItem=>{
                return  ProductModel
                        .findById(cartItem.product,"name price stock mainImage _id")
                        .then(product=>{
                            if(product){
                              cartItem.product = product;
                              cartItem.totalPrice = product.price * cartItem.count
                              cartItem.checked = cartItem
                              return cartItem                              
                            }else{
                              return {}
                            }
                        })
        })
        
        Promise.all(getCartItems)
        .then(cartItems=>{
            
            //计算总价格
            let totalCartPrice = 0;
            cartItems.forEach(item=>{
                if(item && item.checked){
                    totalCartPrice += item.totalPrice
                }
            })
            this.cart.totalCartPrice = totalCartPrice;

            //设置新的购物车列表
            this.cart.cartList = cartItems.filter(v=>v.totalPrice>0)
            
            //判断是否有没有选中的项目
            let hasNotCheckedItem = cartItems.find((item)=>{
                return item.checked == false;
            })

            if(hasNotCheckedItem){
                this.cart.allChecked = false;
            }else{
                this.cart.allChecked = true;
            }

            resolve(this.cart);
        })

    });
}
//获取当前用户的订单商品列表
UserSchema.methods.getOrderProductList = function(){
    return new Promise((resolve,reject)=>{
        //如果没有购物车信息返回空对象
        if(!this.cart){
            resolve({
                cartList:[]
            });
        }
        let checkedCartList = this.cart.cartList.filter(cartItem=>{
          return cartItem.checked;
        })
        //获取购物车项目的promise
        let getCartItems = checkedCartList.map(cartItem=>{
            return  ProductModel
                    .findById(cartItem.product,"name price stock mainImage _id")
                    .then(product=>{
                        cartItem.product = product;
                        cartItem.totalPrice = product.price * cartItem.count
                        return cartItem
                    })
        })
        
        Promise.all(getCartItems)
        .then(cartItems=>{
            
            //计算总价格
            let totalCartPrice = 0;
            cartItems.forEach(item=>{
                if(item.checked){
                    totalCartPrice += item.totalPrice
                }
            })
            this.cart.totalCartPrice = totalCartPrice;

            //设置新的购物车列表
            this.cart.cartList = cartItems;
            
            resolve(this.cart);
        })

    });
}
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;