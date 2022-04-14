
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const SET_ADD_TO_CART_RESULT = 'SET_ADD_TO_CART_RESULT'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_TOTAL_SUM = 'SET_TOTAL_SUM'

let initialState = {
    items: [],
    addToCartResult: null,
    totalCount: 0,
    totalSum: 0
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

export default cartReducer