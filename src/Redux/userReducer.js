import { userApi } from "../Api/api"
import { setIsFetching, setIsOpenLogin, setIsRegisterDone, setServerError, setServerResponse } from "./commonReducer"

const SET_USER_DATA = 'SET_USER_DATA'
const SET_IS_AUTH = 'SET_IS_AUTH'
const SET_IS_START_DATA = 'SET_IS_START_DATA'

let initialState = {
    user: null,
    isAuth: false,
    isStartData: false
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

export const login = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await userApi.login(data)
        localStorage.usertoken = response.token
        dispatch([setIsAuth(true), setServerError(null), setIsFetching(false), setIsOpenLogin(false)])
    }catch(err) {
        switch(err.response.status) {
            case 404: {
                dispatch(setServerError("Неправильный логин или пароль!"))
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
        await userApi.register(data)
        dispatch([setIsRegisterDone(true), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsRegisterDone(false), setIsFetching(false)])
    }
}

export const me = () => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await userApi.getProfile()
        dispatch([setUserData(response), setIsAuth(true), setIsStartData(true), setIsFetching(false)])
    } catch(err) {
        localStorage.usertoken = ""
    }finally {
        dispatch(setIsFetching(false))
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

export default userReducer