// const timer = setTimeout(()=>{
//     console.log('fn...');
// },100)
// // console.log(timer);
// clearTimeout(timer)

// const timer = setInterval(()=>{
//     console.log(1);
// },100)

// clearInterval(timer)

const handSyncTask1 = ()=>{
    console.log('sync task1...');
}
const handSyncTask2 = () => {
    console.log('sync task2...');
}
setImmediate(handSyncTask1)
process.nextTick(handSyncTask2)

// setTimeout(handSyncTask1,0)



console.log('after...');

