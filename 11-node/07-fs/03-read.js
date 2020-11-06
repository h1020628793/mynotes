const fs = require('fs')
//1.打开文件
fs.open('./01.txt', 'r', (err, fd) => {
    if (err) {
        console.log('open file err:', err);
    } else {
        //2.读取文件
        const buffer = Buffer.alloc(100)
        fs.read(fd, buffer, 0, 50, 0, (err, number, buf) => {
            if (err) {
                console.log('read file err:', err);
            } else {
                //使用数据
                console.log('get ' + number + ' bytes data');
                console.log(buf);
            }
            //3.关闭文件
            fs.close(fd, (err) => {
                if (err) {
                    console.log('close file err:', err);
                } else {
                    console.log('close file success');
                }
            })
        })
    }
})