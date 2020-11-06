const { Writable } = require('stream');
//Writable继承EventEmitter
class CustomWritableStream extends Writable {
    //这个方法由Writable的write方法来调用
    //第一个参数是数据的Buffer
    //第二个参数是buffer
    //第三个参数是write的回调函数
    _write(chunk, encoding, callback) {
        console.log('chunk', chunk)
        console.log('encoding', encoding)
        callback && callback()
    }
}
const ws = new CustomWritableStream()
//当调用ws.end()方法时由该方法内部触发'finish'事件
ws.on('finish', () => {
    console.log('finish....');
})
//ws.write方法是向流中写入数据,该方法继承自Writable
//具体写的方法由_write来实现,也就是说在Writable的write方法中会调用_write方法
ws.write('hello', 'utf-8', () => {
    console.log('after write....');
})
//ws.end方法是关闭流同时如果传参的话也可以写入数据,该方法继承自Writable
//在该方法内部当流关闭后会触发一个叫做'finish'的事件
ws.end('done')



