const fs = require('fs/promises')
fs.writeFile('./01.txt', 'bbbb', { flag: 'a' })
.then(data => {
    console.log(data);
})
.catch(e => {
    console.log(e);
})