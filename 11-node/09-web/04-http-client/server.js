const http = require('http')
const url = require('url')
const server = http.createServer((req, res) => {
    if (req.method == 'GET') {
        const parsedUrl = url.parse(req.url, true)
        console.log('get param:', parsedUrl.query);
        res.end('hello get')
    }
    if (req.method == 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk
        })
        req.on('end', () => {
            console.log(body);
        })
        res.end('hello post')
    }
})
server.listen(3000, () => {
    console.log('server is run on http://127.0.0.1:3000');
})