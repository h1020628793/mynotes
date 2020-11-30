/*
* @Author: Tom
* @Date:   2019-11-01 09:42:14
* @Last Modified by:   Tom
* @Last Modified time: 2020-01-10 12:17:26
*/
const fs = require('fs')

const Router = require('express').Router

const UserModel = require('../models/user.js')
const hmac = require('../util/hmac.js')

const router = Router();

router.get('/',(req,res)=>{
    if (fs.existsSync('init.lock')) {
        res.send('你已经初始化了管理员,不能再次初始化')
    }else{
        UserModel.insertMany({
            username:'admin',
            password:hmac('admin'),
            isAdmin:true
        })
        .then(result=>{
            fs.writeFileSync('init.lock','')
            res.send('初始化管理员成功,用户名:admin 密码:admin 请尽快登录后台修改密码')
        })
        .catch(err=>{
            console.log(err)
            res.send('初始化失败')
        })        
    }    

})

module.exports = router;


