var http = require('http');
var fs   = require('fs');
var url = require('url');
var server = http.createServer(function(req,res){
    urlStr = req.url
    var parm = url.parse(urlStr,true).query;
    var obj = '{"name":"Tom","age":18}';
    res.end(parm.callback+'('+obj+')');
});

server.listen(3001,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3001");
})