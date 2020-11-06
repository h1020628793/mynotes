(function(w){
    const getOne = Query.getOne
    let num = 0
    function handleClick(){
        num++
        console.log('click ' + num + ' times');
    }
    w.CountClick = {
        countClick:function(selector){
            getOne(selector).addEventListener('click', handleClick)
        }
    }
})(window);