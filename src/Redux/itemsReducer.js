import { itemsApi } from "../Api/api"
import { setIsFetching, setServerResponse } from "./commonReducer"

const SET_ITEMS_DATA = 'SET_ITEMS_DATA'
const SET_TOTAL_ITEMS = 'SET_TOTAL_ITEMS' 

let initialState = {
    items: [],
    total: 0
}

const itemsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ITEMS_DATA: {
            return { ...state, items: action.items }
        }
        case SET_TOTAL_ITEMS: {
            return { ...state, total: action.total }
        }
        default:
            return state
    }
}

export const setItemsData = (items) => ({
    type: SET_ITEMS_DATA, items
})
export const setTotalData = (total) => ({
    type: SET_TOTAL_ITEMS, total
})

export const getItems = (pageNumber, pageSize, searchBy, from, searchingValue) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try{
        let items = await itemsApi.getItems(pageNumber, pageSize, searchBy, from, searchingValue)
        dispatch([setItemsData(items.items), setTotalData(items.total), setIsFetching(false)])
    }catch(err){
        dispatch(setIsFetching(false));
    }
}

export const createItem = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await itemsApi.createItem(data)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const deleteItem = (itemId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await itemsApi.deleteItem(itemId)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export default itemsReducer