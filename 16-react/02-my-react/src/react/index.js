
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
    constructor(props){
        this.props = props
        this.state = {}
    }
}
const React = {
    createElement,
    Component
}
export default React

export { Component }