; (function ($) {
    $('#btn-update-pwd').on('click', function () {
        var inputPassword = $('#password').val()
        var inputRepPassword = $('#repassword').val()
        var passwordReg = /^\w{3,6}$/
        var $err = $('.text-danger')
        if (!passwordReg.test(inputPassword)) {
            $err.eq(0).html('密码为3-6个任意字符')
            return false
        } else {
            $err.eq(0).html('')
        }
        if (inputPassword != inputRepPassword) {
            $err.eq(1).html('两次密码不一致')
            return false
        } else {
            $err.eq(1).html('')
        }
    })
})(jQuery)