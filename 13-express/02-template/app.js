const express = require('express')
const swig = require('swig')

const app = express()

app.use(express.static('public'))

//开发阶段设置不走缓存
swig.setDefaults({
    cache: false
})

//第一个参数是模板名称,同时也是模板文件的扩展名
//第二个参数是解析模板的方法
app.engine('html', swig.renderFile);

//第一参数必须是views
//第二个参数是模板存放的目录
app.set('views', './views')

//第一个参数必须是view engine
//第二个参数是模板名称,也就是app.engine的第一个参数
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('index', {
    })
})
app.get('/list', (req, res) => {
    res.render('list', {
    })
})
app.get('/detail', (req, res) => {
    res.render('detail', {
    })
})

app.get('/test',(req,res)=>{
    res.render('test',{
        name:'Tom',
        order:{
            orderNo:'12345678',
            price: 22.5
        },
        type:2, //1 管理员 2 普通用户
        level:3, //1: vip 2:svip 其他:普通会员
        friends:['Amy','Leo','Jack']
    })
})

app.listen(3000,()=>{
    console.log('server is running...');
})