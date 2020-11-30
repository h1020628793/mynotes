/*
* @Author: Tom
* @Date:   2018-08-06 09:14:54
* @Last Modified by:   Tom
* @Last Modified time: 2020-03-02 16:41:14
*/
//项目入口文件
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const { DB_HOST } = require('./config/index.js')
const TokenModel = require('./models/token.js');

//启动数据库
mongoose.connect('mongodb://'+DB_HOST+':27017/kmallm11',{ useNewUrlParser: true });

const db = mongoose.connection;

db.on('error',(err)=>{
	throw err
});

db.once('open',()=>{
	console.log('DB connected....');
});

const app = express();

//配置静态资源
app.use(express.static('public'));

//OPTIONS请求处理
app.use((req,res,next)=>{
    if(req.method == 'OPTIONS'){
        res.send('OPTIONS OK');
    }else{
        next();
    }
})

//设置cookie的中间件,后面所有的中间件都会有cookie
app.use(session({
    //设置cookie名称
    name:'kmid',
    //用它来对session cookie签名，防止篡改
    secret:'dsjfkdfd',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},    
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })   
}))

app.use((req,res,next)=>{
    const token = req.get('Authorization')
    if(token){
    //请求头有携带token则用token获取登录用户
        TokenModel.getUserByToken(token)
        .then(raw=>{
            if(raw){
                req.userInfo  = {
                    _id:raw.user._id,
                    username:raw.user.username,
                    isAdmin:raw.user.isAdmin,
                    token:token
                }
            }else{
                req.userInfo  = {}
            }
            next()
        })
        .catch(e=>{
            console.log('getUserByToken error:',e.message)
            req.userInfo  = {}
            next()
        })
    }else{
    //请求头没有携带token用cookie获取session中的登录用户
        req.userInfo  = req.session.userInfo || {};
        next(); 
    }
});

//添加处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    //获取api的版本
    let version = 'v1'
    
    const urlMatch = req.url.match(/\/(\w*)\//)
    
    if(urlMatch){
        version = urlMatch[1]
    }
    const urlPerfix = '/'+version+ '/'
    const routesPerfix = './routes/'+version+'/'
    //根据api版本来加载对应的路由文件
    app.use(urlPerfix+"init",require(routesPerfix+'init.js'));
    app.use(urlPerfix+"counts",require(routesPerfix+'counts.js'));
    app.use(urlPerfix+"users",require(routesPerfix+'users.js'));
    app.use(urlPerfix+"categories",require(routesPerfix+'categories.js'));
    app.use(urlPerfix+"products",require(routesPerfix+'products.js'));
    app.use(urlPerfix+"orders",require(routesPerfix+'orders.js'));
    app.use(urlPerfix+"carts",require(routesPerfix+'carts.js'));
    app.use(urlPerfix+"shippings",require(routesPerfix+'shippings.js'));
    app.use(urlPerfix+"orders",require(routesPerfix+'orders.js'));
    app.use(urlPerfix+"payments",require(routesPerfix+'payments.js'));
    app.use(urlPerfix+"ads",require(routesPerfix+'ads.js'));
    app.use(urlPerfix+"attrs",require(routesPerfix+'attrs.js'));
    app.use(urlPerfix+"floors",require(routesPerfix+'floors.js'));
    app.use(urlPerfix+"collections",require(routesPerfix+'collections.js'));

    next()   
})

//处理错误
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500);
    res.json({
        message: 'request error'
    })
})    

app.listen(3000,()=>{
	console.log('server is running at http://127.0.0.1:3000')
})
