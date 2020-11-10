; (function ($) {
    //提交评论
    $('#btn-sub-comment').on('click',function(){
        var commentVal = $('#comment-textarea').val()
        commentVal = commentVal.trim()
        //验证
        var errMsg = ''
        if(commentVal == ''){
            errMsg = '评论内容不能为空'
        } else if (commentVal.length > 100){
            errMsg = '评论内容不能超过100个字符'
        }else {
            errMsg = ''
        }
        if(errMsg){
            $('.text-danger').html(errMsg)
            return false
        }else{
            $('.text-danger').html('')
        }
        var id = $(this).data('id')
        $.ajax({
            type:'POST',
            url:'/comments',
            data:{
                content: commentVal,
                article: id
            },
            success:function(result){
                if(result.code == 0){
                    $('#comment-textarea').val('')
                    $('#comment-page').trigger('get-data', result.data)
                }
            }
        })
    })
})(jQuery)