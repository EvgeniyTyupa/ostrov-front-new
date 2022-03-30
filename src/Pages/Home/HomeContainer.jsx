import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getActions } from '../../Redux/actionsReducer'
import { getItems } from '../../Redux/itemsReducer'
import { getNews } from '../../Redux/newsReducer'
import { getHgTags } from '../../Redux/tagsReducer'
import Home from './Home'

const HomeContainer = (props) => {
    const {
        categories,
        isFetching,
        getActions,
        actions,
        items,
        getItems,
        hgTags,
        getHgTags,
        getNews,
        news
    } = props

    console.log("asd", news)

    useEffect(() => {
        getActions(1, 100, "", "", "", true)
        getItems(1, 15, "rating", -1, "")
        getNews(1, 8, "", "", "")
        getHgTags()
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> 
            :
                <Home 
                    categories={categories}
                    actions={actions}
                    items={items}
                    news={news}
                    hgTags={hgTags}
                />
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    categories: state.categories.categories,
    isFetching: state.common.isFetching,
    actions: state.actions.actions,
    items: state.items.items,
    hgTags: state.tags.hgTags,
    news: state.news.news
})

export default connect(mapStateToProps, {
    getActions,
    getItems,
    getHgTags,
    getNews
})(HomeContainer)