// /routes/index.js
const express = require('express')
const router = express.Router()

//显示首页
router.get("/", (req, res) => {
    res.render('main/index', {
        userInfo:req.userInfo
    })
})

module.exports = router