import { reviewsApi } from "../Api/api"
import { setIsFetching } from "./commonReducer"

const SET_COMMENTS_DATA = 'SET_COMMENTS_DATA'
const SET_NEW_COMMENT = 'SET_NEW_COMMENT'
const SET_TOTAL_COMMENTS = 'SET_TOTAL_COMMENTS'

let initialState = {
    comments: [],
    newComment: null,
    total: 0
}

const commentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_COMMENTS_DATA: {
            return { ...state, comments: action.comments }
        }
        case SET_NEW_COMMENT: {
            return { ...state, newComment: action.newComment }
        }
        case SET_TOTAL_COMMENTS: {
            return { ...state, total: action.total }
        }
        default:
            return state
    }
}

export const setCommentsData = (comments) => ({
    type: SET_COMMENTS_DATA, comments
})
export const setNewComment = (newComment) => ({
    type: SET_NEW_COMMENT, newComment
})
export const setTotalComments = (total) => ({
    type: SET_TOTAL_COMMENTS, total
})

export const getComments = (itemId, pageNumber, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await reviewsApi.getReviews(itemId, pageNumber, pageSize)
        dispatch([setCommentsData(response.comments), setTotalComments(response.total),setIsFetching(false)])
    }catch(err) {
        dispatch(setIsFetching(false))
    }
}
export const addComment = (data) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        let response = await reviewsApi.addReview(data)
        dispatch([setNewComment(response.comment), getComments(data.item_id, 1, 25)])
    }catch(err){
        dispatch(setIsFetching(false))
    }
}

export default commentsReducer