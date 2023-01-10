import { ordersApi } from "../Api/api"
import { setCartEmpty } from "./cartReducer"
import { setIsFetching, setServerMessage } from "./commonReducer"

const SET_ORDERS_DATA = 'SET_ORDERS_DATA'
const SET_NEW_ORDER = 'SET_NEW_ORDER'
const SET_TOTAL_ORDERS = 'SET_TOTAL_ORDERS'
const SET_ORDER_DONE = 'SET_ORDER_DONE'
const SET_NEW_TOTAL = 'SET_NEW_TOTAL'
const SET_PAYMENT_URL = 'SET_PAYMENT_URL'

let initialState = {
    orders: [],
    newOrder: null,
    total: 0,
    newTotal: 0,
    orderDone: false,
    paymentUrl: null
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
        case SET_ORDER_DONE: {
            return { ...state, orderDone: action.orderDone }
        }
        case SET_NEW_TOTAL: {
            return { ...state, newTotal: action.newTotal }
        }
        case SET_PAYMENT_URL: {
            return { ...state, paymentUrl: action.paymentUrl }
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
export const setOrderDone = (orderDone) => ({
    type: SET_ORDER_DONE, orderDone
})
export const setNewTotal = (newTotal) => ({
    type: SET_NEW_TOTAL, newTotal
})
export const setPaymentUrl = (paymentUrl) => ({
    type: SET_PAYMENT_URL, paymentUrl
})

export const getOrders = (pageNumber, pageSize, searchBy, from, searchingValue, filterStatuses) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await ordersApi.getOrders(pageNumber, pageSize, searchBy, from, searchingValue, filterStatuses)
        dispatch([setOrdersData(response.orders), setTotalOrders(response.total), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const getOrdersByUserId = (userId, pageNumber, pageSize, stype, from) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await ordersApi.getOrdersByUserId(userId, pageNumber, pageSize, stype, from)
        dispatch([setOrdersData(response.orders), setTotalOrders(response.totalCount), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const getNewOrdersCount = () => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await ordersApi.getNewOrdersCount()
        dispatch([setNewTotal(response.count), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const subscribeOnOrdersCount = () => async (dispatch) => {
    try {
        let response = await ordersApi.subscribeOnNewOrders()
        dispatch(setNewTotal(response.count))
        await subscribeOnOrdersCount()
    }catch(err) {
        setTimeout(() => {
            subscribeOnOrdersCount()
        }, 500)
    }
}

export const createOrderWithMailPost = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await ordersApi.createOrder(data)
        if(data.payment_type === 'receive') {
            dispatch([setServerMessage(response.message), setOrderDone(true), setCartEmpty(), setIsFetching(false)])
            localStorage.shopping_cart = null
        }else {
            dispatch([setPaymentUrl(response.paymentUrl), setIsFetching(false)])
        }
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const updateOrder = (orderId, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await ordersApi.updateOrder(orderId, data)
        dispatch([setNewOrder(response.order), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export default ordersReducer