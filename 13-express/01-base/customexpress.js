const http = require('http')
const express = () => {
    //中间件数组
    const fns = []
    //当接收到请求时会执行app这个函数
    const app = (req, res) => {
        let i = 0;
        function next() {
            let fn = fns[i++]
            if (!fn) return;
            
            /*执行中间件函数,并且把当前的next函数做为参数,这样在执行这个函数时,如果函数中调用next方法,
            当前的next方法就会再次被调用,那么就会再次执行中间件数组中的中间件函数
            */
            fn(req, res, next)
        }
        //第一次调用next方法来获取中间件数组中的第一个中间件函数并执行
        next();
    }
    app.use = (fn) => {
        fns.push(fn);
    }
    return app;
}
const app = express();

//app.use的作用是把需要执行的中间件函数放入中间件数组中
app.use((req, res, next) => {
    console.log("A1")
    next()
    console.log('A2')
})
app.use((req, res, next) => {
    console.log("B1")
    next()
    console.log('B2')
})
app.use((req, res, next) => {
    console.log("C1")
    next()
    console.log('C2')
})
app.use((req, res, next) => {
    res.end('ok')
})
const server = http.createServer(app)

server.listen(3000, () => console.log('server is running at http://127.0.0.1:3000'))