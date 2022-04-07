import { newsApi } from "../Api/api"
import { setIsFetching, setServerError, setServerResponse } from "./commonReducer"

const SET_NEWS_DATA = 'SET_NEWS_DATA'
const SET_TOTAL_NEWS = 'SET_TOTAL_NEWS'
const SET_NEWS_ITEM = 'SET_NEWS_ITEM'
const SET_CURRENT_POST = 'SET_CURRENT_POST'

let initialState = {
    news: [],
    newNews: null,
    currentPost: {},
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
        case SET_CURRENT_POST: {
            return { ...state, currentPost: action.currentPost }
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
export const setCurrentPost = (currentPost) => ({
    type: SET_CURRENT_POST, currentPost
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

export const getPost = (title) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await newsApi.getPost(title)
        dispatch([setCurrentPost(response.post), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export const addPost = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await newsApi.addNews(data)
        dispatch([setNewNews(response.post), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const setViewOnMain = (postId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await newsApi.setViewOnMain(postId)
        dispatch([setNewNews(response.post), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const editNews = (newsId, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await newsApi.editNews(newsId, data)
        dispatch([setNewNews(response.post), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export const deleteNews = (newsId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await newsApi.deleteNews(newsId)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}

export default newsReducer