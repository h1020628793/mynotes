const EventEmitter = require('events')
class CustomEventEmitter extends EventEmitter {

}
const emitter = new CustomEventEmitter()

console.log(emitter.removeListener === emitter.off);//true

const listener1 = ()=>{
    console.log('fn1...');
}

const listener2 = () => {
    console.log('fn2...');
}

const listener3 = () => {
    console.log('fn3...');
}
emitter.on('test', listener1)
emitter.on('test', listener2)
emitter.on('test', listener3)

emitter.off('test', listener1)
emitter.removeListener('test', listener2)

emitter.emit('test')
/*
fn3...
*/