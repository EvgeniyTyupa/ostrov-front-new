import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getActions } from '../../Redux/actionsReducer'
import { getBrands } from '../../Redux/brandsReducer'
import { getMainCategoriesWithChildren } from '../../Redux/categoryReducer'
import { getItems } from '../../Redux/itemsReducer'
import { getNews, getViewOnMainPosts } from '../../Redux/newsReducer'
import { getHgTags, getTags } from '../../Redux/tagsReducer'
import { shuffle } from '../../Utils/shuffle'
import Home from './Home'

const HomeContainer = (props) => {
    const {
        maxPrice,
        isFetching,
        getActions,
        actions,
        items,
        getItems,
        hgTags,
        getHgTags,
        getNews,
        news,
        getBrands,
        brands,
        mainCategoriesWithChildren,
        getTags,
        tags,
        currentLanguage,
        getViewOnMainPosts,
        viewOnMainPosts
    } = props

    const [shuffleSlides, setShuffleSlides] = useState(actions)

    useEffect(() => {
        let slides = [...actions]
        setShuffleSlides(shuffle(slides.concat(viewOnMainPosts)))
    }, [actions, viewOnMainPosts])


    useEffect(() => {
        getViewOnMainPosts()
        getActions(1, 100, "", "", "", true)
        getItems(1, 15, "rating", -1, "", true)
        getNews(1, 8, "", "", "")
        getBrands(1, 400, "", "", "")
        getHgTags()
        getTags(1, 500, "", "", "")
    }, [])

    return (
        <>
            {isFetching && <Preloader/>}
            
                <Home 
                    categories={mainCategoriesWithChildren}
                    actions={actions}
                    items={items}
                    news={news}
                    brands={brands}
                    hgTags={hgTags}
                    tags={tags}
                    currentLanguage={currentLanguage}
                    viewOnMainPosts={viewOnMainPosts}
                    slides={shuffleSlides}
                    maxPrice={maxPrice}
                />
            
        </>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage,
    categories: state.categories.categories,
    isFetching: state.common.isFetching,
    actions: state.actions.actions,
    items: state.items.items,
    hgTags: state.tags.hgTags,
    tags: state.tags.tags,
    news: state.news.news,
    brands: state.brands.brands,
    viewOnMainPosts: state.news.viewOnMainPosts,
    mainCategoriesWithChildren: state.categories.mainCategoriesWithChildren,
    maxPrice: state.common.maxPrice
})

export default connect(mapStateToProps, {
    getActions,
    getItems,
    getHgTags,
    getNews,
    getBrands,
    getMainCategoriesWithChildren,
    getTags,
    getViewOnMainPosts
})(HomeContainer)