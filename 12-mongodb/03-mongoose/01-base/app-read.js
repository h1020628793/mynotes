const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection


const getRandom = (min, max) => {
    return Math.round(min + (max - min) * Math.random())
}

const nameList = ['Amy', 'Peter', 'Mike', 'Leo', 'Lucy', 'Tom', 'Andy', 'Edum', 'Jack']

const getName = ()=> nameList[getRandom(0,nameList.length-1)]

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
    try {
        const arr = []
        for(let i = 0;i<100;i++){
            arr.push({
                name: getName(),
                age:getRandom(1,130),
                score:getRandom(0,100)
            })
        }
        const result = await User.insertMany(arr)
        console.log(result)
    } catch (e) {
        console.log(e);
    }
})