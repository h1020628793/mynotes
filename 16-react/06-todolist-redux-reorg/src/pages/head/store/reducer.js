import { fromJS } from 'immutable'
//定义一个初始化的state
const defaultState = fromJS({ name: 'TodoList Project' })

function reducer(state = defaultState, action) {
    return state
}

export default reducer