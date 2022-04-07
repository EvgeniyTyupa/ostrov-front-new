import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getNews } from '../../Redux/newsReducer'
import News from './News'

const NewsContainer = (props) => {
    const { 
        isFetching,
        getNews,
        news
    } = props

    useEffect(() => {
        getNews(1, 12, "", "", "")
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> :
                <News
                    news={news}
                />
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    news: state.news.news
})

export default connect(mapStateToProps, {
    getNews
})(NewsContainer)