// /utils/pagination.js
/**
 * 
 * @param {} options 
 * page
 * limit
 * query
 * projection
 * sort
 * model
 * populates
 */
module.exports = async(options)=>{
    
    let { page, limit: limit = 2, query: query = {}, projection: projection = "", sort: sort = { _id: -1 }, model, populates } = options
    page = parseInt(page)

    if (isNaN(page)) {
        page = 1
    }
    if (page < 0) {
        page = 1
    }
    //计算总页数
    const total = await model.countDocuments(query)
    const pages = Math.ceil(total / limit)
    //没有数据的处理
    if (pages == 0){
        return {
            docs:[],
            list:[],
            pages:0,
            page:0
        }
    }
    if (page > pages) {
        page = pages
    }
    //根据请求的页码计算需要显示的数据
    /*
        假设有6条数据,每页显示2条,limit = 2
        page=1 需要显示第1,2, skip(0) limit(2)
        page=2 需要显示第3,4, skip(2) limit(2)
        page=3 需要显示第5,6, skip(4) limit(2)
        通过观察:
        skip((page-1)*limit)
    */
    //计算需要跳过的条数
    const skip = (page - 1) * limit

    //页码列表
    const list = []
    for (let i = 1; i <= pages; i++) {
        list.push(i)
    }
    //关联处理
    const result = model.find(query, projection)
    if (populates){
        populates.forEach(populate => {
            result.populate(populate)
        })
    }
    //获取当前页码的用户数据
    const docs = await result.sort(sort).skip(skip).limit(limit)    

    return {
        docs,
        list,
        pages,
        page
    }
}