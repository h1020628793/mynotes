const path = require('path')
const querystring = require('querystring')
const swig = require('swig')
const { IncomingForm } = require('formidable')

const { get:getItem,add:addItem, del:delItem } = require('../model/item.js')

class Controller{
    async index(req,res,...args){
        try {
            const filePath = path.normalize(__dirname + '/../view/item/index.html')
            const template = swig.compileFile(filePath);

            const data = await getItem()
            const html = template({
                data: data//每一个项目就是一个任务
            })
            res.end(html)
        } catch (e) {
            console.log(e);
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            res.end('<h1>你访问的页面走丢了404</h1>')
        }  
    }
    async add(req, res, ...args){
        //处理添加逻辑
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })
        req.on('end', async () => {
            try {
                const obj = querystring.parse(body)
                const data = await addItem(obj.task)
                res.end(JSON.stringify({
                    code: 0,
                    msg: 'add success',
                    data
                }))
            } catch (e) {
                console.log(e);
                res.end(JSON.stringify({
                    code: 1,
                    msg: 'add error',
                }))
            }

        })       
    }
    
    async del(req, res, ...args){
        const id = args[0]
        try {
            await delItem(id)
            //处理删除逻辑
            res.end(JSON.stringify({
                code: 0,
                msg: 'del success'
            }))
        } catch (e) {
            console.log(e);
            res.end(JSON.stringify({
                code: 1,
                msg: 'del error'
            }))
        }        
    }
    uploadAvatar(req, res, ...args){
        const incomingForm = new IncomingForm({
            uploadDir: "./static/images",//设置文件保存的路径
            keepExtensions: true
        })
        incomingForm.parse(req, (err, fields, files) => {
            if (err) {
                //处理上传逻辑
                res.end(JSON.stringify({
                    code: 1,
                    msg: 'uploadAvatar error'
                }))
            } else {
                //处理上传逻辑
                res.end(JSON.stringify({
                    code: 0,
                    msg: 'uploadAvatar success',
                    data: files.avatar.path
                }))
            }
        })
    }
}

module.exports = new Controller()