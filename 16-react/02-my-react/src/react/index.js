import { createDom } from '../react-dom'
//虚拟DOM的类
class Element{
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

    }
}
const React = {
    createElement,
    Component
}
export default React

export { Component }