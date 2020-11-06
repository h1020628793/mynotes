const fs = require('fs')
try{
    fs.mkdirSync('./foo')
    console.log('mkdir success')
}catch(e){
    console.log('mkdir err');
}

