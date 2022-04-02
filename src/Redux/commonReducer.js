const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_SERVER_RESPONSE = 'SET_SERVER_RESPONSE'
const SET_SERVER_ERROR = 'SET_SERVER_ERROR' 
const SET_CURRENT_LANGUAGE = 'SET_CURRENT_LANGUAGE'
const SET_IS_OPEN_LOGIN = 'SET_IS_OPEN_LOGIN'
const SET_IS_OPEN_REGISTER = 'SET_IS_OPEN_REGISTER'
const SET_CURRENT_FILTER_ITEM = 'SET_CURRENT_FILTER_ITEM'

let initialState = {
    isFetching: true,
    serverResponse: null,
    serverError: null,
    currentLanguage: "ru",
    isOpenLogin: false,
    isOpenRegister: false,
    currentFilterItem: null
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

export default commonReducer