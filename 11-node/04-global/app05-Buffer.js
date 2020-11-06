// console.log(Buffer);
const buf1 = Buffer.from('aabbcc')
console.log(buf1);//<Buffer 61 61 62 62 63 63>
const buf2 = Buffer.from('中')
console.log(buf2);//<Buffer e4 b8 ad>
/*
0101010101010 
一个0或者一个1 叫做 1个位 1bit

8个0或者1 8bit = 1B(字节) = 2个16进制数(8个二进制)
一个英文字符 = 1B
一个中文字符 = 3B

1kb = 1024B
1MB = 1024kb
1GB = 1024MB
1TB = 1024GB
*/

const buf3 = Buffer.alloc(5)
console.log(buf3);//<Buffer 00 00 00 00 00>
console.log(buf2.toString());//中


buf3.fill('a')
console.log(buf3);//<Buffer 61 61 61 61 61>


console.log(buf2[0]);//228
console.log(buf2[1]);//184
console.log(buf2[2]);//173

const buf4 = Buffer.alloc(3)
buf4[0] = 228
buf4[1] = 184
buf4[2] = 173
console.log(buf4);//<Buffer e4 b8 ad>
console.log(buf4.toString());//中