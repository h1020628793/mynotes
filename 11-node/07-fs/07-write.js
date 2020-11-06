const fs = require('fs')
//1.打开
const fd = fs.openSync('./01.txt','a')
//2.写入
fs.writeSync(fd,'bbb')
//3.关闭
fs.closeSync(fd)