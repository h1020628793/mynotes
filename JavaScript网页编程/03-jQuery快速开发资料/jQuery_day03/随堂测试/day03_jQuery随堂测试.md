## 1.考点：jQuery 事件注册

多选题

关于jQuery事件事件注册,以下描述正确的是:

A，点击事件绑定，jQuery中仅有 click() 一种绑定形式

B，jQuery中的click()，不会出现事件逻辑覆盖。

C，jQuery中的click()，一定会出现事件逻辑覆盖。

D，以上答案均不正确。

答案: B

解析: 

A选项，除了click()还有bind() / delegate() / on() 方法，都可以绑定click事件

C选项，click() 不会出现事件逻辑覆盖

难度: ☆☆☆ 

 







## 2.考点：jQuery 事件处理

多选题

下列方法，可以获取 input 中value属性的方法是:

A，on()可以给元素绑定多个事件，且可以做事件委托，为动态元素绑定事件

B，off()可以解绑事件上的逻辑

C，trigger()和triggerHandler()的不同之处在于后者不会触发浏览器的默认行为

D，以上说法至少有一个是错的

答案: ABC

解析: 

​	前三项无任何一项错误。

​	B选项，类似 innerText 属性

​	C选项，类似value属性

难度: ☆☆☆





## 3.考点：jQuery 事件对象

多选题

下列 jQuery 的中的事件对象event，说法正确的是:

A，jQuery中的事件对象event，兼容性更好，获取更方便

B，jQuery中的事件对象event是在DOM中的event对象基础上封装的，但是属性名和方法名全部类似

C，jQuery中的event.preventDefault()可以阻止浏览器的默认行为

D，jQuery中的event.stopPropagation()可以阻止事件传播

答案: ABCD

解析: 

​	B选项，html() 识别标签，所以也可以用它创建元素。

​	C选项，append() 和 prepend() 前者添加到父元素的最末尾，后者添加到最前面。

难度: ☆☆☆

 





## 4.考点：jQuery 拷贝对象

多选题

以下说法，正确的是：

A，jQuery中的可以使用$.extend()实现对象拷贝

B，$.extend()的第一个参数为复制的时候选择深层还是浅层复制，深层复制则属性中的复杂数据类型会被重新创建一份儿

C，$.extend()的第二个参数开始是将要拷贝的对象，未来即将被合并。

D，$.extend()的最后一个参数是合并的目标对象，所有合并的对象信息都会出现在这个对象当中。

答案: AB

解析: 

CD选项: 解释错误，说法反了正确说法为：

​	$.extend()的第二个参数是合并的目标对象，所有合并的对象信息都会出现在这个对象当中。

 	$.extend()的最后一个参数是将要拷贝的对象，未来即将被合并。

难度: ☆☆☆ 







## 5.考点：jQuery 多库共存



单选题

下列 jQuery 方法，描述正确的是：

A，一个项目中，无法同时使用多个版本的jQuery

B，jQuery的顶级对象只能使用jQuery或者$，无法进行修改

C，$.noConflict()或者jQuery.noConflict()可以实现jQuery的多库共存

D，一个项目，没有同时存在多个版本的jQuery的必要

答案: C

解析: 

AB选项，jQuery是可以多库共存的，也就是可以同时存在多个jQuery版本，且顶级对象可以自定义。

D选项，一个项目中同时存在多个版本的jQuery就可以使用不同版本jQuery的特性，是有必要的，且大型项目开发存在遗留问题，非常容易出现多库共存。

难度: ☆☆☆







## 6.考点：jQuery 插件

单选题

下列有关jQuery插件的说法正确的是：

A，jQuery的插件机制没用，没必要使用插件

B，jQuery的插件使用本质就是: 使用别人已经写好的代码复制html 、 css、js，调整必要的参数就可以实现很强大的功能

C，bootstrap是一个开源框架，可以不依赖jQuery独立运行，所以不包含所谓的插件

D，以上答案均正确

答案：B

解析：

A选项，jQuery插件是jQuery非常强大的组成部分，很多插件可以直接在项目中修改并使用

D选项，bootstrap是基于jQuery实现的框架，包含很多插件。

难度: ☆☆☆







## 7.考点：代码题

单选题

运行下面代码，点击li标签后，正确的输出结果是：

```javascript
<body>
  	<ul>
        <li>我是原生土著li1</li>
        <li>我是原生土著li2</li>
        <li>我是原生土著li3</li>
        <li>我是原生土著li4</li>
        <li>我是原生土著li5</li>
    </ul>

	<script>
        $(function () {
            $("li").on("click",fn1)
            $("li").on("click",fn2)
            $("li").on("click",fn3)

            $("li").off("click",fn2);

            //总结：怎么绑定的事件怎么解绑;(一把钥匙开一把锁)

            function fn1(){
                console.log(111);
            }
            function fn2(){
                console.log(222);
            }
            function fn3(){
                console.log(333);
            }
        });
    </script>
</body>
```

A，111 和 222

B，111 和 333

C，222和 333

D，无任何输出

答案：B

解析：

B选项，off只是解绑了 fn2 逻辑，所以点击li后，fn1和fn3的逻辑依然会执行

难度: ☆☆☆☆

