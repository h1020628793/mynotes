const fs = require('fs')
//1. 打开文件
/*
fs.openSync(path,flags),返回表示文件描述符的整数
path:读取文件的路径
flags:文件系统标志
*/
const fd = fs.openSync('./01.txt', 'r')
//2. 读出文件内容
const buf = Buffer.alloc(100)
/*
fs.readSync(fd, buffer, offset, length, position)
fd:指定文件
buffer:是数据（从 fd 读取）要被写入的 buffer
offset:是 buffer 中开始写入的偏移量。
length:整数，指定要读取的字节数。
position:参数指定从文件中开始读取的位置
*/
fs.readSync(fd, buf, 0, 50, 0)
console.log(buf.toString())
//3. 关闭文件
fs.closeSync(fd)