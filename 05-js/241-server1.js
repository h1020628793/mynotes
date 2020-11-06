var http = require('http');
var fs   = require('fs');
var server = http.createServer(function(req,res){
    var proxy = req.headers['proxy']
    if(proxy){
        return handleProxy(req,res)
    }

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