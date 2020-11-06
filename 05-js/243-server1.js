var http = require('http');
var fs   = require('fs');
var server = http.createServer(function(req,res){
    // res.setHeader('Set-Cookie','test1=123')
    var expires = new Date(Date.now() + 3 * 1000).toUTCString()
    res.setHeader('Set-Cookie','test1=123;expires='+expires)
    // res.setHeader('Set-Cookie','test1=123;max-age=500')
    res.setHeader("Expires",new Date(Date.now()+10000).toUTCString());
    var urlStr = req.url;

    var filePath = './'+urlStr;

    var data = fs.readFileSync(filePath)
        
    res.end(data);     
  
});

server.listen(3000,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3000");
})