/*
入口JS
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

// 声明使用插件(安装插件)
Vue.use(VueResource) // 所有的vm和组件对象都多了一个属性: $http, 可以通过它的get()/post()发ajax请求

// 创建vm
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {App}, // 映射组件标签
  template: '<App/>' // 指定需要渲染到页面的模板
})
