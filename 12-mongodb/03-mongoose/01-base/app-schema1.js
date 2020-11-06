const mongoose = require('mongoose')
const moment = require('moment')
//引入模型
const User = require('./models/user')
const Article = require('./models/article')

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    throw new Error('DB error')
})
//连接DB
db.once('open', async () => {
    console.log('DB connected');
    try {

        //已知文章的ID,需要显示文章的内容和作者的信息

        //方法一:多个集合关联查询
        /*
        const article = await Article.findById('5f98b314885f1d03e84ba9c0')
        const user = await User.findById(article.author)
        const result = {
            _id:article._id,
            title:article.title,
            content:article.content,
            author:user
        }
        console.log(result)
        */

        //方法二:使用populate关联查询
        /*
        const result = await Article.findById('5f98b314885f1d03e84ba9c0').populate('author','name -_id')
        console.log(result)
        */

        //方法三:把populate关联查询的方法封装成一个静态方法
        const articles = await Article.findArticles({ _id: '5f98b314885f1d03e84ba9c0'})
        console.log(articles)
        
    } catch (e) {
        console.log(e);
    }
})