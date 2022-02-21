import { actionsApi } from "../Api/api"
import { setIsFetching } from "./commonReducer"

const SET_ACTIONS_DATA = 'SET_ACTIONS_DATA'
const SET_TOTAL_ACTIONS = 'SET_TOTAL_ACTIONS'
const SET_NEW_ACTION = 'SET_NEW_ACTION'

let initialState = {
    actions: [],
    newAction: null,
    total: 0
}

const actionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ACTIONS_DATA: {
            return { ...state, actions: action.actions }
        }
        case SET_TOTAL_ACTIONS: {
            return { ...state, total: action.total }
        }
        case SET_NEW_ACTION: {
            return { ...state, newAction: action.newAction }
        }
        default: 
            return state
    }
}

export const setActionsData = (actions) => ({
    type: SET_ACTIONS_DATA, actions
})
export const setTotalActions = (total) => ({
    type: SET_TOTAL_ACTIONS, total
})
export const setNewAction = (newAction) => ({
    type: SET_NEW_ACTION, newAction
})

export const getActions = (pageNumber, pageSize, searchBy, from, searchingValue, isActual) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await actionsApi.getActions(pageNumber, pageSize, searchBy, from, searchingValue, isActual)
        dispatch([setActionsData(response.actions), setTotalActions(response.total), setIsFetching(false)])
    }catch(err) {
        dispatch([setIsFetching(false)])
    }
}

export default actionsReducer