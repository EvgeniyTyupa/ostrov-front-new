const SET_IS_FETCHING = 'SET_IS_FETCHING'
const SET_SERVER_RESPONSE = 'SET_SERVER_RESPONSE'
const SET_SERVER_ERROR = 'SET_SERVER_ERROR' 

let initialState = {
    isFetching: false,
    serverResponse: null,
    serverError: null
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


export default commonReducer