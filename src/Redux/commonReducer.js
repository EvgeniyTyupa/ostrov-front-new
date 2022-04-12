import { newPostApi } from "../Api/api"

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

let initialState = {
    isFetching: false,
    serverResponse: null,
    serverMessage: null,
    serverError: null,
    currentLanguage: "ru",
    isOpenLogin: false,
    isOpenRegister: false,
    currentFilterItem: null,
    searchingCities: [],
    npWarehouses: [],
    isRegisterDone: false
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

export default commonReducer