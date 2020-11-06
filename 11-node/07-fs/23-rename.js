const fs = require('fs')

fs.rename('./test.txt','./foo.txt',err=>{
    if(err){
        console.log('rename error');
    }else{
        console.log('rename success');
    }
})