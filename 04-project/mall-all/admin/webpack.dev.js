// webpack.dev.js

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',//内容的目录,将dist目录下的文件serve到localhost:8080下运行
        port: 3001,//服务运行的端口
        open: true,//自动打开浏览器窗口
        historyApiFallback: true,
        //配置代理解决跨域问题
        proxy: {
            //所有以/v1开头的请求会被代理到服务器http://127.0.0.1:3000上
            '/v1': 'http://127.0.0.1:3000'
        }
    }
})