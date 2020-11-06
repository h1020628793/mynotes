/*
 * @Author: Tom
 * @Date: 2020-09-11 15:38:09
 * @LastEditTime: 2020-09-12 07:46:55
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
var server = http.createServer(function (req, res) {
    var urlStr = req.url;
    var method = req.method;
    if (urlStr.search(/\./) != -1) {
        try{
            var filePath = './' + urlStr;
            var data = fs.readFileSync(filePath)
            return res.end(data);        
        }catch(e){
            res.statusCode = 404
            res.end('Not Found')
        }
    } else if (method == 'GET' || method == 'DELETE') {
        var parm = url.parse(urlStr, true).query;
        var json = JSON.stringify({
            code: 0,
            status: 'ok',
            data: parm
        });
        res.setHeader('Content-Type', 'application/json')
        
        //模拟超时
        /*
        setTimeout(function(){
            return res.end(json);
        },5000)
        */
        
        //模拟返回404错误
        /*
        res.statusCode = 404
        return res.end()
        */

        //成功返回
        return res.end(json);
    } else if (method == 'POST' || method == 'PUT') {
        var body = ''
        req.on('data', function (chunk) {
            body += chunk
        })
        req.on('end', function () {
            var json = JSON.stringify({
                code: 0,
                status: 'ok',
                data: JSON.parse(body)
            });
            res.setHeader('Content-Type', 'application/json')
            return res.end(json);
        })
    }
});

server.listen(3000, '127.0.0.1', function () {
    console.log("Server is running at http://127.0.0.1:3000");
})