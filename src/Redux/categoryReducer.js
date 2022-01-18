import { categoryApi } from "../Api/api"
import { setIsFetching, setServerError, setServerResponse } from "./commonReducer"

const SET_CATEGORIES_DATA = 'SET_CATEGORIES_DATA'
const SET_TOTAL_CATEGORIES = 'SET_TOTAL_CATEGORIES' 
const SET_NEW_CATEGORY = 'SET_NEW_CATEGORY' 

let initialState = {
    categories: [],
    newCategory: null,
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
        case SET_NEW_CATEGORY: {
            return { ...state, newCategory: action.newCategory }
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
export const setNewCategory = (newCategory) => ({
    type: SET_NEW_CATEGORY, newCategory
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

export const addCategory = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await categoryApi.addCategory(data)
        dispatch([setNewCategory(response.category), setServerResponse(response.message)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message)])
    }finally{
        dispatch(setIsFetching(false))
    }
}

export const editCategory = (categoryId, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await categoryApi.editCategory(categoryId, data)
        dispatch([setNewCategory(response.category), setServerResponse(response.message)])
    } catch(err) {
        dispatch(setServerError(err.response.data.message))
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const deleteCategory = (categoryId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await categoryApi.deleteCategory(categoryId)
        dispatch(setServerResponse(response.message))
    } catch(err) {
        dispatch(setServerError(err.response.data.message))
    } finally {
        dispatch(setIsFetching(false))
    }
}

export default categoryReducer