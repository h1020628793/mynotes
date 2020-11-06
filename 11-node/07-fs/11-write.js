const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
writeFile('./01.txt','bbbb',{flag:'a'})
.then(data=>{
    console.log(data);
})
.catch(e=>{
    console.log(e);
})