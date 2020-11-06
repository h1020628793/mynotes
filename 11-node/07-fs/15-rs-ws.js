const fs = require('fs')

const rs = fs.createReadStream('./a.mov')

const ws = fs.createWriteStream('./b.mov')

rs.pipe(ws)

ws.on('finish',()=>{
    console.log('write done...');
})

console.log('do somthing...');

