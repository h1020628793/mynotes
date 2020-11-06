const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
//定义虚拟字段
commentSchema.virtual('createdTime').get(function () {
    return new Date(this.createdAt).toLocaleString()
})
const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment