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
    console.log(req.url);
    res.setHeader('Access-Control-Allow-Origin', "*")
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

        /*
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end('<h1>你访问的页面走丢了404</h1>')
            } else {
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(data)
            }
        })
        */        
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

})

server.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
})