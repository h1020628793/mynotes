//这只一个其他Web服务器的程序
const http = require('http')
const path = require('path')
const querystring = require('querystring')
const url = require('url')
/**
 测试path
console.log(path.normalize('/a//b/c/../b'));
console.log(path.extname('/a/b/c.js'));
 */
/**
 * https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=xxx&fenlei=256&rsv_pq=8ea20cf400084027&rsv_t=ce03pqq3BqFEp2V8IMgsbPfhI8H8kyFpU8dKramoBGF9W4Tz%2BM3tnmLnIqk&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=4&rsv_sug2=0&rsv_btype=i&inputT=574&rsv_sug4=649
 * 
 * 
 * 
const obj = querystring.parse('a=1&b=2')
console.log(obj.a);
const myUrl = url.parse('https://user:pass@chenniantao.com:8080/p/a/t/h?query=string#hash',true)
console.log(myUrl);
 */
const server = http.createServer((req,res)=>{
    //req(request)请求 可读流 IncomingMessage
    //res(response)响应 可写流 ServerResponse
    // console.log(req);
    // console.log(res);
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.write('bbbb')
    res.end('hello')

})

server.listen(3000,()=>{
    console.log('server is running at http://127.0.0.1:3000');
})