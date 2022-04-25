import { promocodeApi } from "../Api/api"
import { setIsFetching, setServerError, setServerResponse } from "./commonReducer"

const SET_PROMOCODES_DATA = 'SET_PROMOCODES_DATA'
const SET_TOTAL = 'SET_TOTAL'
const SET_NEW_PROMOCODE = 'SET_NEW_PROMOCODE' 
const SET_CURRENT_PROMOCODE = 'SET_CURRENT_PROMOCODE'
const SET_RECEIVE_PROMOCODE_STATUS = 'SET_RECEIVE_PROMOCODE_STATUS'

let initialState = {
    promocodes: [],
    newPromocode: null,
    currentPromocode: null,
    receivePromocodeStatus: false,
    total: 0,
}

const promocodeReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PROMOCODES_DATA: {
            return { ...state, promocodes: action.promocodes }
        }
        case SET_TOTAL: {
            return { ...state, total: action.total }
        }
        case SET_NEW_PROMOCODE: {
            return { ...state, newPromocode: action.newPromocode }
        }
        case SET_CURRENT_PROMOCODE: {
            return { ...state, currentPromocode: action.currentPromocode }
        }
        case SET_RECEIVE_PROMOCODE_STATUS: {
            return { ...state, receivePromocodeStatus: action.receivePromocodeStatus }
        }
        default: 
            return state
    }
}

export const setPromocodesData = (promocodes) => ({
    type: SET_PROMOCODES_DATA, promocodes
})
export const setTotalPromocodes = (total) => ({
    type: SET_TOTAL, total
})
export const setNewPromocode = (newPromocode) => ({
    type: SET_NEW_PROMOCODE, newPromocode
})
export const setCurrentPromocode = (currentPromocode) => ({
    type: SET_CURRENT_PROMOCODE, currentPromocode
})
export const setReceivePromocodeStatus = (receivePromocodeStatus) => ({
    type: SET_RECEIVE_PROMOCODE_STATUS, receivePromocodeStatus
})

export const getPromocodes = (pageNumber, pageSize, searchBy, from, searchingValue) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await promocodeApi.getPromocodes(pageNumber, pageSize, searchBy, from, searchingValue)
        dispatch([setPromocodesData(response.promocodes), setTotalPromocodes(response.total), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const checkPromocode = (code) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await promocodeApi.checkPromocode(code)
        dispatch([setCurrentPromocode(response.promocode), setReceivePromocodeStatus(true), setIsFetching(false)])
    }catch(err) {
        dispatch([setIsFetching(false)])
    }
}

export const addPromocode = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await promocodeApi.addPromocode(data)
        dispatch([setNewPromocode(response.promocode), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const updatePromocode = (promocodeId, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await promocodeApi.updatePromocode(promocodeId, data)
        dispatch([setNewPromocode(response.promocode), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const deletePromocode = (promocodeId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await promocodeApi.deletePromocode(promocodeId)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export default promocodeReducer