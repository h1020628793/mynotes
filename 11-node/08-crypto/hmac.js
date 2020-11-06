const crypto = require('crypto')

const hmac = crypto.createHmac('sha256','2139808afds')

hmac.update('123456')

console.log(hmac.digest('hex'));
//3fb200afd83c8d49cd939c04a425194ab5942ef33f7a6e5a50e054942128de89
//3fb200afd83c8d49cd939c04a425194ab5942ef33f7a6e5a50e054942128de89
//4b6dc88378b459b476fae83b92c05119a88c9abf428e273c010deba4b0743d87

//彩虹表 非常多的数据 通过 sha256生成的
/*
明文    密文
1223    8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
3432432 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6a92
.....
12345689879 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
*/