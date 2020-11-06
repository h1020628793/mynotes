const { MongoClient } = require("mongodb")

const uri = 'mongodb://127.0.0.1'

const client = new MongoClient(uri, { useUnifiedTopology: true } )

const dbName = 'shop'

async function run(){
    try{
        //建立和数据库的连接
        await client.connect()
        //创建或者获取DB,如果数据库中有该DB则直接返回对应的DB对象,如果没有则创建一个新的DB然后返回对应的DB对象
        const database = client.db(dbName)
        //创建或者获取集合,如果该数据库中有该集合则直接返回对应的对象,如果没有则创建一个新的集合然后返回对应的集合对象
        const collection = database.collection('users')
        //向集合插入数据
        const result = await collection.insertMany([{name:'Tom',age:18,score:100},{name:'Amy',age:88,score:19}])
        console.log(result);
    }finally{
        //关闭连接
        await client.close()
    }
}
run()
.catch(e=>{
    console.log('db error:',e);
})