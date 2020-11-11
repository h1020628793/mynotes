// /routes/articles.js
const express = require('express')
const router = express.Router()

const Comment = require('../models/comment')

//权限的验证
router.use((req, res, next) => {
    if (req.userInfo._id) {
        next()
    } else {
        return res.send('<h1>请登录</h1>')
    }
})

//新增评论
router.post("/", async (req, res) => {
    const { article, content } = req.body
    const user = req.userInfo._id
    try {
        await Comment.insertMany({
            content,
            article,
            user,  
        })
        //获取最新评论
        const result = await Comment.findPaginationComments(req, { article: article })
        res.json({
            code:0,
            message:'新增评论成功',
            data: result
        })
    } catch (e) {
        res.json({
            code: 1,
            message: '新增评论失败'
        })
    }
})

module.exports = router