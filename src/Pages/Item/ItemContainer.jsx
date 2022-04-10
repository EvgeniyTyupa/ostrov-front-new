import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { getCategoriesWithParents } from '../../Redux/categoryReducer'
import { getComments } from '../../Redux/commentsReducer'
import { getItem, getSame } from '../../Redux/itemsReducer'
import { updateProfile } from '../../Redux/userReducer'
import { discountParser } from '../../Utils/discountParser'
import { setViewedItemsToLC } from '../../Utils/setViewedItemsToLC'
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
        newComment,
        isAuth,
        user,
        updateProfile
    } = props

    const { name } = useParams()

    const [currentImage, setCurrentImage] = useState(null)
    const [isFullDesc, setIsFullDesc] = useState(false)

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [discount, setDiscount] = useState(null)

    const [isOpenNeedAuthModal, setIsOpenNeedAuthModal] = useState(false)

    const [isLiked, setIsLiked] = useState(false)

    const handleOpenAuthModal = () => {
        setIsOpenNeedAuthModal(!isOpenNeedAuthModal)
    }

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

    const handleLike = () => {
        if(isAuth) {
            const liked_items = []
            let newUser = {...user}
            
            if(user.liked_items) {
                user.liked_items.forEach(el => {
                    liked_items.push(el._id)
                })
            }

            if(isLiked) {
                liked_items.forEach((el, index) => {
                    if(el === currentItem._id){
                        liked_items.splice(index, 1)
                        newUser.liked_items = liked_items
                        updateProfile(user._id, newUser)
                        setIsLiked(false)
                    }
                })
            } else {
                liked_items.push(currentItem._id)
                newUser.liked_items = liked_items
                updateProfile(user._id, newUser)
                setIsLiked(true)
            }
        } else {
            setIsOpenNeedAuthModal(true)
        }
    }

    useEffect(() => {
        getItem(name)
    }, [name])

    useEffect(() => {
        if(currentItem && currentItem.in_action) {
            setDiscount(discountParser(currentItem.price, currentItem.discount))
        }
        if(currentItem && user && user.liked_items) {
            const liked_items = []
            let newUser = {...user}

            if(newUser.liked_items) {
                newUser.liked_items.forEach(el => {
                    liked_items.push(el._id)
                })
            }

            let isExist = false

            if(liked_items.length > 0){
                liked_items.forEach(el => {
                    if(el === currentItem._id){
                        isExist = true
                        setIsLiked(true)
                    }
                })
                if(!isExist) {
                    setIsLiked(false)
                }
            }
        }else {
            setIsLiked(false)
        }
    }, [currentItem, user])

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
        if(currentItem) {
            setViewedItemsToLC(currentItem)
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
                        handleLike={handleLike}
                        user={user}
                        isLiked={isLiked}
                        isOpenNeedAuthModal={isOpenNeedAuthModal}
                        handleOpenAuthModal={handleOpenAuthModal}
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
    newComment: state.comments.newComment,
    isAuth: state.user.isAuth,
    user: state.user.user
})

export default connect(mapStateToProps, {
    getItem,
    getCategoriesWithParents,
    getSame,
    getComments,
    updateProfile
})(ItemContainer)