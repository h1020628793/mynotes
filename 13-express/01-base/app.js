//app.js
const express = require('express')
const app = express()

app.use(express.static('public'))

app.all("/",(req,res,next)=>{
    console.log('handle all..');
    next()
})

app.get("/",(req,res)=>{res.end('get response')})
app.post("/", (req, res) => { res.end('post response') })
//使用多个回调函数处理路由需要指定next
app.delete("/", (req, res, next) => {
    console.log('handle something...');
    next()
}, (req, res) => {
    res.end('delete response')
})
app.put("/", (req, res) => { res.end('put response') })

app.listen(3000, () => console.log('server is running at http://127.0.0.1:3000'))