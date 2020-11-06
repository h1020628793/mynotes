const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'//关联查询时必须指定关联的模型
    }
})
//静态方法
articleSchema.statics.findArticles = function (query) {
    return this.find(query).populate('author', 'name -_id')
}

const Article = mongoose.model('article', articleSchema)

module.exports = Article