import { itemsApi } from "../Api/api"
import { setSearchingBrands } from "./brandsReducer"
import { setSearchingCategories } from "./categoryReducer"
import { setIsFetching, setServerError, setServerResponse } from "./commonReducer"
import { setSearchingTags } from "./tagsReducer"

const SET_ITEMS_DATA = 'SET_ITEMS_DATA'
const SET_TOTAL_ITEMS = 'SET_TOTAL_ITEMS' 
const SET_NEW_ITEM = 'SET_NEW_ITEM' 
const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM'
const SET_SEARCHING_ITEMS = 'SET_SEARCHING_ITEMS'

let initialState = {
    items: [],
    searchingItems: [],
    newItem: null,
    total: 0,
    currentItem: null,
}

const itemsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ITEMS_DATA: {
            return { ...state, items: action.items }
        }
        case SET_TOTAL_ITEMS: {
            return { ...state, total: action.total }
        }
        case SET_NEW_ITEM: {
            return { ...state, newItem: action.newItem }
        }
        case SET_CURRENT_ITEM: {
            return { ...state, currentItem: action.currentItem }
        }
        case SET_SEARCHING_ITEMS: {
            return { ...state, searchingItems: action.searchingItems }
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
export const setNewItem = (newItem) => ({
    type: SET_NEW_ITEM, newItem
})
export const setCurrentItem = (currentItem) => ({
    type: SET_CURRENT_ITEM, currentItem
})
export const setSearchingItems = (searchingItems) => ({
    type: SET_SEARCHING_ITEMS, searchingItems
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

export const globalSearch = (searchingValue) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await itemsApi.globalSearch(searchingValue)
        dispatch([
            setSearchingItems(response.items), 
            setSearchingBrands(response.brands),
            setSearchingCategories(response.categories),
            setSearchingTags(response.tags),
            setTotalData(response.total), 
            setIsFetching(false)
        ])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const getItem = (itemId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try{
        let response = await itemsApi.getItem(itemId)
        dispatch([setCurrentItem(response.item[0]), setIsFetching(false)])
    }catch(err){
        dispatch(setIsFetching(false))
    }
}

export const getSame = (tagsId, itemId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await itemsApi.getSame(tagsId, itemId)
        dispatch([setItemsData(response.items), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const createItem = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await itemsApi.createItem(data)
        dispatch([setNewItem(response.item), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const updateItem = (itemId, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await itemsApi.updateItem(itemId, data)
        dispatch([setNewItem(response.item), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const deleteItem = (itemId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await itemsApi.deleteItem(itemId)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const getByBrandCategoryTag = (pageNumber, pageSize, searchBy, from, searchingValue, filter) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try{
        let items = await itemsApi.getByBrandCategoryTag(pageNumber, pageSize, searchBy, from, searchingValue, filter)
        dispatch([setItemsData(items.items), setTotalData(items.total), setIsFetching(false)])
    }catch(err){
        dispatch(setIsFetching(false));
    }
}

export default itemsReducer