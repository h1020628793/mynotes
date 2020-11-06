const fs = require('fs')
const util = require('util')
const path = require('path')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const dataPath = path.normalize(__dirname + '/../data/item.json')

async function get(){
    const json = await readFile(dataPath)
    const arr = JSON.parse(json)
    return arr
}

async function del(id){
    const json = await readFile(dataPath)
    const arr = JSON.parse(json)
    const newArr = arr.filter(item=>{
        return item.id != id
    })
    await writeFile(dataPath, JSON.stringify(newArr))
}

async function add(task){
    const json = await readFile(dataPath)
    const arr = JSON.parse(json)
    const obj = {
        id: Date.now().toString(),
        task: task
    }
    arr.push(obj)
    await writeFile(dataPath, JSON.stringify(arr))
    return obj
}


module.exports = {
    get,
    del,
    add
}