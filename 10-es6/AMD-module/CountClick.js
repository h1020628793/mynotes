define(['Query'],$=>{
    const getOne = $.getOne
    let num = 0
    function handleClick(){
        num++
        console.log('click ' + num + ' times');
    }
    return {
        countClick: function (selector) {
            getOne(selector).addEventListener('click', handleClick)
        }
    }
})