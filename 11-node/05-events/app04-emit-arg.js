const EventEmitter = require('events')
class CustomEventEmitter extends EventEmitter {

}
const emitter = new CustomEventEmitter()

emitter.on('test1',(arg1,arg2)=>{
    console.log(arg1, arg2);//a b
})
emitter.emit('test1', 'a', 'b')

emitter.on('test2', (arg1, arg2) => {
    console.log(arg1, arg2);//a b
})

const args = ['a','b']
emitter.emit('test2', ...args)

emitter.on('test3', (...arg) => {
    console.log(arg);//[ 'a', 'b' ]
})
emitter.emit('test3', 'a','b')