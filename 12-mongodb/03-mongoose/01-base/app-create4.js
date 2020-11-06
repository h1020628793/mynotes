const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    throw new Error('DB error')
})
//连接DB
db.once('open', async () => {
    console.log('DB connected');
    //1.生成一个Schema,Schema主要是用来定义文档的结构,字段类型已经验证
    const userSchema = new mongoose.Schema({
        name: String,
        age: Number,
        score: Number
    })
    //2.根据Schema生成一个模型,模型是一个构造函数
    //2.1 model方法第一个参数指定集合名称,mongoose会默认转换为复数
    //2.2 model方法第二个参数指定Schema
    const User = mongoose.model('user', userSchema)

    //3.使用模型或者模型对象进行文档的操作
    try{
        //3.1 Model.prototype.save()
        /*
        const user = new User({
            name: 'Leo',
            age: 18,
            score: 100
        })
        const result = await user.save()
        */


        //3.2 Model.insertMany()

        //3.2.1 Model.insertMany(array)
        /*
        const result = await User.insertMany([
            {
                name: 'Peter',
                age: 18,
                score: 100  
            },
            {
                name: 'Lucy',
                age: 18,
                score: 100
            }
        ])
        */
        //3.2.2 Model.insertMany(object)
        /*
        const result = await User.insertMany({name:'Andy',age:12,score:100})
        */

        //3.3 Model.create()

        //3.3.1 Model.create(array)
        /*
        const result = await User.create([
            {
                name: 'Peter',
                age: 18,
                score: 100
            },
            {
                name: 'Lucy',
                age: 18,
                score: 100
            }
        ])
        */
        //3.3.2 Model.create(object)
        const result = await User.create({ name: 'Andy', age: 12, score: 100 })
        console.log(result)
    }catch(e){
        console.log(e);
    }
})