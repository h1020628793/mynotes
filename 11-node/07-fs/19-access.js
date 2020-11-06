const fs = require('fs')

fs.access('./01.txt',err=>{//模拟有该文件
    if(err){
        console.log('no such file or directory');
    }else{
        console.log('has such file or directory')//has such file
    }
})

fs.access('./02.txt', err => {//模拟没有该文件
    if (err) {
        console.log('no such file or directory')//no such file or directory
    } else {
        console.log('has such file or directory')
    }
})

