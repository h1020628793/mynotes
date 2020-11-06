const EventEmitter = require('events')
class CustomEventEmitter extends EventEmitter {

}
const emitter = new CustomEventEmitter()

//newListener这个事件是NodeJs提供的,当有新的事件被监听的时候触发该事件
emitter.on('newListener', (eventName, listener)=>{
    console.log('eventName:', eventName);//eventName: test
    listener()//fn...
})

emitter.on('test',()=>{
    console.log('fn...');
})