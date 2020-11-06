const fs = require('fs')

const data = fs.readFileSync('./01.txt', { encoding: 'utf8'})

console.log(data);