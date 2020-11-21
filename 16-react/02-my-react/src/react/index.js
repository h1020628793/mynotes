import { createDom } from '../react-dom'
import {diff} from '../react-dom/diff'
import { patch} from '../react-dom/patch'
//虚拟DOM的类
export class Element{
    constructor(tag, props, children){
        this.tag = tag
        this.props = props
        this.children = children
    }
}
function createElement(tag,props,...children){
    return new Element(tag, props, children)

}

class Component{
    constructor(props = {}){
        this.props = props
        this.state = {}
    }
    setState(updatedState){
        /*
        //原始更新DOM的方法:整个替换
        //生成新的state
        Object.assign(this.state,updatedState)
        //生成新的虚拟DOM
        const newVdom = this.render()
        //生成新的DOM
        const newDom = createDom(newVdom)
        //用新的DOM替换原有的DOM
        if(this.dom.parentNode){
            this.dom.parentNode.replaceChild(newDom,this.dom)
            this.dom = newDom
        }
        */
        //找出新旧虚拟DOM之间的区别,然后只更新区别
        //生成新的state
        Object.assign(this.state, updatedState)
        //生成新的虚拟DOM
        const newVdom = this.render()
        //取出旧的虚拟DOM
        const oldVdom = this.vdom
        //通过diff算法找出新旧虚拟DOM之间的区别(需要更新的部分)        
        const pathes = diff(oldVdom,newVdom)
        //用区别更新现在的DOM节点
        patch(this.dom, pathes)
        this.vdom = newVdom
    }
}
const React = {
    createElement,
    Component
}
export default React

export { Component }