import { brandApi } from "../Api/api"
import { setIsFetching } from "./commonReducer"

const SET_BRANDS_DATA = 'SET_BRANDS_DATA'
const SET_TOTAL_BRANDS = 'SET_TOTAL_BRANDS'

let initialState = {
    brands: [],
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

export const getBrands = (pageNumber, pageSize, searchBy, from, searchingValue) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try{
        let brands = await brandApi.getBrands(pageNumber, pageSize, searchBy, from, searchingValue)
        dispatch([setBrandsData(brands.brands), setTotalBrands(brands.total), setIsFetching(false)])
    }catch(err){
        dispatch(setIsFetching(false))
    }
}

export default brandsReducer