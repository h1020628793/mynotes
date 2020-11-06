const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true, useUnifiedTopology: true  })

const db = mongoose.connection

db.on('error',()=>{
    throw new Error('DB error')
})
//连接DB
db.once('open',async ()=>{
    console.log('DB connected');
    //1.生成一个Schema,Schema主要是用来定义文档的结构,字段类型已经验证
    const userSchema = new mongoose.Schema({
        name:String,
        age:Number,
        score:Number
    })
    //2.根据Schema生成一个模型,模型是一个构造函数
    //2.1 model方法第一个参数指定集合名称,mongoose会默认转换为复数
    //2.2 model方法第二个参数指定Schema
    const User = mongoose.model('user', userSchema)

    //3.使用模型或者模型对象进行文档的操作
    try{
        //3.1增加(Create)文档
        /*
        const user = new User({
            name: 'Tom',
            age: 18,
            score: 100
        })
        const result = await user.save()
        */

        //3.2查询(Read)文档
        /*
        const result = await User.find({})
        */

        //3.3更新(Update)文档
        /*
        const result = await User.updateOne({score:{$gt:10}},{age:39})
        */

       //3.4删除(Delete)文档
        const result = await User.deleteOne({ score: { $gt: 10 } })


        console.log(result);      
    }catch(e){
        console.log(e);
    }
})