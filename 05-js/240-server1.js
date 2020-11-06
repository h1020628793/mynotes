var http = require('http');
var fs   = require('fs');
var server = http.createServer(function(req,res){
    var urlStr = req.url;

    var filePath = './'+urlStr;

    var data = fs.readFileSync(filePath)
        
    res.end(data);     
  
});

server.listen(3000,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3000");
})