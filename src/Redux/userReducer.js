import { userApi } from "../Api/api"
import { setIsFetching, setServerError } from "./commonReducer"

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
        dispatch([setIsAuth(true), setServerError(null), setIsFetching(false)])
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
export const me = () => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await userApi.getProfile()
        dispatch([setUserData(response), setIsAuth(true), setIsStartData(true), setIsFetching(false)])
    } catch(err) {
        localStorage.usertoken = ""
        dispatch(setIsFetching(false))
    }
}

export default userReducer