const fs = require('fs')

const ws = fs.createWriteStream('./ws.txt')

ws.on('finish',()=>{
    console.log('finish...');
})
ws.on('open', () => {
    console.log('open...');
})
ws.on('close', () => {
    console.log('close...');
})
ws.write('bbb')
ws.write('ccc')
ws.end('dddd')