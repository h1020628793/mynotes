const fs = require('fs')
const util =  require('util');

const readFile = util.promisify(fs.readFile)

readFile('./01.txt', { flag: 'r', encoding: 'utf8' })
.then(data=>{
    console.log(data);
})
.catch(e=>{
    console.log('read file err:',e);
})

async function getData(){
    const data = await readFile('./01.txt',{ flag: 'r', encoding: 'utf8' })
    console.log(data);
}

getData()



