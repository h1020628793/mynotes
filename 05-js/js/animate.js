/*
* @Author: Tom
* @Date:   2020-08-10 08:48:04
* @Last Modified by:   Tom
* @Last Modified time: 2020-08-10 08:48:13
*/
function animate(elem,attr,target,callback){
    clearInterval(elem.timer)
    var speed = 0
    elem.timer = setInterval(function(){
        var current = parseFloat(getComputedStyle(elem,false)[attr])
        
        if(attr == 'opacity'){
            current = Math.round(100 * current)
        }

        if(current > target){
            speed = -10
        }else{
            speed = 10
        }

        if(Math.abs(target - current) < Math.abs(speed)){
            if(attr == 'opacity'){
                elem.style.opacity = target / 100
            }else{
                elem.style[attr] = target + 'px'
            }
            clearInterval(elem.timer)
            typeof callback == 'function' ? callback() : null
        }else{
            if(attr == 'opacity'){
                elem.style.opacity = (current + speed) / 100
            }else{
                elem.style[attr] = current + speed + 'px'
            }
        }
    },30)
}