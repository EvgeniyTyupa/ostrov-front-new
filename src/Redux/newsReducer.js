import { newsApi } from "../Api/api"
import { setIsFetching, setServerError } from "./commonReducer"

const SET_NEWS_DATA = 'SET_NEWS_DATA'
const SET_TOTAL_NEWS = 'SET_TOTAL_NEWS'
const SET_NEWS_ITEM = 'SET_NEWS_ITEM'

let initialState = {
    news: [],
    newNews: null,
    total: 0
}

const newsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_NEWS_DATA: {
            return { ...state, news: action.news }
        }
        case SET_TOTAL_NEWS: {
            return { ...state, total: action.total }
        }
        case SET_NEWS_ITEM: {
            return { ...state, newNews: action.newNews }
        }
        default: 
            return state
    }
}

export const setNewsData = (news) => ({
    type: SET_NEWS_DATA, news
})
export const setTotalData = (total) => ({
    type: SET_TOTAL_NEWS, total
})
export const setNewNews = (newNews) => ({
    type: SET_NEWS_ITEM, newNews
})

export const getNews = (pageNumber, pageSize, searchBy, from, searchingValue) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await newsApi.getNews(pageNumber, pageSize, searchBy, from, searchingValue)
        dispatch([setNewsData(response.posts), setTotalData(response.total), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export default newsReducer