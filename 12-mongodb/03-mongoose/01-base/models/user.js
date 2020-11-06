const mongoose = require('mongoose')

//1.生成一个Schema,Schema主要是用来定义文档的结构,字段类型以及验证
const userSchema = new mongoose.Schema({
    name: String,
    address:{
        type:String,
        default:'BJ China',
        maxlength:[20,"地址最大为20个字符"],
        minlength:5
    },
    age: {
        type:Number,
        required:true
    },
    score: {
        type:Number,
        min:0,
        max:100
    },
    major:{
        type:String,
        enum:['Art','Sport','Computer']
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    isActive:{
        type:Boolean,
        default:true
    },
    friends:{
        type:Array,
        default:[]
    },
    phone:{
        type:String,
        //自定义验证手机号码格式
        validate:{
            validator:function(v){
                return /1[358]\d{9}/.test(v)
            },
            message: '{VALUE} 不是合法电话号码'
        }
    }
})
//自定义实例方法,注意不要用箭头函数
userSchema.methods.findMyBlogs = function(){
    // this是 User Model的一个实例
    // 在Model的原型上有Model.prototype.model()方法,该方法根据模型名称返回一个指定的Model 
    return this.model('article').find({ author: this._id },"-__v")
}
//自定义静态方法,注意不要用箭头函数
userSchema.statics.findByPhone = function(val){
    // this是 User Model
    return this.findOne({phone:val})
}

//2.根据Schema生成一个模型,模型是一个构造函数
//2.1 model方法第一个参数指定集合名称,mongoose会默认转换为复数
//2.2 model方法第二个参数指定Schema
const User = mongoose.model('user', userSchema)

module.exports = User