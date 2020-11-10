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
    //分页处理

    //构建文章列表的html
    function buildArticleHtml(docs){
        var html = ''
        for(var i = 0,len = docs.length;i<len;i++){
            html += `<div class="panel panel-default custom-panel article-panel">
                        <div class="panel-heading">
                            <a href="/detail/${docs[i]._id}">
                                <h3 class="panel-title">${docs[i].title}</h3>
                            </a>
                        </div>
                        <div class="panel-body">${docs[i].intro}</div>
                        <div class="panel-footer">
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                            <span class="footer-text text-muted">${docs[i].user.username}</span>
                            <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                            <span class="footer-text text-muted">${docs[i].category.name}</span>
                            <span class="glyphicon glyphicon-time" aria-hidden="true"></span>
                            <span class="footer-text text-muted">${docs[i].createdTime}</span>
                            <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                            <span class="footer-text text-muted"><span class="view-num">${docs[i].click}</span>已阅读</span>
                        </div>
                    </div>`
        }
        return html
    }
    //构建分页器html
    function buildPaginationHtml(list,page,pages){
        var html = ''
        if(page == 1){
            html += `<li class="disabled">`
        }else{
            html += `<li>`
        }
        html += `   <a href="javascript:;" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>`
        for(var i = 0,len = list.length;i<len;i++){
            if (list[i] == page){
                html += `<li class="active">`
            }else{
                html += `<li>`
            }
            html += `<a href="javascript:;">${list[i]}</a></li>`
        }
        if(page == pages){
            html += `<li class="disabled">`
        }else{
            html += `<li>`
        }
        html += `   <a href="javascript:;" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>`  
        return html;
    }

    var $articlePage = $('#article-page')
    $articlePage.on('get-data',function(ev,data){
        //构建文章列表html并且渲染
        var articleHtml = buildArticleHtml(data.docs)
        $('#article-wrap').html(articleHtml)
        //构建分页器html并且渲染
        if(data.pages <= 1){
            $articlePage.find('.pagination').html('')
        }else{
            var paginationHtml = buildPaginationHtml(data.list,data.page,data.pages)
            $articlePage.find('.pagination').html(paginationHtml)
        }

    })
    //调用分页jquery插件
    $articlePage.pagination({
        url:"/articlesList"
    })
    function buildCommentHtml(docs){
        var html = ''
        for (var i = 0, len = docs.length; i < len; i++) {
            html += `<div class="col-md-12">
                        <div class="text-muted comment-item">
                            <p>${ docs[i].content }</p>
                            <p>
                            <span>${ docs[i].user.username }</span> 发表于
                                <span>${ docs[i].createdTime }</span>
                            </p>
                        </div>
                    </div>`
        }

        return html
    }
    var $commentPage = $('#comment-page')
    $commentPage.on('get-data', function (ev, data) {
        //构建评论列表html并且渲染
        var commentHtml = buildCommentHtml(data.docs)
        $('#comment-wrap').html(commentHtml)
        //构建分页器html并且渲染
        if (data.pages <= 1) {
            $commentPage.find('.pagination').html('')
        } else {
            var paginationHtml = buildPaginationHtml(data.list, data.page, data.pages)
            $commentPage.find('.pagination').html(paginationHtml)
        }
    })
    //调用分页jquery插件
    $commentPage.pagination({
        url: "/commentsList"
    })    
})(jQuery)