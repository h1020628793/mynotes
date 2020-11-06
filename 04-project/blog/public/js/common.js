; (function ($) {
    //注册面板和登陆面板的相互切换
    var $registerWrap = $('#register-wrap')
    var $loginWrap = $('#login-wrap')
    
    //从登陆面板切换到注册面板
    $('#goto-register').on('click',function(){
        $loginWrap.hide()
        $registerWrap.show()
    })
    //从注册面板切换到登陆面板
    $('#goto-login').on('click',function(){
        $registerWrap.hide()
        $loginWrap.show()
    })

    //公用的验证正则
    //用户名以英文字符开头,总共3-6个字符包括数字英文和下划线
    var userNameReg = /^[a-z][a-z0-9_]{2,5}$/
    //密码为3-6个任意字符
    var passwordReg = /^\w{3,6}$/
    //用户注册
    $('#sub-register').on('click',function(){
        //1.获取表单数据
        var inputUsername = $('#regInputUsername').val()
        var inputPassword = $('#regInputPassword').val()
        var inputRepPassword = $('#regInputRepPassword').val()
        var $err = $registerWrap.find('.text-danger')
        //2.验证
        var errMsg = ''
        if (!userNameReg.test(inputUsername)){
            errMsg = '用户名以英文字符开头,总共3-6个字符包括数字英文和下划线'
        } else if (!passwordReg.test(inputPassword)){
            errMsg = '密码为3-6个任意字符'
        } else if (inputPassword != inputRepPassword){
            errMsg = '两次密码输入不一致'
        }
        //验证不通过
        if (errMsg) {
            $err.html(errMsg)
            return false
        }
        $err.html('')
        //3.提交
        $.ajax({
            url:'/users/register',
            type:'POST',
            dataType:'json',
            data:{
                username: inputUsername,
                password: inputPassword
            },
            success:function(result){
                if(result.code == 0){
                    $('#goto-login').trigger('click')
                }else{
                    $err.html(result.message)
                }
            },
            error:function(){
                $err.html('服务器端错误')
            }
        })
    })
    //用户登录
    $('#sub-login').on('click', function () {
        //1.获取表单数据
        var inputUsername = $('#loginInputUsername').val()
        var inputPassword = $('#loginInputPassword').val()
        var $err = $loginWrap.find('.text-danger')
        //2.验证
        var errMsg = ''
        if (!userNameReg.test(inputUsername)) {
            errMsg = '用户名以英文字符开头,总共3-6个字符包括数字英文和下划线'
        } else if (!passwordReg.test(inputPassword)) {
            errMsg = '密码为3-6个任意字符'
        } 
        //验证不通过
        if (errMsg) {
            $err.html(errMsg)
            return false
        }
        $err.html('')
        //3.提交
        $.ajax({
            url: '/users/login',
            type: 'POST',
            dataType: 'json',
            data: {
                username: inputUsername,
                password: inputPassword
            },
            success: function (result) {
                if (result.code == 0) {
                    //刷新当前页面
                    window.location.reload()
                } else {
                    $err.html(result.message)
                }
            },
            error: function () {
                $err.html('服务器端错误')
            }
        })
    })    
})(jQuery)