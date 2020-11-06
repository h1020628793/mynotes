const EventEmitter = require('events')
class CustomEventEmitter extends EventEmitter {

}
const emitter = new CustomEventEmitter()
console.log(emitter.on === emitter.addListener);//true

emitter.on('test1',()=>{
    console.log('fn1...');
})
emitter.emit('test1')
emitter.emit('test1')
/*
fn1...
fn1...
*/

emitter.addListener('test2',()=>{
    console.log('fn2...')
})
emitter.emit('test2')
emitter.emit('test2')
/*
fn2...
fn2...
*/


emitter.once('test3',()=>{
    console.log('fn3...')
})
emitter.emit('test3')
emitter.emit('test3')
/*
fn3...
 */

