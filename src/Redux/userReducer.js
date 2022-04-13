import { userApi } from "../Api/api"
import { setIsFetching, setIsOpenLogin, setIsRegisterDone, setServerError, setServerMessage, setServerResponse } from "./commonReducer"

const SET_USER_DATA = 'SET_USER_DATA'
const SET_IS_AUTH = 'SET_IS_AUTH'
const SET_IS_START_DATA = 'SET_IS_START_DATA'
const SET_IS_VALID_ACTIVATION_HASH = 'SET_IS_VALID_ACTIVATION_HASH'
const SET_IS_RECEIVED_HASH_STATUS = 'SET_IS_RECEIVED_HASH_STATUS'
const SET_IS_RECEIVED_AUTH_STATUS = 'SET_IS_RECEIVED_AUTH_STATUS'
const SET_IS_RECEIVED_RESET_HASH_STATUS = 'SET_IS_RECEIVED_RESET_HASH_STATUS'
const SET_IS_VALID_RESET_HASH = 'SET_IS_VALID_RESET_HASH'

let initialState = {
    user: null,
    isAuth: false,
    isStartData: false,
    isValidActivationHash: false,
    isReceivedHashStatus: false,
    isReceiveAuthStatus: false,
    isReceivedResetHashStatus: false,
    isValidResetHash: false
}

let userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: {
            return { ...state, user: action.user }
        }
        case SET_IS_AUTH: {
            return { ...state, isAuth: action.isAuth }
        }
        case SET_IS_START_DATA: {
            return { ...state, isStartData: action.isStartData }
        }
        case SET_IS_VALID_ACTIVATION_HASH: {
            return { ...state, isValidActivationHash: action.isValidActivationHash }
        }
        case SET_IS_RECEIVED_HASH_STATUS: {
            return { ...state, isReceivedHashStatus: action.isReceivedHashStatus }
        }
        case SET_IS_RECEIVED_AUTH_STATUS: {
            return { ...state, isReceiveAuthStatus: action.isReceiveAuthStatus }
        }
        case SET_IS_RECEIVED_RESET_HASH_STATUS: {
            return { ...state, isReceivedResetHashStatus: action.isReceivedResetHashStatus }
        }
        case SET_IS_VALID_RESET_HASH: {
            return { ...state, isValidResetHash: action.isValidResetHash }
        }
        default:
            return state
    }
}

export const setUserData = (user) => ({
    type: SET_USER_DATA, user
})
export const setIsAuth = (isAuth) => ({
    type: SET_IS_AUTH, isAuth
})
export const setIsStartData = (isStartData) => ({
    type: SET_IS_START_DATA, isStartData
})
export const setIsValidActivationHash = (isValidActivationHash) => ({
    type: SET_IS_VALID_ACTIVATION_HASH, isValidActivationHash
})
export const setIsReceivedHashStatus = (isReceivedHashStatus) => ({
    type: SET_IS_RECEIVED_HASH_STATUS, isReceivedHashStatus
})
export const setIsReceivedAuthStatus = (isReceiveAuthStatus) => ({
    type: SET_IS_RECEIVED_AUTH_STATUS, isReceiveAuthStatus
})
export const setIsReceivedResetHashStatus = (isReceivedResetHashStatus) => ({
    type: SET_IS_RECEIVED_RESET_HASH_STATUS, isReceivedResetHashStatus
})
export const setIsValidResetHash = (isValidResetHash) => ({
    type: SET_IS_VALID_RESET_HASH, isValidResetHash
})

export const login = (data) => async (dispatch) => {
    dispatch([setIsFetching(true), setIsReceivedAuthStatus(false)])
    try {
        let response = await userApi.login(data)
        localStorage.usertoken = response.token
        dispatch([setIsAuth(true), setServerError(null), setIsFetching(false), setIsOpenLogin(false)])
    }catch(err) {
        switch(err.response.status) {
            case 404: {
                dispatch(setServerError(err.response.data.message))
                break;
            }
            case 500: {
                dispatch(setServerError("Server Error!"))
                break;
            }
        }
        dispatch([setIsAuth(false), setIsFetching(false)])
    }
}

export const register = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await userApi.register(data)
        dispatch([setIsRegisterDone(true), setServerMessage(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsRegisterDone(false), setIsFetching(false)])
    }
}

export const me = () => async (dispatch) => {
    dispatch([setIsFetching(true), setIsReceivedAuthStatus(false)])
    try {
        let response = await userApi.getProfile()
        dispatch([setUserData(response), setIsAuth(true), setIsStartData(true), setIsFetching(false)])
    } catch(err) {
        localStorage.usertoken = ""
    }finally {
        dispatch([setIsFetching(false), setIsReceivedAuthStatus(true)])
    }
}

export const logout = () => async (dispatch) => {
    dispatch(setIsFetching(true))
    localStorage.usertoken = ""
    dispatch([setIsAuth(false), setUserData(null), setIsFetching(false)])
}

export const updateProfile = (userId, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await userApi.updateProfile(userId, data)
        dispatch([setUserData(response.user), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const changePassword = (userId, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await userApi.changePassword(userId, data)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const activateProfile = (hash) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await userApi.activateProfile(hash)
        localStorage.usertoken = response.token
        dispatch([setIsAuth(true), setServerError(null), setIsValidActivationHash(true)])
    }catch(err) {
        dispatch([setIsValidActivationHash(false)])
    }finally {
        dispatch([setIsReceivedAuthStatus(true), setIsReceivedHashStatus(true), setIsFetching(false)])
    }
}

export const forgotPass = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await userApi.forgotPass(data)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const validateResetHash = (hash) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await userApi.validateResetHash(hash)
        localStorage.usertoken = response.token
        dispatch([setIsAuth(true), setIsValidResetHash(true)])
    }catch(err) {
        dispatch([setIsValidResetHash(false)])
    }finally {
        dispatch([setIsReceivedAuthStatus(true), setIsReceivedResetHashStatus(true), setIsFetching(false)])
    }
}

export default userReducer