const { MongoClient } = require("mongodb")

const uri = 'mongodb://127.0.0.1'

const client = new MongoClient(uri, { useUnifiedTopology: true })

const dbName = 'shop'

async function run() {
    try {
        //建立和数据库的连接
        await client.connect()
        //创建或者获取DB,如果数据库中有该DB则直接返回对应的DB对象,如果没有则创建一个新的DB然后返回对应的DB对象
        const database = client.db(dbName)
        //创建或者获取集合,如果该数据库中有该集合则直接返回对应的对象,如果没有则创建一个新的集合然后返回对应的集合对象
        const collection = database.collection('users')

        //删除单个文档
        //const resultOne = await collection.deleteOne({ score: { $gt: 10 } })
        //console.log(resultOne);

        //删除多个文档
        const resultMany = await collection.deleteMany({ score: { $gt: 10 } })
        console.log(resultMany);

    } finally {
        //关闭连接
        await client.close()
    }
}
run()
.catch(e => {
    console.log('db error:', e);
})