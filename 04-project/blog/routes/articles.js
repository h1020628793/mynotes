// /routes/articles.js
const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const Article = require('../models/article')
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

//显示文章列表
router.get("/", async (req, res) => {
    /*
    const options = {
        page: req.query.page,
        projection: '-__v',
        sort: { order: 1 },
        model: Article
    }
    const result = await pagination(options)
    */
    const result = await Article.findPaginationArticles(req)
    res.render('admin/article_list', {
        userInfo: req.userInfo,
        articles: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,
        url: '/articles'
    })
})

//显示添加文章
router.get("/add", async (req, res) => {
    const categories = await Category.find({},"-__v -order").sort({order:1})
    /*
    res.render('admin/article_add', {
        userInfo: req.userInfo,
        categories
    })
    */
    res.render('admin/article_add_edit', {
        userInfo: req.userInfo,
        categories
    })   
})
//处理上传图片
router.post('/uploadImage', upload.single('upload'),async (req,res)=>{
    const filename = "/uploads/" + req.file.filename;
    res.json({
        uploaded:true,
        url: filename
    })
})
//处理新增文档
router.post("/add", async (req, res) => {
    const {title,category,intro,content} = req.body
    const user = req.userInfo._id
    try{
        await Article.insertMany({
            title,
            category,
            intro,
            content,
            user
        })
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '添加文章成功',
            nextUrl: '/articles'
        })
    }catch(e){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/articles'
        })
    }
})
//显示编辑文章
router.get("/edit/:id", async (req, res) => {
    const { id } = req.params
    const categoriesPromise = Category.find({}, "-__v -order").sort({ order: 1 })
    const articlePromise = Article.findOne({ _id: id }, "title category intro content")
    const categories = await categoriesPromise
    const article = await articlePromise
    /*
    res.render('admin/article_edit', {
        userInfo: req.userInfo,
        categories,
        article
    })
    */
    res.render('admin/article_add_edit', {
        userInfo: req.userInfo,
        categories,
        article
    })   
})
//处理编辑文章
router.post("/edit", async (req, res) => {
    const { title, intro, category, content, id } = req.body
    try {
        //更新
        await Article.updateOne({ _id: id }, { title, intro, category, content })
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '修改文章成功',
            nextUrl: '/articles'
        })
    } catch (e) {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/articles'
        })
    }
})
//处理删除请求
router.get("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Article.deleteOne({ _id: id })
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '删除文章成功',
            nextUrl: '/articles'
        })
    } catch (e) {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '服务器端错误',
            nextUrl: '/categories'
        })
    }
})
module.exports = router