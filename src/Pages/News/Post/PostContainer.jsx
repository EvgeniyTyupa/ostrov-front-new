import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Preloader from '../../../Components/Common/Preloader/Preloader'
import { getPost, setCurrentPost } from '../../../Redux/newsReducer'
import Post from './Post'

const PostContainer = (props) => {
    const { 
        isFetching,
        getPost,
        currentPost,
        currentLanguage,
        setCurrentPost
    } = props

    const { title } = useParams()

    useEffect(() => {
        getPost(title)
    }, [])

    useEffect(() => {
        return () => {
            setCurrentPost({})
        }
    }, [])

    console.log(title, currentPost)

    return (
        <>
            {!currentPost ? <Preloader/> :
                <>
                    {isFetching ? <Preloader/> :
                        <Post 
                            post={currentPost}
                            currentLanguage={currentLanguage}
                        />
                    }
                </>
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    currentPost: state.news.currentPost,
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {
    getPost,
    setCurrentPost
})(PostContainer)