//app.js
const express = require('express')

const app = express()

app.use(express.static('public'))

//请求url: /users/34/books/8989
app.get("/users/:userId/books/:bookId", (req, res) => { 
    console.log(req.params)//{ userId: '34', bookId: '8989' }
    res.end('ok')
})

//请求url: /?userId=123&bookId=999
app.delete("/", (req, res) => {
    console.log(req.query);//{ userId: '123', bookId: '999' }
    res.end('ok')
})
const bodyParser = require('body-parser')



app.listen(3000, () => console.log('server is running at http://127.0.0.1:3000'))