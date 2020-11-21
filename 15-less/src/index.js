import './index.less'

    ; (function (win, doc) {
        // 1rem = 1个根元素(html)的font-size
        // 元素需要显示的大小和设备的宽度成正比
        // 设备越宽 个根元素(html)的font-size 越大
        var root = document.getElementsByTagName('html')[0];
        function refreshFontSize() {
            var width = doc.body.clientWidth || doc.documentElement.clientWidth;
            var fontSize = width / 10;//除以10是为了计算方便,其实就是把根元素的font-size设置为屏幕宽度的1/10,相当于一个rem就是屏幕宽度的1/10
            root.style.fontSize = fontSize + 'px';
        }
        win.addEventListener('resize', refreshFontSize, false);
        // win.addEventListener('load',refreshFontSize,false);
        win.addEventListener('DOMContentLoaded', refreshFontSize, false);
    })(window, document);