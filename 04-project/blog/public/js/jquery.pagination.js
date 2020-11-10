// /public/js/jquery.pagination.js
;(function($){
    $.fn.extend({
        pagination:function(options){
            return this.each(function(){
                var $this = $(this)
                $this.on('click','a',function(){
                    //获取当前页码
                    var currentPage = $this.find('li.active a').html()
                    currentPage = parseInt(currentPage)
                    var $elem = $(this)
                    var labelText = $elem.attr('aria-label')
                    //需要请求的页码
                    var page = $elem.html()
                    //上一页
                    if (labelText == 'Previous'){
                        if (currentPage == 1){
                            return false
                        }
                        page = currentPage - 1
                    }
                    //下一页
                    else if (labelText == 'Next'){
                        var pages = $this.find('a').eq(-2).html()
                        if (currentPage == pages){
                            return false
                        }
                        page = currentPage + 1
                    }
                    if (currentPage == page){
                        return false
                    }
                    var data = {
                        page:page
                    }
                    var id = $this.data('id')
                    if(id){
                        data.id = id
                    }
                    //发送ajax请求获取数据
                    $.ajax({
                        url:options.url,
                        data:data,
                        dataType:'json',
                        success:function(result){
                            if(result.code == 0){
                                $this.trigger('get-data', result.data)
                            }
                        }
                    })
                })
            })
        }
    })
})(jQuery)