(function(window){
    //定义tQuery构造函数
    var tQuery = function(selector){
        return new tQuery.fn.init(selector);
    }
    //tQuery.fn指向tQuery的原型对象
    tQuery.fn = tQuery.prototype = {
        constructor: tQuery,
        //version
        tquery:'1.0.0',
        //tQuery.fn.init是生成tQuery对象的构造函数
        init: function (selector) {
            //实现核心函数
            var selector = tQuery.trim(selector);
            //布尔值是假的情况返回空的tQuery对象
            if (!selector) {
                return this;
            }
            //如果是函数的话返回有document的tQuery对象,当页面所有的DOM节点加载完毕后执行传入的函数
            else if (tQuery.isFunction(selector)) {
                document.addEventListener('DOMContentLoaded', function () {
                    selector();
                });
                this[0] = document;
                this.length = 1;
            //处理字符串 
            } else if (tQuery.isString(selector)) {
                //HTML代码处理
                if (tQuery.isHTML(selector)) {
                    var tempDom = document.createElement('div');
                    tempDom.innerHTML = selector;
                    [].push.apply(this, tempDom.children);
                    this.length = tempDom.children.length;
                //选择器处理 
                } else {
                    var doms = document.querySelectorAll(selector);
                    [].push.apply(this, doms);
                    this.length = doms.length;
                    this.selector = selector;
                }
            }
            //处理数组
            else if (tQuery.isArray(selector)) {
                [].push.apply(this, selector);
                this.length = selector.length;
            }
            //其他情况处理(比如对象类型)
            else {
                this[0] = selector;
                this.length = 1;
            }
            return this
        },
        //假数组转真数组
        toArray: function () {
            return [].slice.call(this);
        },
        //获取tQuery对象的DOM节点
        get: function (num) {
            //数字
            if(tQuery.isNumber(num)){
                //正数
                if (num >= 0) {
                    return this[num];
                 //负数	
                } else {
                    return this[this.length + num]
                }
            }
            //非空
            else if(num){
                return undefined;
            }
            //空
            else{
                return this.toArray();
            }
        },
        each: function (fn) {
            return tQuery.each(this, fn);
        },
        map: function (fn) {
            return tQuery(tQuery.map(this, fn));
        }           
    }

    tQuery.extend = tQuery.fn.extend = function (obj) {
        for (var key in obj) {
            this[key] = obj[key];
        }
    }
    //tQuery的静态方法
    tQuery.extend({
        trim: function (str) {
            if (tQuery.isString(str)) {
                return str.replace(/^\s+|\s+$/g, '');
            } else {
                return str;
            }
        },        
        isFunction: function (str) {
            return typeof str === 'function';
        },
        isString: function (str) {
            return typeof str === 'string';
        },
        isHTML: function (str) {
            return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3;
        },
        isArray: function (str) {
            return tQuery.isObject(str) && length in str
        },
        isObject: function (str) {
            return typeof str === 'object';
        },
        isNumber: function(str){
            return !isNaN(parseInt(str))
        },
        //遍历         
        each: function (arr, fn) {
            if (tQuery.isArray(arr)) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    var res = fn.call(arr[i], i, arr[i]);
                    if (res == false) {
                        break;
                    } else if (res == true) {
                        continue;
                    }
                }
            } else {
                for (var key in arr) {
                    var res = fn.call(arr[key], key, arr[key]);
                    if (res == false) {
                        break;
                    } else if (res == true) {
                        continue;
                    }
                }
            }
            return arr;
        },
        //映射
        map: function (arr, fn) {
            var resArr = [];
            if (tQuery.isArray(arr)) {
                for (var i = 0 ,len = arr.length; i < len; i++) {
                    var res = fn(arr[i], i);
                    if (res) {
                        resArr.push(res);
                    }
                }
            } else {
                for (var key in arr) {
                    var res = fn(arr[key], key);
                    if (res) {
                        resArr.push(res);
                    }
                }
            }
            return resArr;
        }        
    })
    //tQuery的实例方法
    tQuery.fn.extend({
        css: function (arg1, arg2) {
            if (tQuery.isString(arg1)) {
                if (arguments.length == 1) {
                    if (this[0].currentStyle) {//兼容低版本浏览器
                        return this[0].currentStyle[arg1];
                    } else {
                        return getComputedStyle(this[0], false)[arg1];
                    }
                } else if (arguments.length == 2) {
                    this.each(function () {
                        this.style[arg1] = arg2;
                    });
                }
            } else if (tQuery.isObject(arg1)) {
                this.each(function () {
                    for (var key in arg1) {
                        this.style[key] = arg1[key];
                    }
                });
            }
            return this;
        }
    })            
    //生成tQuery对象的构造函数的原型对象指向tQuery的原型对象
    tQuery.fn.init.prototype = tQuery.fn;
    //挂载tQuery构造函数
    window.tQuery = window.$ = tQuery;
})(window);