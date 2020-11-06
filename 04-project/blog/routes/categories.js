// /routes/categories.js
const express = require('express')
const router = express.Router()

const Category = require('../models/category')
const pagination = require('../utils/pagination')

//权限的验证
router.use((req, res, next) => {
    if (req.userInfo.isAdmin) {
        next()
    } else {
        return res.send('<h1>请用管理员账号登录</h1>')
    }
})

//显示分类列表
router.get("/", async (req, res) => {
    const options = {
        page: req.query.page,
        projection: '-__v',
        sort:{order:1},
        model: Category
    }

    const result = await pagination(options)

    res.render('admin/category_list', {
        userInfo: req.userInfo,
        categories: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,
        url: '/categories'
    })
})

//显示添加分类
router.get("/add", async (req, res) => {
    /*
    res.render('admin/category_add', {
        userInfo: req.userInfo
    })
    */
    res.render('admin/category_add_edit', {
        userInfo: req.userInfo
    })    
})
//处理添加分类
router.post("/add", async (req, res) => {
    //获取参数
    let { name,order } = req.body
    if(!order){
        order = 0
    }
    try{
        //判断是否有同名的分类
        const category = await Category.findOne({name})
        if (category){
            //返回一个错误页面
            res.render('admin/error', {
                userInfo: req.userInfo,
                message:'已经有了同名的分类',
                nextUrl:'/categories'
            })
        }else{
            //插入操作
            await Category.insertMany({name,order})
            //返回一个成功页码
            res.render('admin/success', {
                userInfo: req.userInfo,
                message: '添加分类成功',
                nextUrl: '/categories'
            })
        }
    }catch(e){
        //返回一个错误页面
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/categories'
        })
    }
})
//显示编辑分类
router.get("/edit/:id", async (req, res) => {
    const { id } = req.params
    const category = await Category.findOne({_id:id},"-__v")
    /*
    res.render('admin/category_edit', {
        userInfo: req.userInfo,
        category
    })
    */
    res.render('admin/category_add_edit', {
        userInfo: req.userInfo,
        category
    })   
})
//处理编辑分类
router.post("/edit", async (req, res) => {
    const { name,order,id } = req.body
    try{
        //判断是否有更新
        const category1 = await Category.findOne({ _id: id }, "-__v")
        if (category1.name == name && category1.order == order) {
            return res.render('admin/error', {
                userInfo: req.userInfo,
                message: '请求修改内容后台再提交',
                nextUrl: '/categories'
            })
        }
        //判断更新后的名称是否存在
        const category2 = await Category.findOne({ name: name, _id: { $ne: id } })
        if (category2) {
            return res.render('admin/error', {
                userInfo: req.userInfo,
                message: '该分类名称已经存在',
                nextUrl: '/categories'
            })
        }
        //更新
        await Category.updateOne({ _id: id }, { name, order })
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改分类成功',
            nextUrl: '/categories'
        })
    }catch(e){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/categories'
        })
    }
})
//处理删除请求
router.get("/delete/:id", async (req, res) => {
    const { id } = req.params
    try{
        await Category.deleteOne({ _id: id })
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除分类成功',
            nextUrl: '/categories'
        })
    }catch(e){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/categories'
        })
    }
})
module.exports = router