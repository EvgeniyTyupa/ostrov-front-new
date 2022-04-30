import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useCheckActionConditions } from '../../../Hooks/useCheckActionConditions'
import { setCartItems, setDeliveryPrice } from '../../../Redux/cartReducer'
import { OFFICE_MAIL_DELIVERY_PRICE } from '../../../Utils/constants'
import ShoppingCart from './ShoppingCart'

const ShoppingCartContainer = (props) => {
    const { 
        totalCount,
        totalSum,
        cartItems,
        setCartItems,
        viewedItems,
        deliveryPrice,
        setDeliveryPrice,
        actionDiscount,
        gift,
        user,
        currentLanguage
    } = props

    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const [currentItem, setCurrentItem] = useState(null)

    const [parsedViewedItems, setParsedViewedItems] = useState([])

    const [userDiscount, setUserDiscount] = useState(0)

    const handleTab = (e, value) => {
        setCurrentTabIndex(value)
    }

    // console.log(totalDiscount)

    useEffect(() => {
        if(currentItem) {
            let newItems = [...cartItems]
            let isExist = false

            newItems.forEach((el, index) => {
                if(el.item._id === currentItem.item._id) {
                    isExist = true
                    newItems[index] = currentItem
                }
            })
            if(!isExist) {
                newItems.push(currentItem)
            }

            setCartItems(newItems)
        }
    }, [currentItem])

    useEffect(() => {
        let newItems = []

        viewedItems.forEach(el => {
            newItems.push({
                item: el,
                count: 1
            })
        })

        setParsedViewedItems(newItems)
    }, [viewedItems])

    useEffect(() => {
        if(user) {
            setUserDiscount(user.discount ? user.discount : 0)
        }else {
            setUserDiscount(0)
        }
    }, [user])

    return (
        <>
            <ShoppingCart
                currentTabIndex={currentTabIndex}
                handleTab={handleTab}
                totalCount={totalCount}
                totalSum={totalSum}
                cartItems={cartItems}
                setCurrentItem={setCurrentItem}
                deliveryPrice={deliveryPrice}
                viewedItems={parsedViewedItems}
                gift={gift}
                actionDiscount={actionDiscount}
                userDiscount={userDiscount}
                currentLanguage={currentLanguage}
            />
        </>
    )
}

let mapStateToProps = (state) => ({
    totalCount: state.cart.totalCount,
    totalSum: state.cart.totalSum,
    cartItems: state.cart.items,
    viewedItems: state.items.viewedItems,
    deliveryPrice: state.cart.deliveryPrice,
    actionDiscount: state.cart.actionDiscount,
    gift: state.cart.gift,
    user: state.user.user,
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {
    setCartItems,
    setDeliveryPrice
})(ShoppingCartContainer)