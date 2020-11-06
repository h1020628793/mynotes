const fs = require('fs')
fs.mkdir('./bar',err=>{
    if(err){
        console.log('mkdir err');
    }else{
        console.log('mkdir success');
    }
})