## 1.考点：jQuery 属性操作

单选题

关于jQuery,以下描述正确的是:

A，prop() 可以获取和设置普通属性，但是表单属性 disabled / selected / checked 等就无能为力了。

B，attr() 可以获取和设置普通属性，但是自定义属性就无能为力了。

C， data()可以自定义属性，且不会出现在标签上。

D，以上答案均正确。

答案: C

解析: 

A选项，prop() 可以操作表单属性 disabled / selected / checked等，且只适合他操作。

B选项，attr() 可以自定义属性。

难度: ☆☆☆ 

 







## 2.考点：jQuery 文本属性值

单选题

下列方法，可以获取 input 中value属性的方法是:

A，html()

B，text()

C，val()

D，三个方法都不可以

答案: C

解析: 

​	A选项，类似 innerHTML 属性

​	B选项，类似 innerText 属性

​	C选项，类似value属性

难度: ☆☆





## 3.考点：jQuery 元素操作

多选题

下列 jQuery 的元素操作，说法正确的是:

A，each() 可以遍历jQuery对象中的每一个元素，但是回调函数中的对象为DOM对象。

B，jQuery 创建元素只有 $('标签') 这一种方法。

C，append() 和 prepend() 功能完全相同，可以交换使用。

D，remove() 和 html() 都可以删除元素。

答案: AD

解析: 

​	B选项，html() 识别标签，所以也可以用它创建元素。

​	C选项，append() 和 prepend() 前者添加到父元素的最末尾，后者添加到最前面。

难度: ☆☆☆

 





## 4.考点：jQuery 的尺寸操作

多选题

以下说法，正确的是：

A，height() 既可以获取 height 值，也可以设置 height 值。

B，css('height')和height()获取的结果完全一样，只不过 height() 更简单一点儿。

C，height() 和 innerHeight() 和 outerHeight() 方法获取的盒子属性不一样。

D，以上说法都正确。

答案: AC

解析: 

B选项: css('height')获取的是字符串带有单位，height() 获取的是数值，无单位。

难度: ☆☆☆ 









## 5.考点: jQuery 位置操作

多选题

下列 jQuery 方法，描述错误的是：

A，offset()方法用于获取盒子距离整个页面的距离，和父盒子是否有定位没有关系。

B，position()获取的是距离所有父盒子中，嵌套自己最近的父盒子的距离，可以获取，也可以赋值。

C，scrollTop()和scrollLeft()可用于获取盒子或者页面顶部和左侧的超出（或者卷起）部分。

D，animate()可以让页面滑动到顶端或者指定位置，使用方法需要两个参数：animate( scrollTop, 值 ) ; 

答案: BD

解析: 

B选项，position() 只能获取值，不能赋值。

D选项，animate() 滑动页面的正确用法是传递一个对象：animate( {scrollTop: 值} )

难度: ☆☆☆☆







## 6.考点：代码题

单选题

运行一下代码，正确的输出结果是：

```javascript
<body>
  	<style>
        div {
            height: 100px;
            width: 200px;
            background-color: pink;
            margin: 10px;
            padding: 20px;
            border: 10px solid red;
        }
    </style>

    <div></div>
    <script	src='http://code.jquery.com/jquery-latest.js'>
    <script>
        $(function() {
            console.log($("div").innerWidth());
        })
    </script>
</body>

```

A，120

B，140px

C，220

D，240

答案：D

解析：

1. innerWidth() / innerHeight()  获取设置元素 width和height + padding 大小 
2. 不带单位

难度: ☆☆☆







## 7.考点：综合题

多选题

下列说法，错误的是：

A，attr()和prop()都可以操作普通属性，前者更适合自定义属性操作，后者更适合操作表单属性disabled、selected、checked等。

B，html() 和text() 功能一样，可以替换使用。

C，after() 是把调用者作为父元素，把参数作为子元素，放到调用者的最末尾。

D，scrollTop() 操作页面时，只可以获取页面被卷去的部分，不能赋值修改页面的显示位置。

答案：BCD

解析：

B选项，错误在于html()识别标签，text()不识别标签。

C选项，错误在于after()方法是以兄弟节点的形式插入节点。

D选项，scrollTop() 既可以获取页面被卷去的部分，也可以进行赋值修改。

难度: ☆☆☆☆

