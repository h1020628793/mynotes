const { Readable } = require('stream');

class CustomReadableStream extends Readable{
    constructor(){
        super()
        this.index = 0
    }
    //当有监听'data'事件是,该方法会被循环调用直到数据读完
    _read(){
        this.index++
        if(this.index > 5){
            //push方法继承自Readable,每一次调用相当于发送一段数据
            //如果参数不是null,参数就是发送的数据,这个时候会触发'data'事件,并把数据做为参数传递出去
            //如果参数是null表明没有数据可以发送了,这个时候会触发'end'事件
            this.push(null)
        }else{
            let str = this.index + ''
            this.push(str)
        }
    }
}

const rs = new CustomReadableStream()

//用于保存所有的数据
let body = ''

//每次读完一段数据后就会触发data事件,其实就是_read里面的this.push(str)方法
rs.on('data',chuck=>{
    body += chuck
})

//当数据读取完毕时触发end事件,其实就是_read里面的this.push(null)方法
rs.on('end',()=>{
    //使用所有的数据
    console.log(body);//12345
})