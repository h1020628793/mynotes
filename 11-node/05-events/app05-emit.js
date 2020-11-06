const EventEmitter = require('events')
class CustomEventEmitter extends EventEmitter {

}
const emitter = new CustomEventEmitter()

emitter.on('test',()=>{
    console.log('fn1...');
})

emitter.on('test', () => {
    console.log('fn2...');
})

emitter.emit('test')
/*
fn1...
fn2...
*/