const EventEmitter = require('events')

/*
const emitter = new EventEmitter()

emitter.on('test',()=>{
    console.log('fn...');
})

console.log('after emitter...');

emitter.emit('test')
*/

class CustomEventEmitter extends EventEmitter{

}

const emitter = new CustomEventEmitter()

emitter.on('test', () => {
    console.log('fn...');
})

console.log('after emitter...');

emitter.emit('test')