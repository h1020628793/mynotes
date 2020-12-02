import * as types from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({
    usernum: 1,
    ordernum: 2,
    productnum: 3
})

function reducer(state = defaultState, action) {
    if (action.type == types.SET_COUNTS){
        const { usernum, ordernum, productnum} = action.payload
        return state.merge({
            usernum: usernum,
            ordernum: ordernum,
            productnum: productnum
        })
    }
    return state
}

export default reducer