import { ordersApi } from "../Api/api"
import { setIsFetching } from "./commonReducer"

const SET_ORDERS_DATA = 'SET_ORDERS_DATA'
const SET_NEW_ORDER = 'SET_NEW_ORDER'
const SET_TOTAL_ORDERS = 'SET_TOTAL_ORDERS'

let initialState = {
    orders: [],
    newOrder: null,
    total: 0
}

const ordersReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ORDERS_DATA: {
            return { ...state, orders: action.orders }
        }
        case SET_NEW_ORDER: {
            return { ...state, newOrder: action.newOrder }
        }
        case SET_TOTAL_ORDERS: {
            return { ...state, total: action.total }
        }
        default: 
            return state
    }
}

export const setOrdersData = (orders) => ({
    type: SET_ORDERS_DATA, orders
})
export const setNewOrder = (newOrder) => ({
    type: SET_NEW_ORDER, newOrder
})
export const setTotalOrders = (total) => ({
    type: SET_TOTAL_ORDERS, total
})

export const getOrders = (pageNumber, pageSize, searchBy, from, searchingValue) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await ordersApi.getOrders(pageNumber, pageSize, searchBy, from, searchingValue)
        dispatch([setOrdersData(response.orders), setTotalOrders(response.total), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export default ordersReducer