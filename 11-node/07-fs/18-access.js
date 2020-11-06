const fs = require('fs')

try{
    fs.accessSync('./01.txt')//模拟一个存在的文件
    console.log('has such file or directory')//has such file or directory
}catch(e){
    console.log('no such file or directory');
}

try {
    fs.accessSync('./02.txt')//模拟一个没有的文件
    console.log('has such file or directory')
} catch (e) {
    console.log('no such file or directory')//no such file or directory
}

