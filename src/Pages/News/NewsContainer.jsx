import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getNews } from '../../Redux/newsReducer'
import News from './News'

const NewsContainer = (props) => {
    const { 
        isFetching,
        getNews,
        news,
        total
    } = props

    const [pageSize, setPageSize] = useState(16)
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageSize = (e) => {
        setPageSize(e.target.value)
    }

    useEffect(() => {
        getNews(currentPage, pageSize, "", "", "")
    }, [pageSize, currentPage])

    return (
        <>
            {isFetching && <Preloader/>}
            <News
                news={news}
                currentPage={currentPage}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                setPageSize={handlePageSize}
                total={total}
            />
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    news: state.news.news,
    total: state.news.total
})

export default connect(mapStateToProps, {
    getNews
})(NewsContainer)