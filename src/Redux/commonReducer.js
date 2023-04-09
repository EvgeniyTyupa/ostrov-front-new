import { newPostApi, siteInfoApi } from "../Api/api"
import { setItemsWithEmptyDescription } from "./itemsReducer"

const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_SERVER_RESPONSE = 'SET_SERVER_RESPONSE'
const SET_SERVER_ERROR = 'SET_SERVER_ERROR' 
const SET_CURRENT_LANGUAGE = 'SET_CURRENT_LANGUAGE'
const SET_IS_OPEN_LOGIN = 'SET_IS_OPEN_LOGIN'
const SET_IS_OPEN_REGISTER = 'SET_IS_OPEN_REGISTER'
const SET_CURRENT_FILTER_ITEM = 'SET_CURRENT_FILTER_ITEM'
const SET_SEARCHING_CITIES = 'SET_SEARCHING_CITIES'
const SET_NP_WAREHOUSES = 'SET_NP_WAREHOUSES'
const SET_IS_REGISTER_DONE = 'SET_IS_REGISTER_DONE'
const SET_SERVER_MESSAGE = 'SET_SERVER_MESSAGE'
const SET_IS_OPEN_FORGOT_PASS_MODAL = 'SET_IS_OPEN_FORGOT_PASS_MODAL'
const SET_SITE_INFO = 'SET_SITE_INFO'
const SET_IS_OPEN_BURGER = 'SET_IS_OPEN_BURGER'
const SET_MAX_PRICE = 'SET_MAX_PRICE' 

let initialState = {
    isFetching: false,
    serverResponse: null,
    serverMessage: null,
    serverError: null,
    currentLanguage: "ua",
    isOpenLogin: false,
    isOpenRegister: false,
    currentFilterItem: null,
    searchingCities: [],
    npWarehouses: [],
    isRegisterDone: false,
    isOpenForgotPassModal: false,
    siteInfo: null,
    maxPrice: 0,
    isOpenBurger: false
}

const commonReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_SERVER_RESPONSE: {
            return { ...state, serverResponse: action.serverResponse }
        }
        case SET_SERVER_ERROR: {
            return { ...state, serverError: action.serverError }
        }
        case SET_CURRENT_LANGUAGE: {
            return { ...state, currentLanguage: action.currentLanguage }
        }
        case SET_IS_OPEN_LOGIN: {
            return { ...state, isOpenLogin: action.isOpenLogin }
        }
        case SET_IS_OPEN_REGISTER: {
            return { ...state, isOpenRegister: action.isOpenRegister }
        }
        case SET_CURRENT_FILTER_ITEM: {
            return { ...state, currentFilterItem: action.currentFilterItem }
        }
        case SET_SEARCHING_CITIES: {
            return { ...state, searchingCities: action.searchingCities }
        }
        case SET_NP_WAREHOUSES: {
            return { ...state, npWarehouses: action.npWarehouses }
        }
        case SET_IS_REGISTER_DONE: {
            return { ...state, isRegisterDone: action.isRegisterDone }
        }
        case SET_SERVER_MESSAGE: {
            return { ...state, serverMessage: action.serverMessage }
        }
        case SET_IS_OPEN_FORGOT_PASS_MODAL: {
            return { ...state, isOpenForgotPassModal: action.isOpenForgotPassModal }
        }
        case SET_SITE_INFO: {
            return { ...state, siteInfo: action.siteInfo }
        }
        case SET_IS_OPEN_BURGER: {
            return { ...state, isOpenBurger: action.isOpenBurger }
        }
        case SET_MAX_PRICE: {
            return { ...state, maxPrice: action.maxPrice }
        }
        default: 
            return state
    }
}

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, isFetching
})
export const setServerResponse = (serverResponse) => ({
    type: SET_SERVER_RESPONSE, serverResponse
})
export const setServerError = (serverError) => ({
    type: SET_SERVER_ERROR, serverError
})
export const setCurrentLanguage = (currentLanguage) => ({
    type: SET_CURRENT_LANGUAGE, currentLanguage
})
export const setIsOpenLogin = (isOpenLogin) => ({
    type: SET_IS_OPEN_LOGIN, isOpenLogin
})
export const setIsOpenRegister = (isOpenRegister) => ({
    type: SET_IS_OPEN_REGISTER, isOpenRegister
})
export const setCurrentFilterItem = (currentFilterItem) => ({
    type: SET_CURRENT_FILTER_ITEM, currentFilterItem
})
export const setSearchingCities = (searchingCities) => ({
    type: SET_SEARCHING_CITIES, searchingCities
})
export const setNpWarehouses = (npWarehouses) => ({
    type: SET_NP_WAREHOUSES, npWarehouses
})
export const setIsRegisterDone = (isRegisterDone) => ({
    type: SET_IS_REGISTER_DONE, isRegisterDone
})
export const setServerMessage = (serverMessage) => ({
    type: SET_SERVER_MESSAGE, serverMessage
})
export const setIsOpenForgotPassModal = (isOpenForgotPassModal) => ({
    type: SET_IS_OPEN_FORGOT_PASS_MODAL, isOpenForgotPassModal
})
export const setSiteInfo = (siteInfo) => ({
    type: SET_SITE_INFO, siteInfo
})
export const setIsOpenBurger = (isOpenBurger) => ({
    type: SET_IS_OPEN_BURGER, isOpenBurger
})
export const setMaxPrice = (maxPrice) => ({
    type: SET_MAX_PRICE, maxPrice
})

export const getCities = (searchValue) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await newPostApi.getCities(searchValue)
        dispatch([setSearchingCities(response.data[0].Addresses), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const getWarehouses = (city, number) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await newPostApi.getWarehouses(city, number)
        dispatch([setNpWarehouses(response.data), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const getSiteInfo = () => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await siteInfoApi.getInfo()
        dispatch([setSiteInfo(response.info), setMaxPrice(response.maxPrice), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}
export const updateSiteInfo = (id, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await siteInfoApi.updateInfo(id, data)
        dispatch([setSiteInfo([response.info]), setServerResponse("Сохранено"), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const getItemsXml = (skipEmpty, categoryId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await siteInfoApi.getItemsXml(skipEmpty, categoryId)
        if (response.items) {
            dispatch([setItemsWithEmptyDescription(response.items), setIsFetching(false)])
        } else {
            dispatch([setServerResponse("Success!"), setIsFetching(false)])
            return true
        }
    } catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
        return false
    }
}

export default commonReducer