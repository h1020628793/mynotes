// /routes/homes.js
const express = require('express')
const router = express.Router()

const Comment = require('../models/comment')
const User = require('../models/user')
const hmac = require('../utils/hmac')
//权限的验证
router.use((req, res, next) => {
    if (req.userInfo._id) {
        next()
    } else {
        return res.send('<h1>请登录</h1>')
    }
})

//显示普通用户后台首页
router.get("/", async (req, res) => {
    res.render('home/index', {
        userInfo: req.userInfo
    })
})
//渲染评论列表
router.get('/comments', async (req, res) => {
    const result = await Comment.findPaginationComments(req,{user:req.userInfo._id})
    res.render('home/comment_list', {
        userInfo: req.userInfo,
        comments: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,
        url: '/homes/comments'
    })
})
//删除评论
router.get('/comments/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await Comment.deleteOne({ _id: id, user:req.userInfo._id })
        if (result.deletedCount == 0){
            res.render('home/error', {
                userInfo: req.userInfo,
                message: '你无法删除该条评论',
                nextUrl: '/homes/comments'
            })
        }else{
            res.render('home/success', {
                userInfo: req.userInfo,
                message: '删除评论成功',
                nextUrl: '/homes/comments'
            })
        }
    } catch (e) {
        res.render('home/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/homes/comments'
        })
    }
})
//显示修改密码页面
router.get("/password", async (req, res) => {
    res.render('home/password', {
        userInfo: req.userInfo,
    })
})
//处理修改密码
router.post("/password", async (req, res) => {
    const { password } = req.body
    try {
        //修改密码
        await User.updateOne({ _id: req.userInfo._id }, { password: hmac(password) })
        //退出登录
        req.session.destroy()
        res.render('home/success', {
            userInfo: req.userInfo,
            message: '修改密码成功,请重新登录',
            nextUrl: '/'
        })
    } catch (e) {
        res.render('home/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/homes/password'
        })
    }
})
module.exports = router