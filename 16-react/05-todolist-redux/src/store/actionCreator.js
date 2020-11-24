import { LOAD_DATA, CHANGE_ITEM, ADD_ITEM, DEL_ITEM } from './actionTypes'

export const getLoadDataAction = (payload)=>({
    type: LOAD_DATA, 
    payload: payload
})

export const getChangeItemAction = (payload) => ({
    type: CHANGE_ITEM,
    payload: payload
})

export const getAddItemAction = (payload) => ({
    type: ADD_ITEM,
    payload: payload
})


export const getDelItemAction = (payload) => ({
    type: DEL_ITEM,
    payload: payload
})