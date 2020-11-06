const fs = require('fs')

const rs = fs.createReadStream('./rs.txt')

let body = ''
rs.on('open',()=>{
    console.log('open...');
})
rs.on('close', () => {
    console.log('close...');
})
rs.on('data',chunk=>{
    body += chunk
})
rs.on('end',()=>{
    console.log(body);
})