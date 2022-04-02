import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getActions } from '../../Redux/actionsReducer'
import { getBrands } from '../../Redux/brandsReducer'
import { getMainCategoriesWithChildren } from '../../Redux/categoryReducer'
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
        news,
        getBrands,
        brands,
        getMainCategoriesWithChildren,
        mainCategoriesWithChildren
    } = props

    useEffect(() => {
        getMainCategoriesWithChildren()
        getActions(1, 100, "", "", "", true)
        getItems(1, 15, "rating", -1, "")
        getNews(1, 8, "", "", "")
        getBrands(1, 400, "", "", "")
        getHgTags()
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> 
            :
                <Home 
                    categories={mainCategoriesWithChildren}
                    actions={actions}
                    items={items}
                    news={news}
                    brands={brands}
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
    news: state.news.news,
    brands: state.brands.brands,
    mainCategoriesWithChildren: state.categories.mainCategoriesWithChildren
})

export default connect(mapStateToProps, {
    getActions,
    getItems,
    getHgTags,
    getNews,
    getBrands,
    getMainCategoriesWithChildren
})(HomeContainer)