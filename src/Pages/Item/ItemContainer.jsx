import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getCategoriesWithParents } from '../../Redux/categoryReducer'
import { getItem } from '../../Redux/itemsReducer'
import Item from './Item'

const ItemContainer = (props) => {
    const {
        currentItem,
        isFetching,
        getItem,
        currentLanguage,
        getCategoriesWithParents,
        categoriesWithParents
    } = props

    const { name } = useParams()

    console.log(currentItem)

    useEffect(() => {
        getItem(name)
    }, [])

    useEffect(() => {
        if(currentItem && currentItem[0].category) {
            getCategoriesWithParents(currentItem[0].category._id)
        }
    }, [currentItem])

    return (
        <>
            {isFetching ? <Preloader/> :
                <Item 
                    item={currentItem[0]}
                    currentLanguage={currentLanguage}
                    categoriesWithParents={categoriesWithParents}
                />
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    currentItem: state.items.currentItem,
    currentLanguage: state.common.currentLanguage,
    categoriesWithParents: state.categories.categoriesWithParents
})

export default connect(mapStateToProps, {
    getItem,
    getCategoriesWithParents
})(ItemContainer)