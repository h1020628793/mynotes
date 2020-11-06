const str = 'Hello'
const fn = ()=>{
    console.log('fn...');
}
const obj = {
    name:'Tom'
}
console.log(module.exports === exports);//true
/*
exports.str = str
exports.fn = fn
exports.obj = obj
*/
/*
module.exports.str = str
module.exports.fn = fn
module.exports.obj = obj
*/
//exports.str = str
module.exports = {
    str,
    fn,
    obj
}


