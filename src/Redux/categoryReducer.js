import { categoryApi } from "../Api/api"
import { setIsFetching } from "./commonReducer"

const SET_CATEGORIES_DATA = 'SET_CATEGORIES_DATA'
const SET_TOTAL_CATEGORIES = 'SET_TOTAL_CATEGORIES' 

let initialState = {
    categories: [],
    total: 0
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CATEGORIES_DATA: {
            return { ...state, categories: action.categories }
        }
        case SET_TOTAL_CATEGORIES: {
            return { ...state, total: action.total }
        }
        default:
            return state
    }
}

export const setCategoriesData = (categories) => ({
    type: SET_CATEGORIES_DATA, categories
})
export const setTotalCategories = (total) => ({
    type: SET_TOTAL_CATEGORIES, total
})

export const getAllCategories = (pageNumber, pageSize, searchBy, from, searchingValue) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let categories = await categoryApi.getAllCategories(pageNumber, pageSize, searchBy, from, searchingValue)
        dispatch([ setCategoriesData(categories.categories), setTotalCategories(categories.total), setIsFetching(false) ])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export default categoryReducer