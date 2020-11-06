var http = require('http');
var fs   = require('fs');
var url = require('url');
var server = http.createServer(function(req,res){
    var urlStr = req.url;
    if(urlStr.search(/\./) != -1){
        var filePath = './'+urlStr;
        var data = fs.readFileSync(filePath)
        return res.end(data);
    }else{
        var parm = url.parse(urlStr,true).query;
        var json = JSON.stringify({
            code:0,
            status:'ok',
            data:parm
        });
        res.setHeader('Content-Type','application/json')
        return res.end(json);
    }
});

server.listen(3000,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3000");
})