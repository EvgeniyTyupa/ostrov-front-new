import { dashboardApi } from "../Api/api"
import { setIsFetching } from "./commonReducer"

const SET_STATS_DATA = 'SET_STATS_DATA'

let initialState = {
    stats: null
}

const statsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_STATS_DATA: {
            return { ...state, stats: action.stats }
        }
        default: 
            return state
    }
}

export const setStatsData = (stats) => ({
    type: SET_STATS_DATA, stats
})

export const getStats = () => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await dashboardApi.getStats()
        dispatch([setStatsData(response), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export default statsReducer