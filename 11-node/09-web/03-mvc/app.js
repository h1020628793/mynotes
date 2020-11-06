const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const querystring = require('querystring')

const swig = require('swig')
const { IncomingForm } = require('formidable')
const mime = require('./mime.json')

const { get, del, add } = require('./model/item.js')


const server = http.createServer(async (req, res) => {
    //构建一个简单的MVC框架,框架的主要做法是约定规则
    //预定静态资源的请求以'/static/'开始的请求
    const parseUrl = url.parse(req.url, true)
    const pathname = parseUrl.pathname
    if (pathname.startsWith('/static/')){
        const filePath = path.normalize(__dirname + req.url)
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end('<h1>你访问的页面走丢了404</h1>')
            } else {
                const extname = path.extname(filePath)
                const mimeType = mime[extname] || 'text/plain'
                res.setHeader('Content-Type', mimeType + ';charset=utf-8')
                res.end(data)
            }
        })      
    }
    //约定路由的格式:/controller/action/arg1/arg2/...
    else{
        // /item/index/11/22
        // /item/add 
        // /item/del/1603156050610
        const paths = pathname.split('/')
        const controller = paths[1] || 'item'
        const action = paths[2] || 'index'
        const args = paths.slice(3)
        //约定:  所有的controller都在./controller/文件夹下面
        try{
            const mode = require(path.normalize(__dirname + "/controller/" + controller))
            mode[action] && mode[action](...[req, res].concat(args))
        }catch(e){
            console.log(e);
            res.setHeader('Content-type', "text/html;charset=UTF-8")
            res.statusCode = 404
            res.end('<h1>请求出错了</h1>')
        }
    }

    




    /*
    console.log(req.url);
    const parseUrl = url.parse(req.url,true)
    const pathname = parseUrl.pathname
    //首页html
    if (pathname == '/index.html' || pathname == '/'){
        try{
            const filePath = path.normalize(__dirname + '/static/index.html')
            const template = swig.compileFile(filePath);

            const data = await get()
            const html = template({
                data: data//每一个项目就是一个任务
            })
            res.end(html)
        }catch(e){
            console.log(e);
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            res.end('<h1>你访问的页面走丢了404</h1>')
        }       
    }
    //添加
    else if(pathname == '/add'){
        //处理添加逻辑
        let body = ''
        req.on('data',chunk=>{
            body += chunk
        })
        req.on('end',async ()=>{
            try{
                const obj = querystring.parse(body)
                const data = await add(obj.task)
                res.end(JSON.stringify({
                    code: 0,
                    msg: 'add success',
                    data
                }))
            }catch(e){
                console.log(e);
                res.end(JSON.stringify({
                    code: 1,
                    msg: 'add error',
                }))                
            }
  
        })

    }
    //删除
    else if (pathname == '/del') {
        const id = parseUrl.query.id
        try{
            await del(id)
            //处理删除逻辑
            res.end(JSON.stringify({
                code: 0,
                msg: 'del success'
            }))
        }catch(e){
            console.log(e);
            res.end(JSON.stringify({
                code: 1,
                msg: 'del error'
            }))
        }
    }
    //上传
    else if (pathname == '/uploadAvatar') {
        const incomingForm = new IncomingForm({
            uploadDir: "./static/images",//设置文件保存的路径
            keepExtensions:true
        })
        incomingForm.parse(req,(err,fields,files)=>{
            if(err){
                //处理上传逻辑
                res.end(JSON.stringify({
                    code: 1,
                    msg: 'uploadAvatar error'
                }))
            }else{
                //处理上传逻辑
                res.end(JSON.stringify({
                    code: 0,
                    msg: 'uploadAvatar success',
                    data: files.avatar.path.substr(7)
                }))
            }
        })

    }       
    //静态资源处理
    else{
        const filePath = path.normalize(__dirname + '/static/' + req.url)
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end('<h1>你访问的页面走丢了404</h1>')
            } else {
                const extname = path.extname(filePath)
                const mimeType = mime[extname] || 'text/plain'
                res.setHeader('Content-Type', mimeType + ';charset=utf-8')
                res.end(data)
            }
        })
    }
    */

})

server.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
})