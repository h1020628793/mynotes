var http = require('http');
var fs   = require('fs');
var crypto = require('crypto')
var server = http.createServer(function(req,res){
    var urlStr = req.url;

    var filePath = './'+urlStr;
    //设置一个较短缓存时间的强缓存用来测试
    res.setHeader('Cache-control','max-age=1');
    //读取文件
    var data = fs.readFileSync(filePath)
    //根据文件内容生成的hash字符串的签名
    var hash = crypto.createHash('md5').update(data).digest('base64')
    //设置签名的协商缓存
    res.setHeader('Etag',hash)
    //获取请求头的if-none-match
    var ifNoneMatch = req.headers['if-none-match']
    //比较
    if(ifNoneMatch === hash){
        res.statusCode=304
        return res.end()
    }

    res.end(data);
});

server.listen(3000,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3000");
})