//app.js
const express = require('express')

const app = express()

app.use(express.static('public'))

app.get("/",(req,res)=>{
    // res.end('hello')

    /*
    res.json({
        code:0,
        data:{
            name:'Tom',
            age:18
        }
    })
    */
   res.send('<h1>hello</h1>')
})

app.listen(3000, () => console.log('server is running at http://127.0.0.1:3000'))