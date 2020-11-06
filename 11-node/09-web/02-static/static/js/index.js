(function($){
    var $input =  $('.todo-input')
    var $wrap = ($('.todo-wrap'))
    $input.on('keydown',function(ev){
        if(ev.keyCode == 13){
            $.ajax({
                url:'/add',
                type:'post',
                data:{
                    task: $input.val()
                },
                dataType:'json',
                success:function(result){
                    if(result.code == 0){
                        var data = result.data
                        var $dom = $(`<li class="todo-item" data-id="${data.id}">${data.task}</li>`)
                        $wrap.append($dom)
                        $input.val('')
                    }else{
                        alert(result.msg)
                    }
                }
            })
        }
    })

    $wrap.on('click','li',function(){
        var $this = $(this)
        $.ajax({
            url:'/del',
            type:'get',
            data:{
                id:$this.data('id')
            },
            dataType:'json',
            success:function(result){
                if(result.code == '0'){
                    $this.remove()
                }else{
                    alert(result.msg)
                }
            }
        })
    })
    $('.avatar-input').on('change',function(){
        var formData = new FormData($('#avatar-form')[0])
        $.ajax({
            url:'/uploadAvatar',
            data: formData,
            contentType: false,//必须设置
            processData: false,//必须设置
            type:'POST',
            dataType:'json',
            success:function(result){
                if(result.code == 0){
                    $('.avatar img').attr('src',result.data)
                }else{
                    alert(result.msg)
                }
            }
        })
    })
})(jQuery);