/*
* @Author: Tom
* @Date:   2020-08-25 20:00:06
* @Last Modified by:   Tom
* @Last Modified time: 2020-08-25 21:09:46
*/
var http = require('http');
var fs   = require('fs');
var server = http.createServer(function(req,res){

    // res.setHeader('Set-Cookie','test1=123')
    res.setHeader('Set-Cookie','test=123;Max-Age=10')
    var urlStr = req.url;

    var filePath = './'+urlStr;

    var data = fs.readFileSync(filePath)
        
    res.end(data);
  
});
function handleProxy(req, res) {
    var options = {
        hostname: '127.0.0.1',
        port: 3001,
        path: '/',
        method: 'GET',
    };

    var proxyReq = http.request(options);  

    proxyReq.on('response', function(proxyRes) {

        proxyRes.pipe(res);
    })

    proxyReq.end();
}
server.listen(3000,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3000");
})