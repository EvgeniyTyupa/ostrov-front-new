import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { setAddToCartResult, setCartItems } from '../../Redux/cartReducer'
import { getCategoriesWithParents } from '../../Redux/categoryReducer'
import { getComments, setEmptyCommentsData } from '../../Redux/commentsReducer'
import { getItem, getSame, setViewedItems } from '../../Redux/itemsReducer'
import { updateProfile } from '../../Redux/userReducer'
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
        isAuth,
        user,
        updateProfile,
        setCartItems,
        cartItems,
        setAddToCartResult,
        setViewedItems,
        viewedItems,
        siteInfo,
        setEmptyCommentsData
    } = props

    const { name } = useParams()

    const [currentImage, setCurrentImage] = useState(null)
    const [isFullDesc, setIsFullDesc] = useState(false)

    const [pageSize, setPageSize] = useState(5)
    const [pageNumber, setPageNumber] = useState(0)

    const [discount, setDiscount] = useState(null)

    const [isOpenNeedAuthModal, setIsOpenNeedAuthModal] = useState(false)

    const [isLiked, setIsLiked] = useState(false)

    const [modalValue, setModalValue] = useState(null)

    const handleOpenAuthModal = () => {
        setIsOpenNeedAuthModal(!isOpenNeedAuthModal)
    }

    const handleChangePage = () => {
        setPageNumber(pageNumber + 1)
    }

    const handlePageSize = () => {
        setPageSize(pageSize + pageSize)
    }

    const addToCart = () => {
        let newItems = [...cartItems]

        let isExist = false
        let currentItemIndex = null

        newItems.forEach((el, index) => {
            if(el.item._id === currentItem._id){
                if(el.count + 1 <= currentItem.count){
                    el.count += 1
                }
                isExist = true
                currentItemIndex = index
            }
        })

        if(!isExist) {
            newItems.push({
                item: currentItem,
                count: 1
            })
        }
        setCartItems(newItems)
        setAddToCartResult(newItems[currentItemIndex ? currentItemIndex : newItems.length - 1])
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
        setEmptyCommentsData([])
        getItem(name)
    }, [name])

    useEffect(() => {
        if(currentItem && currentItem.action) {
            setDiscount(discountParser(currentItem.price, currentItem.action.discount))
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
        }
        if(currentItem) {
            let newViewedItems = [...viewedItems]
            let isExist = false

            newViewedItems.forEach(el => {
                if(el._id === currentItem._id){
                    isExist = true
                }
            })

            if(!isExist){
                if(newViewedItems.length === 15) {
                    newViewedItems.splice(0, 1)
                }
                newViewedItems.push(currentItem)
            }

            setViewedItems(newViewedItems)
        }
    }, [currentItem])

    useEffect(() => {
        return () => setEmptyCommentsData([])
    }, [])

    useEffect(() => {
        if(currentItem) {
            getComments(currentItem._id, pageNumber + 1, pageSize)
        }
    }, [currentItem, pageSize])

    if(!currentItem && !isFetching) {
        return <NotFound/>
    }

    return (
        <>
            {isFetching && <Preloader/>}
            {currentItem &&
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
                    addToCart={addToCart}
                    modalValue={modalValue}
                    setModalValue={setModalValue}
                    viewedItems={viewedItems}
                    siteInfo={siteInfo}
                    handlePageSize={handlePageSize}
                />
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
    user: state.user.user,
    cartItems: state.cart.items,
    viewedItems: state.items.viewedItems,
    siteInfo: state.common.siteInfo
})

export default connect(mapStateToProps, {
    getItem,
    getCategoriesWithParents,
    getSame,
    getComments,
    updateProfile,
    setCartItems,
    setAddToCartResult,
    setViewedItems,
    setEmptyCommentsData
})(ItemContainer)