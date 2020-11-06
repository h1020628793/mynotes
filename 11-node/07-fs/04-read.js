const fs = require('fs')

fs.readFile('./01.txt', { flag: 'r', encoding: 'utf8' },(err,data)=>{
    if(err){
        console.log('read file err:',err);
    }else{
        //使用数据
        console.log(data);
    }
})