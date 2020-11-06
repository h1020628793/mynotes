const crypto = require('crypto')

const hash = crypto.createHash('sha512')//sha256 sha512 md5

hash.update('12345689879')//明文

console.log(hash.digest('hex'));//显示密文:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92

//彩虹表 非常多的数据 通过 sha512生成的
/*
明文    密文
1223    8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
3432432 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6a92
.....
12345689879 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
*/
