import { itemsApi } from "../Api/api"
import { OFFICE_MAIL_DELIVERY_PRICE } from "../Utils/constants"
import { setIsFetching } from "./commonReducer"

const SET_CART_ITEMS = 'SET_CART_ITEMS'
const SET_ADD_TO_CART_RESULT = 'SET_ADD_TO_CART_RESULT'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_TOTAL_SUM = 'SET_TOTAL_SUM'
const SET_DELIVERY_PRICE = 'SET_DELIVERY_PRICE'
const SET_ACTION_DISCOUNT = 'SET_ACTION_DISCOUNT'
const SET_GIFT = 'SET_GIFT'

let initialState = {
    items: [],
    addToCartResult: null,
    deliveryPrice: OFFICE_MAIL_DELIVERY_PRICE,
    totalCount: 0,
    totalSum: 0,
    actionDiscount: 0,
    gift: []
}

let cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CART_ITEMS: {
            return { ...state, items: action.items }
        }
        case SET_ADD_TO_CART_RESULT: {
            return { ...state, addToCartResult: action.addToCartResult }
        }
        case SET_TOTAL_COUNT: {
            return { ...state, totalCount: action.totalCount }
        }
        case SET_TOTAL_SUM: {
            return { ...state, totalSum: action.totalSum }
        }
        case SET_DELIVERY_PRICE: {
            return { ...state, deliveryPrice: action.deliveryPrice }
        }
        case SET_ACTION_DISCOUNT: {
            return { ...state, actionDiscount: action.actionDiscount }
        }
        case SET_GIFT: {
            return { ...state, gift: action.gift }
        }
        default: 
            return state
    }
}

export const setCartItems = (items) => ({
    type: SET_CART_ITEMS, items
})
export const setAddToCartResult = (addToCartResult) => ({
    type: SET_ADD_TO_CART_RESULT, addToCartResult
})
export const setTotalCount = (totalCount) => ({
    type: SET_TOTAL_COUNT, totalCount
})
export const setTotalSum = (totalSum) => ({
    type: SET_TOTAL_SUM, totalSum
})
export const setDeliveryPrice = (deliveryPrice) => ({
    type: SET_DELIVERY_PRICE, deliveryPrice
})
export const setActionDiscount = (actionDiscount) => ({
    type: SET_ACTION_DISCOUNT, actionDiscount
})
export const setGift = (gift) => ({
    type: SET_GIFT, gift
})

export const getCartItems = (ids) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await itemsApi.getItemsPackById(ids)
        let items = response.items

        let cart_items = localStorage.getItem('shopping_cart')
        let parsed_items = JSON.parse(cart_items)

        parsed_items.forEach((el, index) => {
            items.forEach(item => {
                if(el.item._id === item._id){
                    parsed_items[index].item = item
                }
            })
        })

        let available_items = []

        parsed_items.forEach(el => {
            if(el.item.count > 0) {
                available_items.push(el)
            }
        })

        dispatch([setCartItems(available_items), setIsFetching(false)])
    }catch(err){
        dispatch(setIsFetching(false))
    }
}

export default cartReducer