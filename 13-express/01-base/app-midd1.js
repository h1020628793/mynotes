//app.js
const express = require('express')
const app = express()

//定义一个中间件
const requestTime = (req,res,next)=>{
    req.requestTime = Date.now()
    next()
}
//使用中间件
app.use(requestTime)


app.get("/", (req, res) => {
    console.log(req.requestTime); 
    res.end('hello') 
})

app.get("/r1", (req, res) => {
    console.log(req.requestTime); 
    res.end('hello r1')
})

app.get("/r2", (req, res) => {
    console.log(req.requestTime); 
    res.end('hello r2')
})

app.listen(3000, () => console.log('server is running at http://127.0.0.1:3000'))