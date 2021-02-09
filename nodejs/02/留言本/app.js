//1.首先引入http模块和文件模块,然后创建服务器和端口号
//2.判断url的请求头是否为'/'，这样才可以访问页面，之后读取页面所在的路径
//3.然后处理静态资源，用url.indexOf()方法来判断
//4.之后写找不到页面的文件并且读取
//5.写点击发表评论跳转到发表页面
//6.先判断跳转页面的url，之后去index.html中修改设置的a链接和返回首页的a链接
//7.之后处理发表的评论，动态添加到页面当中，在index.html中，用模板引擎替换。
//8.利用form中的action属性来自动提交表单数据
//9.之后引入url模块，截取问号之前的pinlun的url，之后判断，读取数据
//10利用url.parse('url',true)方法来截取问号前面的url  ,把第二个参数设置成true，可以自动把问号后边的转为对象,之后通过query属性来访问
//11.之后拿到查询之后的数据，push到comments评论的数组中


var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

var comments = [{
        name: '张1',
        message: '今天天气不错',
        dateTime: Date.now()
    },
    {
        name: '张2',
        message: '今天天气不错',
        dateTime: Date.now()
    }, {
        name: '张三',
        message: '今天天气不错',
        dateTime: Date.now()
    }, {
        name: '张三',
        message: '今天天气不错',
        dateTime: Date.now()
    }, {
        name: '张三',
        message: '今天天气不错',
        dateTime: Date.now()
    }, {
        name: '张三',
        message: '今天天气不错',
        dateTime: Date.now()
    }
]
http
    .createServer((req, res) => {
        var parseObj = url.parse(req.url, true)
        var pathname = parseObj.pathname
        if (pathname === '/') {
            fs.readFile('./views/index.html', (error, data) => {
                    if (error) {
                        return res.end('404 Not Found')
                    }
                    var htmlstr = template.render(data.toString(), {
                        comments: comments
                    })
                    res.end(htmlstr) //end既可以接受二进制也可以接收字符串，需要判断是否需要转
                })
                //处理静态资源
        } else if (pathname === '/post') { //之后去index.html中改发表评论的a链接
            fs.readFile('./views/post.html', (error, data) => {
                if (error) {
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        } else if (pathname.indexOf('/public/') === 0) {
            fs.readFile('.' + pathname, (error, data) => {
                if (error) {
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        } else if (pathname === '/pinglun') {

            var comment = parseObj.query
            comment.dateTime = Date.now()
            comments.unshift(comment)

            //设置状态码，让客户端重定向
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()
        } else {
            fs.readFile('./views/404.html', (error, data) => {
                if (error) {
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        }

    })
    .listen(3000, () => {
        console.log('runing');
    })