const stateQueue = [] //保存组件和需要更新的state的对象的队列
const compQueue  = [] //去除重复保存需要更新的组件实例

/**
 * 把需要更新的state对象和需要更新的组件对象放入到队列中
 * @param {需要更新的state对象} updatedState 
 * @param {需要更新的组件对象} comp 
 */
export function enqueue(updatedState,comp){
    //第一次或者队列清空后添加异步执行
    if(stateQueue.length == 0){
        setTimeout(flush,0)
    }
    stateQueue.push({
        updatedState,
        comp
    })

    let hasComp = compQueue.some(item=>item == comp)
    if (!hasComp){
        compQueue.push(comp)
    }
   
}

//清空队列
function flush(){
    let item,comp
    //统一合并需要更改的state
    while (item = stateQueue.shift()) {
        const { updatedState,comp} = item
        Object.assign(comp.state,updatedState)
    }
    //统一更新
    while(comp = compQueue.shift() ){
        comp.update()
    }

}