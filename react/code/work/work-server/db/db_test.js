/*
测试使用mongoose操作mongodb数据库
1.连接数据库{
    1.1引入mongoose
    1.2连接指定数据库（URL只有数据库是变化的）
    1.3获取连接对象
    1.4绑定连接完成的监听（用来提示连接成功）
2.得到对应的特定集合的model
    2.1定义Schema（描述文档的结构）
    2.2定义Model(与集合对应，可以操作集合)
3.通过model或其实例对集合数据进行CRUD操作
    3.1通过model实例的save()方法添加数据
    3.2通过Model的find()方法或findOne()查询一个或多个
    3.3通过model的findByIdAndUpdate()更新某个数据
    3.4通过model的remove()方法删除匹配的数据
}
*/
//加密密码
const md5 = require('blueimp-md5')
//1.连接数据库
// 1.1引入mongoose
const mongoose = require('mongoose')
// 1.2连接指定数据库（URL只有数据库是变化的）gzhipin_test数据库的名字
mongoose.connect('mongodb://localhost:27017/gzhipin_test')
// 1.3获取连接对象
const connection = mongoose.connection
// 1.4绑定连接完成的监听（用来提示连接成功）
connection.on('connected', function(){
    console.log('数据库连接成功');
})

// 2.得到对应的特定集合的model
//2.1定义Schema（描述文档的结构）文档是对象
const userSchema = mongoose.Schema({
    //指定文档的结构：属性名/属性值的类型，是否是必须的，默认值等等
    username:{type:String,require:true},//用户名
    password:{type:String,require:true},//密码
    type:{type:String,require:true}     //用户类型： dashen/laoban 
})
//2.2定义Model(与集合对应，可以操作集合)集合是数组
const UserModel = mongoose.model('user',userSchema)//UserModel是一个构造函数,集合名称为users

/*
3.通过model或其实例对集合数据进行CRUD操作
*/
// 3.1通过model实例的save()方法添加数据
    //首先要创建model实例

function testSave(){
    const userModel = new UserModel({username:'hhhh',password:md5('123'),type:'laoban'})
    //调用save()
    userModel.save(function(error,user){
        console.log('save',error,user);
    })
}
    // testSave()
// 3.2通过Model的find()方法或findOne()查询一个或多个

function testFind(){ 
    //得到是包含所有匹配文档对象的数组，没有匹配的就是空[]
    UserModel.find({_id:'5fd77551acd7860b04b2c67a'},function(error,users){
        console.log('find',error,users);
    })
   //得到是一个匹配的文档对象，没有匹配的就是null
    UserModel.findOne({_id: '5fd75d797c7e603048892ea4',function (error,user) {
        console.log('findOne',error,user);
    }})
}

// testFind()

// 3.3通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
    UserModel.findByIdAndDelete(
        {_id:'5fd75d797c7e603048892ea4'},
        {username:'jack'},
        function(error,oldUser){
            console.log('findByIdAndDelete',error,oldUser);
        }
    )
}
// testUpdate()
// 3.4通过Model的remove()方法删除匹配的数据 
function testDelete() {
    UserModel.remove({_id:'5fd75d797c7e603048892ea4'},function(error,doc){
        console.log('remove',error,doc);
    })
}
testDelete() 
