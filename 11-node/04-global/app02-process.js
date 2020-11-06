// console.log(process.pid);
// console.log(process.argv);
// console.log(process.env);
//分为 开发环境 和 线上环境
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV == 'production'){
    console.log('config for production');
} else if (process.env.NODE_ENV == 'dev') {
    console.log('config for dev');
} 



