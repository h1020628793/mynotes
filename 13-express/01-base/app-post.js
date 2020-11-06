//app.js
const querystring = require('querystring')

const express = require('express')
const bodyParser = require('body-parser')


const app = express()

app.use(express.static('public'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post("/add", (req, res) => {
    /*
    let body = ''
    req.on('data',chunk=>{
        body += chunk
    }) 
    req.on('end',()=>{
        console.log(querystring.parse(body));
        res.json({
            code: 0
        })
    })
    */
    console.log(req.body);
    res.json({
        code: 0
    })
})


app.listen(3000, () => console.log('server is running at http://127.0.0.1:3000'))