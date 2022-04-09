import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getCategoriesWithParents } from '../../Redux/categoryReducer'
import { getComments } from '../../Redux/commentsReducer'
import { getItem, getSame } from '../../Redux/itemsReducer'
import { discountParser } from '../../Utils/discountParser'
import NotFound from '../NotFound/NofFound'
import Item from './Item'

const ItemContainer = (props) => {
    const {
        currentItem,
        isFetching,
        getItem,
        currentLanguage,
        getCategoriesWithParents,
        categoriesWithParents,
        getSame,
        sameItems,
        getComments,
        comments,
        totalComments,
        newComment
    } = props

    const { name } = useParams()

    const [currentImage, setCurrentImage] = useState(null)
    const [isFullDesc, setIsFullDesc] = useState(false)

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [discount, setDiscount] = useState(null)

    const handleChangePage = (page) => {
        setPageNumber(page)
    }

    const handlePageSize = (event) => {
        setPageSize(event.target.value)
        setPageNumber(0)
    }

    const handleFullText = () => {
        setIsFullDesc(!isFullDesc)
    }

    useEffect(() => {
        getItem(name)
    }, [name])

    useEffect(() => {
        if(currentItem && currentItem.in_action) {
            setDiscount(discountParser(currentItem.price, currentItem.discount))
        }
    }, [currentItem])

    useEffect(() => {
        if(currentItem && currentItem.category) {
            getCategoriesWithParents(currentItem.category._id)
        }
        if(currentItem && currentItem.tags) {
            getSame(currentItem.tags, currentItem._id)
        }
        if(currentItem) {
            setCurrentImage(currentItem.images[0])
            getComments(currentItem._id, pageNumber + 1, pageSize)
        }
    }, [currentItem])

    return (
        <>
            {isFetching ? <Preloader/> :
                <>
                    {!currentItem ? <NotFound/> :
                    <Item 
                        item={currentItem}
                        currentLanguage={currentLanguage}
                        categoriesWithParents={categoriesWithParents}
                        currentImage={currentImage}
                        setCurrentImage={setCurrentImage}
                        isFullDesc={isFullDesc}
                        handleFullText={handleFullText}
                        sameItems={sameItems}
                        comments={comments}
                        totalComments={totalComments}
                        discount={discount}
                    />}
                </>
            }
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    currentItem: state.items.currentItem,
    currentLanguage: state.common.currentLanguage,
    categoriesWithParents: state.categories.categoriesWithParents,
    sameItems: state.items.items,
    comments: state.comments.comments,
    totalComments: state.comments.total,
    newComment: state.comments.newComment
})

export default connect(mapStateToProps, {
    getItem,
    getCategoriesWithParents,
    getSame,
    getComments
})(ItemContainer)