/*
 * @Author: Tom
 * @Date: 2020-09-25 15:29:07
 * @LastEditTime: 2020-09-28 08:14:12
 */
; (function ($) {
    $('.del').on('click',function(){
        if(!window.confirm('您确定要删除吗?')){
            return false
        }
    })
})(jQuery)