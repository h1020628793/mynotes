/*
包含n个操作数据库集合数据的Model模块
/*
1.连接数据库{
    1.1引入mongoose
    1.2连接指定数据库（URL只有数据库是变化的）
    1.3获取连接对象
    1.4绑定连接完成的监听（用来提示连接成功）
2.定义出对应特点集合的Model并向外暴露
    2.1定义Schema（描述文档的结构）
    2.2定义Model(与集合对应，可以操作集合)
    2.3向外暴露Model
}
*/
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gzhipin')
const connection = mongoose.connection
connection.on('connected',() => {
    console.log('db connect success');
})

// 2
const userSchema = mongoose.Schema({
    username:{type:String,require:true},//用户名
    password:{type:String,require:true},//密码
    type:{type:String,require:true},
    header:{type:String},//头像名称
    post:{type:String},//职位
    info:{type:String},//个人或职位简介
    company:{type:String},//公司名称
    salary:{type:String} //工资
})

const UserModel = mongoose.model('user',userSchema)

exports.UserModel = UserModel
// module.exports = xxx 全部暴露

