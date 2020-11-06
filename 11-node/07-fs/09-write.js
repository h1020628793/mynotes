const fs = require('fs')
//1.打开文件
fs.open('./01.txt','a',(err,fd)=>{
    if(err){
        console.log('open file err:', err);
    }else{
        //2.写入文件
        fs.write(fd, 'hello',  (err, number, str) => {
            if(err){
                console.log('write file err:', err);
            }else{
                console.log('write '+ number + ' bytes');
                console.log('wirte data:',str);
            }
        })
        //3. 关闭文件
        fs.close(fd, err => {
            if (err) {
                console.log('close file error:', err)
            } else {
                console.log('close file success')
            }
        })
    }
})