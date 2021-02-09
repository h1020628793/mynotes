/*
包含所有的工具函数
*/
/*
用户主界面路由
    dashen: /dashen
    laoban: /laoban
用户信息完善界面路由
    dashen: /dasheninfo
    laoban: /laobaninfo
判断是否已经完善信息只需要看user.header
判断用户类型: user.type
*/

export function getRedirectTo(type, header) {
    //type
    let path = ''
    if(type === 'laoban'){
        path = '/laoban'
    } else {
        path = '/dashen'
    }
    //header
    if(!header){ //没有值才去信息完善
        path += 'info'
    } 
    return path
}