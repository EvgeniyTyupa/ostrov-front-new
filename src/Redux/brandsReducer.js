import { brandApi } from "../Api/api"
import { setCurrentFilterItem, setIsFetching, setServerError, setServerResponse } from "./commonReducer"

const SET_BRANDS_DATA = 'SET_BRANDS_DATA'
const SET_TOTAL_BRANDS = 'SET_TOTAL_BRANDS'
const SET_NEW_BRAND = 'SET_NEW_BRAND'
const SET_SEARCHING_BRAND = 'SET_SEARCHING_BRAND'

let initialState = {
    brands: [],
    newBrand: null,
    searchingBrands: [],
    total: 0
}

const brandsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_BRANDS_DATA: {
            return { ...state, brands: action.brands }
        }
        case SET_TOTAL_BRANDS: {
            return { ...state, total: action.total }
        }
        case SET_NEW_BRAND: {
            return { ...state, newBrand: action.newBrand }
        }
        case SET_SEARCHING_BRAND: {
            return { ...state, searchingBrands: action.searchingBrands }
        }
        default: 
            return state
    }
}

export const setBrandsData = (brands) => ({
    type: SET_BRANDS_DATA, brands
})
export const setTotalBrands = (total) => ({
    type: SET_TOTAL_BRANDS, total
})
export const setNewBrand = (newBrand) => ({
    type: SET_NEW_BRAND, newBrand
})
export const setSearchingBrands = (searchingBrands) => ({
    type: SET_SEARCHING_BRAND, searchingBrands
})

export const getBrands = (pageNumber, pageSize, searchBy, from, searchingValue) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try{
        let brands = await brandApi.getBrands(pageNumber, pageSize, searchBy, from, searchingValue)
        dispatch([setBrandsData(brands.brands), setTotalBrands(brands.total), setIsFetching(false)])
    }catch(err){
        dispatch(setIsFetching(false))
    }
}
export const getBrand = (brandId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await brandApi.getBrand(brandId)
        dispatch([setCurrentFilterItem(response.brand), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}
export const addBrand = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await brandApi.addBrand(data)
        dispatch([setNewBrand(response.brand), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}
export const editBrand = (brandId, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await brandApi.editBrand(brandId, data)
        dispatch([setNewBrand(response.brand), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}
export const deleteBrand = (brandId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await brandApi.deleteBrand(brandId)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
        return true
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
        return false
    }
}

export default brandsReducer