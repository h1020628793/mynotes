(function($) {
    searchWrap.DEFAULTS = {

    }
    $.fn.extend({
        searchWrap: function(options) {
            return this.each(function() {
                var $elem = $(this)
                    //单例模式
                var searchWrap = $elem.data('search-wrap')
                if (!searchWrap) {
                    options = $.extend({}, searchWrap.DEFAULTS, options)
                }
            })
        }
    })
})(jQuery)