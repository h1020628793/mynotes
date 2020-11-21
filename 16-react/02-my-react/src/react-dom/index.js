import React from "../react"
import {Component} from '../react'

/**
 * 根据虚拟DOM生成一个真实的DOM节点并且返回
 * @param {虚拟DOM} vdom
 */
export function createDom(vdom){
    // 如果没有虚拟DOM则直接返回
    if (vdom == undefined) return
    
    if (typeof vdom == 'number') vdom = String(vdom)

    // 如果是字符则返回一个文本节点
    if (typeof vdom == 'string'){
        return document.createTextNode(vdom)
    }
    // 如果是一个jsx的虚拟DOM,则构建DOM节点并返回
    else if(typeof vdom.tag == 'string'){
        //创建DOM
        const dom = document.createElement(vdom.tag)
        //设置DOM的属性
        if (vdom.props){
            for (let key in vdom.props) {
                setProperty(dom, key, vdom.props[key])
            }
        }
        //递归处理子节点
        if (vdom.children && vdom.children.length > 0){
            vdom.children.forEach(child=>render(child,dom))
        }
        //返回DOM
        return dom
    }
    // 如果是一个组件
    else if(typeof vdom.tag == 'function'){
        //生成组件的实例
        const instance = createComponentInstance(vdom.tag,vdom.props)
        //生成实例对应的DOM节点
        createDomForComponentInstance(instance)
        //返回组件对应的DOM节点
        return instance.dom
    }  
}
/**
 * 创建组件的实例并且返回
 * @param {函数/组件的类} comp 
 * @param {属性} props 
 */
function createComponentInstance(comp, props){
    let instance
    //如果是类组件
    if(comp.prototype.render){
        instance = new comp(props)
    }
    //如果是函数组件
    else{
        instance = new Component(props)
        instance.constructor = comp
        instance.render = function(){
            return comp(props)
        }
    }
    return instance
}

/**
 * 根据组件的实例生成真实的DOM节点
 * @param {组件的实例} instance 
 */
function createDomForComponentInstance(instance){
    //获取到虚拟DOM并且挂载到组件实例上
    instance.vdom = instance.render()

    //生成真实的DOM节点
    instance.dom = createDom(instance.vdom)

}
/**
 * 给DOM节点添加属性
 * @param {DOM节点} dom 
 * @param {属性名称} key 
 * @param {属性值} value 
 */
function setProperty(dom,key,value){
    key.startsWith('on') && (key = key.toLowerCase())
    //针对属性是style的处理
    if (key == 'style' && value){
        if(typeof value == 'string'){
            dom.style.cssText = value
        }else if(typeof value == 'object'){
            for(let attr in value){
                dom.style[attr] = value[attr]
            }
        }
    }
    //属性是style以外的处理
    else{
        if(value){
            dom[key] = value
        }else{
            dom.removeAttribute(key)
        }
    }
}
/**
 * 把虚拟DOM转换为真实的DOM然后挂载到容器中
 * @param {虚拟DOM} vdom 
 * @param {挂载的容器} container 
 */
function render(vdom,container){
    //把虚拟DOM转换为真实的DOM节点
    const dom = createDom(vdom)
    //把虚拟DOM对应的真实DOM节点挂载到容器上
    container.appendChild(dom)
}

const ReactDOM = {
    render
}

export default ReactDOM