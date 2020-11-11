//app.js
const express = require('express')
const swig = require('swig')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//const Cookies = require('cookies')

const session = require('express-session')
const MongoStore = require("connect-mongo")(session)

const app = express()

//避免使用findOneAndUpdate方法出现警告
mongoose.set('useFindAndModify', false)

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    throw new Error('DB error')
})

//连接DB
db.once('open',  () => {
    console.log('DB connected')
})

//处理静态资源
app.use(express.static('public'))

//解析json
app.use(bodyParser.json())
//解析urlencoded内容
app.use(bodyParser.urlencoded({ extended: false }))

//设置模版引擎
swig.setDefaults({
    cache: false
})
app.engine('html', swig.renderFile);
app.set('views', './views')
app.set('view engine', 'html')

//设置cookie的中间件
/*
app.use((req,res,next)=>{
    //把Cookies对象保存到req对象上
    req.cookies = new Cookies(req, res)
    //从用户的请求中获取cookie
    const userInfo = JSON.parse(req.cookies.get('userInfo') || "{}")
    req.userInfo = userInfo
    next()
})
*/

//设置session中间件
app.use(session({
    //设置cookie名称
    name: 'bloguser',
    //用它来对session cookie签名，防止篡改
    secret: 'abc123',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true,
    //如果为true,则每次请求都更新cookie的过期时间
    rolling: true,
    //cookie过期时间 1天
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    //设置session存储在数据库中
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use((req, res, next) => {
    req.userInfo = req.session.userInfo || {}
    next()
})

//路由的入口
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/admins', require('./routes/admins'))
app.use('/categories', require('./routes/categories'))
app.use('/articles', require('./routes/articles'))
app.use('/comments', require('./routes/comments'))
app.use('/homes', require('./routes/homes'))

app.listen(3000,()=>{
    console.log('server is running at http://127.0.0.1:3000')
})