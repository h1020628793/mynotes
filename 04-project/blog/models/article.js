// /models/article.js
const mongoose = require('mongoose')
const moment = require('moment')

const pagination = require('../utils/pagination')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        default: ''
    },
    content:{
        type: String,
        default: ''       
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    click:{
        type:Number,
        default:0
    }
})
//定义虚拟字段
articleSchema.virtual('createdTime').get(function(){
    // return new Date(this.createdAt).toLocaleString()
    return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
})

//静态方法
articleSchema.statics.findPaginationArticles = async function (req,query) {
    const options = {
        page: req.query.page,
        projection: '-__v',
        model: this,
        query:query,
        populates: [{ path: 'user', select: 'username' }, { path: 'category', select: 'name' }]
    }
    const result = await pagination(options)
    //格式化时间,解决ajax请求格式化的时间获取不到的问题
    const docs = result.docs.map(item => {
        const obj = JSON.parse(JSON.stringify(item))
        obj.createdTime = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        return obj
    })
    result.docs = docs
    return result
}

const Article = mongoose.model('article', articleSchema)

module.exports = Article