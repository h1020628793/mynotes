const fs = require('fs')
try{
    fs.renameSync('./test.txt','./foo.txt')
    console.log('reanme success');
}catch(e){
    console.log('rename error');
}