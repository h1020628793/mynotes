(function(w){
    w.Query = {
        getOne:function(selector){
            return document.querySelector(selector)
        }
    }
})(window);