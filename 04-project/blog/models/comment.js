// /models/comment.js
const mongoose = require('mongoose')
const moment = require('moment')

const pagination = require('../utils/pagination')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
//定义虚拟字段
commentSchema.virtual('createdTime').get(function () {
    return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
})

//静态方法
commentSchema.statics.findPaginationComments = function (req, query) {
    const options = {
        page: req.query.page,
        projection: '-__v',
        model: this,
        query: query,
        populates: [{ path: 'user', select: 'username' }, { path: 'article', select: 'title' }]
    }
    return pagination(options)
}

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment