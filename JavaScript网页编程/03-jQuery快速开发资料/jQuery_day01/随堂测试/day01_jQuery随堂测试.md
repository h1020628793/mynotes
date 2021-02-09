## 1.考点：jQuery入口函数和顶级对象

单选题

关于jQuery,以下描述正确的是:

A，$(function(){})这种入口函数等同于window.load

B，$(window).ready(function(){})这种入口函数等同于window.load

C， jQuery中的入口函数相当于JS中的DOMContentLoaded事件，因此jQuery无法实现window.onload同样的功能

D， jQuery中的顶级对象$和jQuery是一回事儿

答案: D

解析: 选项ABC，都错了，正确写法为\$(window).load()；D选项，是正确的可以验证 console.log( \$=== jQuery)

难度: ☆☆ 

 







## 2.考点：jQuery对象和DOM对象

单选题

关于获取元素,以下获取到单个元素的方法是:

A，jQuery对象就是DOM对象

B，jQuery对象可以转换为DOM对象，但是DOM对象无法转换为jQuery对象

C， jQuery对象转换为DOM对象的方法有两种：jQuery对象[索引值]和jQuery对象.get(索引值)

D， DOM对象转换成jQuery对象的方法有一种：$(DOM对象)[0]

答案: C

解析: 

​	A选项，jQuery对象和DOM对象不一样。

​	B选项，jQuery对象和DOM对象可以相互转换。

​	D选项，后面多出来一部分：[0]

难度: ☆☆☆





## 3.考点：jQuery选择器

多选题

关于获取元素,以下获取到"目标元素"所在a链接的有:

```html
<div>
  <ul>
    <li>
    	<a href='#' class='aaa' id='ccc'>皮鞋</a>
    </li>
    <li>
    	<a href='#' class='bbb' id='bbb'>帽子</a>
    </li>
    <li>
    	<a href='#' class='ccc' id='aaa'>目标元素</a>
    </li>
  </ul>
</div>
```



A，$('ul li a:eq(3)')

B，$('ccc')

C，$('#aaa')

D，$('a:last')

答案: CD

解析: A选项索引值应该为 2 ;    B选项类名前应该加点。

难度: ☆☆

 





## 4.考点：jQuery样式操作

多选题

以下说法，正确的是：

A，css() 既可以获取属性值，也可以设置属性值。

B，css() 有两种设置属性值方式，一种是传递两个参数第一个属性，第二个值；第二种可以传递一个对象，对象中属性和值以键值对形式存在。

C，jQuery中有三种常见的类操作方法：addClass() / removeClass() / toggleClass();

D，addClass()不会像原生js中的className属性一样覆盖原有的属性值。

答案: ABCD

解析: 全部正确

难度: ☆☆☆ 









## 5.考点: jQuery动画效果

多选题

关于动画效果，下列描述正确的是：

A，show()和hide()所能完成的效果，toggle()可以切换完成。

B，slideDown()和slideUp()和slideToggle()可以设置动画完成时间。

C，fadeIn()和fadeOut()和fadeToggle()和fadeTo()是可以设置回调函数的，于动画完成后执行。

D，以上说法至少有一项是错误的。

答案: ABC

解析: ABC均正确，则D错误。

难度: ☆☆







## 6.考点：jQuery自定义动画

多选题

关于自定义动画，说法正确的是：

A，自定义动画可以设置4个参数分别为：样式，时间，动画类型，回调函数

B，animate()中，除了样式其他参数都可以省略或自带默认值 

C，回调函数的执行，实在所有样式全部达到目标值后才执行的

D，animate()可以模拟显示隐藏、滑入滑出、淡入淡出等动画，使用原则为哪个方便用哪个

答案：ABCD

解析：全部正确。

难度: ☆☆☆







## 7.考点：综合题

多选题

下列说法，错误的是：

A，连式编程和隐式迭代是 jQuery 的两大优点，能够达到快速开发的目的。

B，stop() 用于停止动画队列，设置动画之前可先停止动画排队，这样可以避免动画堆积。

C，有了 hover() 事件，就没有必要再使用 mouseenter() / mouseleave() 了。

D，利用 jQuery 实现排他思想的思路是: 先统一设置所有元素的样式，然后找出特殊的单独处理。

答案：CD

解析：AB选项为正确选项。

C选项错误在hover() 如果只传递一个函数那么鼠标进入和移出都执行同一个函数，没有两个事件单独写灵活，且有些复杂逻辑，可能只需要绑定某一个特定事件。

D选项错误在于，jQuery实现排他思想是特殊元素特殊处理，其他兄弟元素单独处理。

难度: ☆☆☆☆

