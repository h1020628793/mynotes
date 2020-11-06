const fs = require('fs')

fs.writeFile('./01.txt','hello',{flag:'a'},err=>{
    if(err){
        console.log('write file err:',err);
    }else{
        console.log('write file success');
    }
})