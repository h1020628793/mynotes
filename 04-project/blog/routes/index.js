// /routes/index.js
const express = require('express')
const router = express.Router()

const moment = require('moment')

const Category = require('../models/category')
const Article = require('../models/article')

//获取共通数据
const getCommonData = async ()=>{
    const categoriesPromise = Category.find({}, "name")
    const topArticlesPromise = Article.find({},"title click").sort({click:-1}).limit(10)
    const categories = await categoriesPromise
    const topArticles = await topArticlesPromise
    return {
        categories,
        topArticles
    }
}

//显示首页
router.get("/", async (req, res) => {
    //获取分类
    const { categories, topArticles} = await getCommonData()
    const result = await Article.findPaginationArticles(req)
    res.render('main/index', {
        userInfo:req.userInfo,
        categories,
        topArticles,
        articles: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,        
    })
})
//显示列表页面
router.get("/list/:id", async (req, res) => {
    const { id } = req.params
    const commonDataPromise = getCommonData()
    const articlesPromise = Article.findPaginationArticles(req, { category:id})
    const { categories, topArticles } = await commonDataPromise
    const result = await articlesPromise
    res.render('main/list', {
        userInfo: req.userInfo,
        categories,
        currentCategory:id,
        topArticles,
        articles: result.docs,
        list: result.list,
        pages: result.pages,
        page: result.page,          
    })
})

//获取前台文章分页数据
router.get("/articlesList", async (req, res) => {
    let query = {}
    let id = req.query.id
    if(id){
        query.category = id
    }
    //获取分类
    const result = await Article.findPaginationArticles(req, query)
    //格式化时间
    const docs = result.docs.map(item=>{
        const obj = JSON.parse(JSON.stringify(item))
        obj.createdTime = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
        return obj
    })
    result.docs = docs
    res.json({
        code:0,
        message:'获取分页数据成功',
        data: result
    })
})

//显示详情页面
router.get("/detail/:id", async (req, res) => {
    const { id } = req.params
    const commonDataPromise = getCommonData()
    const articlePromise = Article.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
        .populate({ path: 'user', select: 'username' })
        .populate({ path: 'category', select: 'name' })

    const { categories, topArticles } = await commonDataPromise
    const article = await articlePromise
    res.render('main/detail', {
        userInfo: req.userInfo,
        categories,
        currentCategory: article.category._id,
        topArticles,
        article
    })
})


module.exports = router