var http = require('http');
var server = http.createServer(function(req,res){
    var json = JSON.stringify({
        code:0,
        status:'ok',
        data:{
            name:'Amy'
        }
    });
    res.setHeader('Content-Type','application/json')
    return res.end(json);
});

server.listen(3001,'127.0.0.1',function(){
    console.log("Server is running at http://127.0.0.1:3001");
})