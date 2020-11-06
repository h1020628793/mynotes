/*
 * @Author: Tom
 * @Date: 2020-09-12 16:12:51
 * @LastEditTime: 2020-09-15 11:10:04
 */
;(function(window){
    var tQuery = function(selector){
        return new tQuery.fn.init(selector)
    }
    tQuery.fn = tQuery.prototype = {
        constructor: tQuery,
        tquery:'1.0.0',
        init: function (selector){
            selector = tQuery.trim(selector)
            if (!selector){
                return this
            }
            if (tQuery.isFunction(selector)){
                this[0] = document
                this.length = 1
                document.addEventListener('DOMContentLoaded',function(){
                    selector()
                })
            } else if (tQuery.isString(selector)){
                //如果是html
                if(tQuery.isHTML(selector)){
                    var tempDom = document.createElement('div')
                    tempDom.innerHTML = selector;
                    [].push.apply(this, tempDom.children)
                    this.length = tempDom.children.length
                }
                //如果是选择器
                else{
                    var doms = document.querySelectorAll(selector);
                    [].push.apply(this, doms);
                    this.length = doms.length;
                    this.selector = selector
                }
            }else if(tQuery.isArray(selector)){
                [].push.apply(this, selector);
                this.length = selector.length;
            }else{
                this[0] = selector
                this.length = 1
            }
            return this
        },
        toArray:function(){
            return [].slice.call(this)
        },
        get:function(num){
            num = parseInt(num)
            if(!isNaN(num)){
                if(num >= 0){
                    return this[num]
                }
                //3 
                //-1 2
                //-2 1
                //-3 0
                else{
                    return this[this.length + num]
                }
            }else{
                return this.toArray()
            }
        },
        each:function(fn){
            return tQuery.each(this,fn)
        },
        map:function(fn){
            return tQuery(tQuery.map(this,fn))
        }
    }

    tQuery.extend = tQuery.fn.extend = function(obj){
        for(var key in obj){
            this[key] = obj[key]
        }
    }
    //静态方法
    tQuery.extend({
        trim:function(arg){
            if (tQuery.isString(arg)) {
                return arg.replace(/^\s|\s$/g, '')
            }else{
                return arg
            }
        },
        isFunction: function (arg) {
            return typeof arg === 'function'
        },
        isString: function (arg) {
            return typeof arg === 'string'
        },
        isHTML:function(arg){
            return arg.charAt(0) == '<' && arg.charAt(arg.length - 1) == '>' && arg.length > 2
        },
        isArray:function(arg){
            return tQuery.isObject(arg) && 'length' in arg
        },
        isObject:function(arg){
            return typeof arg === 'object'
        },
        each:function(arr,fn){
            if(tQuery.isArray(arr)){
                for(var i = 0,len = arr.length;i<len;i++){
                    var res = fn.call(arr[i],i,arr[i])
                    if(res == false){
                        break
                    }else if(res == true){
                        continue
                    }
                }
            }else{
                for(var key in arr){
                    var res = fn.call(arr[key], key, arr[key])
                    if (res == false) {
                        break
                    } else if (res == true) {
                        continue
                    } 
                }
            }
            return arr
        },
        map:function(arr,fn){
            var resArr = []
            if (tQuery.isArray(arr)) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    var res = fn(arr[i],i)
                    if(res){
                        resArr.push(res)
                    }
                }
            }else{
                for(var key in arr){
                    var res = fn(arr[key],key)
                    if(res){
                        resArr.push(res)
                    }
                }
            }
            return resArr;
        }
    })
    tQuery.fn.extend({
        css:function(arg1,arg2){
            if(tQuery.isString(arg1)){
                //获取
                if(arguments.length == 1){
                    if (this[0].currentStyle){
                        return this[0].currentStyle[arg1]
                    }else{
                        return getComputedStyle(this[0],false)[arg1]
                    }
                }
                //设置
                else if(arguments.length == 2){
                    this.each(function(){
                        this.style[arg1] = arg2
                    })
                }
            }
            //设置
            else if(tQuery.isObject(arg1)){
                for(var key in arg1){
                    this.each(function () {
                        this.style[key] = arg1[key]
                    })  
                }
            }
            return this
        }
    })
    
    tQuery.fn.init.prototype = tQuery.fn

    window.tQuery = window.$ = tQuery
})(window)