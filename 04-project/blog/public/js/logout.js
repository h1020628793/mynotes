; (function ($) {
    $('#logout').on('click',function(){
        $.ajax({
            url: '/users/logout',
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                if (result.code == 0) {
                    window.location = "/"
                } 
            }
        })        
    })
})(jQuery)