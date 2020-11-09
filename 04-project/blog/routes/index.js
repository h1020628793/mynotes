// /routes/index.js
const express = require('express')
const router = express.Router()

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
    const { categories, topArticles } = await getCommonData()
    res.render('main/list', {
        userInfo: req.userInfo,
        categories,
        currentCategory:id,
        topArticles
    })
})

//获取前台文章分页数据
router.get("/articlesList", async (req, res) => {
    //获取分类
    const result = await Article.findPaginationArticles(req)
    res.json({
        code:0,
        message:'获取分页数据成功',
        data: result
    })
})
module.exports = router