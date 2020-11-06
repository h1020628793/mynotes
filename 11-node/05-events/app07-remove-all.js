const EventEmitter = require('events')
class CustomEventEmitter extends EventEmitter {

}
const emitter = new CustomEventEmitter()

const listener1 = () => {
    console.log('fn1...');
}

const listener2 = () => {
    console.log('fn2...');
}

const listener3 = () => {
    console.log('fn3...');
}

emitter.on('test1', listener1)
emitter.on('test1', listener1)
emitter.on('test2', listener2)
emitter.on('test3', listener3)

emitter.removeAllListeners('test1')

emitter.emit('test1')
emitter.emit('test2')
emitter.emit('test3')
/*
fn2...
fn3...
*/