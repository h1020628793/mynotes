// /routes/admins.js
const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Comment = require('../models/comment')
const pagination = require('../utils/pagination')
const hmac = require('../utils/hmac')

//权限的验证
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        return res.send('<h1>请用管理员账号登录</h1>')
    }
})

//显示管理员后台首页
router.get("/", async (req, res) => {
    //获取用户总算
    const userCount = await User.estimatedDocumentCount()

    res.render('admin/index', {
        userInfo: req.userInfo,
        userCount: userCount
    })
})

//渲染用户列表
router.get('/users',async(req,res)=>{   
    const options = {
        page:req.query.page,
        projection:'-password -__v',
        model:User
    }
    const result = await pagination(options)
    res.render('admin/user_list', {
        userInfo: req.userInfo,
        users: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,
        url: '/admins/users'
    }) 
})
//显示修改密码页面
router.get("/password", async (req, res) => {
    res.render('admin/password', {
        userInfo: req.userInfo,
    })
})
//处理修改密码
router.post("/password", async (req, res) => {
    const { password } = req.body
    try{
        //修改密码
        await User.updateOne({ _id: req.userInfo._id }, { password: hmac(password)})
        //退出登录
        req.session.destroy()
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改密码成功,请重新登录',
            nextUrl: '/'
        })
    }catch(e){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/admins/password'
        })
    }
})
//渲染评论列表
router.get('/comments', async (req, res) => {
    const result = await Comment.findPaginationComments(req)
    res.render('admin/comment_list', {
        userInfo: req.userInfo,
        comments: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,
        url: '/admins/comments'
    })
})
//删除评论
router.get('/comments/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Comment.deleteOne({ _id: id })
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除评论成功',
            nextUrl: '/admins/comments'
        })
    } catch (e) {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/admins/comments'
        })
    }
})
module.exports = router