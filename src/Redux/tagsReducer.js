import { setIsFetching, setServerError, setServerResponse } from "./commonReducer"
import { tagApi } from "../Api/api"

const SET_TAGS_DATA = 'SET_TAGS_DATA'
const SET_TOTAL_TAGS = 'SET_TOTAL_TAGS' 
const SET_NEW_TAG = 'SET_NEW_TAG'

let initialState = {
    tags: [],
    newTag: null,
    total: 0
}

const tagsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TAGS_DATA: {
            return { ...state, tags: action.tags }
        }
        case SET_TOTAL_TAGS: {
            return { ...state, total: action.total }
        }
        case SET_NEW_TAG: {
            return { ...state, newTag: action.newTag }
        }
        default:
            return state
    }
}

export const setTagsData = (tags) => ({
    type: SET_TAGS_DATA, tags
})
export const setTotalTags = (total) => ({
    type: SET_TOTAL_TAGS, total
})
export const setNewTag = (newTag) => ({
    type: SET_NEW_TAG, newTag
})

export const getTags = (pageNumber, pageSize, searchBy, from, searchingValue) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let tags = await tagApi.getTags(pageNumber, pageSize, searchBy, from, searchingValue)
        dispatch([setTagsData(tags.tags), setTotalTags(tags.total), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}
export const addTag = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await tagApi.addTag(data)
        console.log(response.tag)
        dispatch([setNewTag(response.tag), setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        console.log(err.response)
        dispatch([setServerError(err.response.data.message), setIsFetching(false)])
    }
}
export const editTag = (tagId, data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await tagApi.editTag(tagId, data)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}
export const deleteTag = (tagId) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await tagApi.deleteTag(tagId)
        dispatch([setServerResponse(response.message), setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}

export default tagsReducer