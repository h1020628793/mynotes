//app.js
const express = require('express')

const app = express()

app.use(express.static('public'))

app.use('/users', require('./routers/users'))
app.use('/articles', require('./routers/articles'))



app.listen(3000, () => console.log('server is running at http://127.0.0.1:3000'))